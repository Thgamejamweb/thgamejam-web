import { AlertColor, Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Paper, Stack, TextField, Typography, createStyles, styled } from "@mui/material";
import NavBar from "@/component/navbar";
import Bottombar from "@/component/footer";
import React, { useEffect } from "react";
import { competitionApi, fileApi, teamApi, userApi, workApi } from "@/http/http_api";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import SnackBar from '@/component/snackbar';
import GetAppIcon from '@material-ui/icons/GetApp';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useNavigate } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetDownloadUrlReply, GetDownloadUrlRequest } from "@api/api/thgamejam/file/file";
import { GetTeamMemberListReply, GetTeamMemberListRequest, GetUserJoinAllTeamListRequest, GetUserAllTeamListReply } from "@api/api/thgamejam/team/team";
import { GetCompetitionDetailInfoRequest, JoinCompetitionRequest, CompetitionDetailReply, AddWorksRequest } from "@api/api/thgamejam/competition/competition";
import { CompetitionApi } from "@api/api/thgamejam/competition/competitionApi";
import { GetWorksByIdRequest, GetWorksByNameRequest, GetWorksListByTeamIdReply } from "@api/api/thgamejam/works/works";
import { Editor } from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        paddingTop: '40px',
    },
    markdown: {
        marginTop: '24px',
        marginBottom: '24px'
    },
    sidebarAboutBox: {
        padding: '32px',
    },
    sidebarSection: {
        paddingTop: '32px',
    },
}));

interface ItemInfo {
    description?: string,
    staffName?: string,
    id: number,
    name: string,
    image: string,
}

export default function Work() {
    const classes = useStyles();
    //弹窗
    const [snackbarsState, setSnackbarsState] = React.useState(false);
    const [snackbarsSeverity, setSnackbarsSeverity] = React.useState<AlertColor>('info');
    const [snackbarsMessage, setSnackbarsMessage] = React.useState('');
    const FunSnackbars = (Severity: number, Message: string) => {
        setSnackbarsMessage(Message);
        let data: AlertColor;
        switch (Severity) {
            case 1:
                data = 'success';
                break;
            case 2:
                data = 'warning';
                break;
            case 3:
                data = 'error';
                break;
            default:
                data = 'info'
                break;
        }
        setSnackbarsSeverity(data);
        setSnackbarsState(true);
    }
    const [CompetitionDetailReply, setCompetitionDetailReply] = React.useState<CompetitionDetailReply>()
    const [GetUserAllTeamListReply, setGetUserAllTeamListReply] = React.useState<GetUserAllTeamListReply>();
    const [GetWorksListByTeamIdReply, setGetWorksListByTeamIdReply] = React.useState<GetWorksListByTeamIdReply>();
    //检查参数是否存在不存在重定向
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id') as unknown);

    //Card
    function ItemCard(item: ItemInfo) {
        return (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card style={{ backgroundColor: '#252525', borderRadius: '13.33px' }} onClick={() => navigate('/work?workId=' + item.id)}>
                    <CardActionArea>
                        <CardMedia
                            style={{ height: 200 }}
                            image={item.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography style={{ color: 'white', fontSize: '1.5rem' }} gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography style={{ color: '#cacaca' }} variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }

    const [Status, setStatus] = React.useState(0);
    //初始化加载
    useEffect(() => {
        if (id === 0) {
            navigate('/index');
            return;
        }
        //取比赛信息
        competitionApi.getCompetitionDetailInfo(new GetCompetitionDetailInfoRequest({
            competitionId: id
        })).then(req => {
            setCompetitionDetailReply(req);
        }).catch(req => {
            console.log(req);
        })
        //队伍列表
        userApi.getUserTokenInfoWithoutError(undefined).then(req => {
            teamApi.getUserJoinAllTeamList(new GetUserJoinAllTeamListRequest({
                userId: req.id
            })).then(req => {
                setGetUserAllTeamListReply(req);
            }).catch(req => {
                console.log(req);
            })
        }).catch(req => {
            console.log(req);
        })
    }, [Status])

    //加入比赛
    const [addOpen, setAddOpen] = React.useState(false);
    const [teamId, setTeamId] = React.useState(0);
    const addBtn = () => {
        competitionApi.joinCompetition(new JoinCompetitionRequest({
            teamId: teamId,
            competitionId: id
        })).then(req => {
            setStatus(Status + 1);
            FunSnackbars(1, '成功加入');
            setAddOpen(false);
        }).catch(req => {
            FunSnackbars(2, '加入失败');
        })
    }

    //作品列表
    useEffect(() => {
        workApi.getWorksListByTeamId(new GetWorksByIdRequest({
            teamId: teamId
        })).then(req => {
            setGetWorksListByTeamIdReply(req);
        }).catch(req => {
            console.log(req);
        })
    }, [teamId])
    //提交作品
    const [addWorkOpen, setAddWorkOpen] = React.useState(false);
    const [workId, setWorkId] = React.useState(0);
    const addWorkBtn = () => {
        competitionApi.addCompetitionWorks(new AddWorksRequest({
            worksId: workId,
            teamId: teamId,
            competitionId: id
        })).then(req => {
            setStatus(Status + 1);
            FunSnackbars(1, '成功提交');
            setAddWorkOpen(false);
        }).catch(req => {
            FunSnackbars(2, '提交失败');
        })
    }


    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavBar></NavBar>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <Container fixed sx={{ padding: { xs: '0 0' } }} >
                <div style={{ height: '350px', maxWidth: '100%', overflow: 'hidden', borderBottomLeftRadius: '13.33px', borderBottomRightRadius: '13.33px' }}>
                    <img style={{ width: '100%' }} src={CompetitionDetailReply?.headerImageURL} alt="" />
                </div>
            </Container>
            <Container fixed sx={{ padding: { xs: '0 0' }, marginBottom: '200px', marginTop: '24px' }}>
                <Paper elevation={0} className={classes.sidebarAboutBox} style={{ backgroundColor: '#121212', borderRadius: '13.33px' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={8}>
                            <Paper elevation={0} style={{ backgroundColor: '#eeeeee', borderRadius: '13.33px', padding: '36px' }}>
                                <Typography variant="h6" gutterBottom>
                                    {CompetitionDetailReply?.name}
                                </Typography>
                                <Divider />
                                <div dangerouslySetInnerHTML={{__html:CompetitionDetailReply?.context as string}}></div>
                            </Paper>
                            <Paper elevation={0} style={{ backgroundColor: '#121212', borderRadius: '13.33px', marginTop: '40px' }}>
                                <h3 style={{
                                    color: 'white',
                                    margin: '0',
                                    fontSize: '20px',
                                    fontWeight: '600',
                                }}
                                >作品</h3>
                                <Grid container spacing={2} style={{ marginTop: '0px' }}>
                                    {CompetitionDetailReply?.worksList.map((item) => {
                                        return (
                                            <ItemCard name={item.worksName} id={item.worksId} image={item.headerImageURL} staffName={''} description={''}></ItemCard>
                                        )
                                    })}
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={1}
                                //navigation
                                pagination={{ clickable: true }}
                                //scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                            </Swiper>
                            <div style={{ marginBottom: '32px' }}>
                                {GetUserAllTeamListReply === undefined ? (
                                    <>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { navigate('/login') }}
                                        >
                                            请先登入
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {CompetitionDetailReply?.isSignup === false ? (
                                            <>
                                                <Button fullWidth variant="contained" color='inherit'>
                                                    报名已结束
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { setAddOpen(true) }}
                                                >
                                                    加入比赛
                                                </Button>
                                                <Dialog
                                                    open={addOpen}
                                                    onClose={() => { setAddOpen(false) }}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    maxWidth='sm'
                                                    fullWidth
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"选择队伍参赛"}</DialogTitle>
                                                    <DialogContent>
                                                        <div style={{ margin: '12px' }}>
                                                            <TextField
                                                                id="standard-select-currency-native"
                                                                select
                                                                label="队伍"
                                                                fullWidth
                                                                value={teamId}
                                                                onChange={e => { setTeamId(Number(e.target.value)) }}
                                                                SelectProps={{
                                                                    native: true,
                                                                }}
                                                            >
                                                                {GetUserAllTeamListReply?.list && GetUserAllTeamListReply?.list.map((option) => (
                                                                    <option key={option.teamId} value={option.teamId}>
                                                                        {option.teamName}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => { setAddOpen(false) }} color="primary">
                                                            取消
                                                        </Button>
                                                        <Button onClick={addBtn} color="primary" autoFocus>
                                                            加入比赛
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </>
                                        )}
                                        <div style={{ marginTop: '12px' }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { setAddWorkOpen(true) }}
                                            >
                                                提交作品
                                            </Button>
                                            <Dialog
                                                open={addWorkOpen}
                                                onClose={() => { setAddWorkOpen(false) }}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                maxWidth='sm'
                                                fullWidth
                                            >
                                                <DialogTitle id="alert-dialog-title">{"选择队伍参赛"}</DialogTitle>
                                                <DialogContent>
                                                    <div style={{ margin: '12px' }}>
                                                        <TextField
                                                            id="standard-select-currency-native"
                                                            select
                                                            label="队伍"
                                                            fullWidth
                                                            value={teamId}
                                                            onChange={e => { setTeamId(Number(e.target.value)) }}
                                                            SelectProps={{
                                                                native: true,
                                                            }}
                                                        >
                                                            {GetUserAllTeamListReply?.list && GetUserAllTeamListReply?.list.map((option) => (
                                                                <option key={option.teamId} value={option.teamId}>
                                                                    {option.teamName}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                        <TextField
                                                            id="standard-select-currency-native"
                                                            select
                                                            label="作品"
                                                            fullWidth
                                                            value={workId}
                                                            onChange={e => { setWorkId(Number(e.target.value)) }}
                                                            SelectProps={{
                                                                native: true,
                                                            }}
                                                            sx={{ top: '12px' }}
                                                        >
                                                            {GetWorksListByTeamIdReply?.workList && GetWorksListByTeamIdReply?.workList.map((option) => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option.workName}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => { setAddWorkOpen(false) }} color="primary">
                                                        取消
                                                    </Button>
                                                    <Button onClick={addWorkBtn} color="primary" autoFocus>
                                                        提交作品
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </>
                                )}
                            </div>

                            <Paper elevation={0} className={classes.sidebarAboutBox} style={{ backgroundColor: '#eeeeee', borderRadius: '13.33px' }}>
                                <Typography variant="h6" gutterBottom>
                                    举办方：{CompetitionDetailReply?.staffName}
                                </Typography>
                                <Typography>
                                    介绍：{CompetitionDetailReply?.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container >

            <Bottombar></Bottombar>
        </div>
    )
}