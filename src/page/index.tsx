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

import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import { getWorksByReverseIdReply } from "@api/api/thgamejam/works/works";
import { CompetitionListReply } from "@api/api/thgamejam/competition/competition";

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
    //重定向
    const navigate = useNavigate();
    //card
    function ItemCard(item: ItemInfo) {
        return (
            <Grid item key={item.id} xs={12} sm={4} md={2}>
                <Card style={{ backgroundColor: '#252525', borderRadius: '13.33px' }} onClick={() => navigate('/competition?id=' + item.id)}>
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
    const [headerGGG, setHeaderGGG] = React.useState<getWorksByReverseIdReply>();
    const [GetSignupCompetitionList, setGetSignupCompetitionList] = React.useState<CompetitionListReply>();
    const [GetStartCompetitionList, setGetStartCompetitionList] = React.useState<CompetitionListReply>();
    //const [GetWorksListByCompetitionId, setGetWorksListByCompetitionId] = React.useState<CompetitionListReply>();
    const [GetEndCompetitionList, setGetEndCompetitionList] = React.useState<CompetitionListReply>();
    //初始化加载
    useEffect(() => {
        //轮播图
        workApi.getWorksByReverseIdRequest(undefined).then(req => {
            setHeaderGGG(req);
        }).catch(req => {
            console.log(req);
        })
        // 获取开始报名比赛列表
        competitionApi.getSignupCompetitionList(undefined).then(req => {
            setGetSignupCompetitionList(req);
        }).catch(req => {
            console.log(req);
        })
        // 获取开始比赛列表
        competitionApi.getStartCompetitionList(undefined).then(req => {
            setGetStartCompetitionList(req);
        }).catch(req => {
            console.log(req);
        })
        // 获取结束比赛列表
        competitionApi.getEndCompetitionList(undefined).then(req => {
            setGetEndCompetitionList(req);
        }).catch(req => {
            console.log(req);
        })

    }, [])

    return (
        <div style={{ backgroundColor: 'black' }}>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <NavBar></NavBar>
            <Container fixed sx={{ padding: { xs: '0 0' }, maxWidth: { lg: '1800px' } }} >
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
                    {headerGGG?.worksList.map((data) => (
                        <SwiperSlide >
                            <div style={{ height: '450px', backgroundColor: '#808080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ padding: '10px', maxWidth: '600px', overflow: 'hidden' }}>
                                            <img style={{ width: '100%' }} src={data.headerImageURL} alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div style={{ padding: '10px' }}>
                                            <Typography style={{
                                                color: '#434343',
                                                fontSize: '50px',
                                                fontWeight: '900'
                                            }} >
                                                {data.workName}
                                            </Typography>
                                            <Typography style={{
                                                color: '#434343',
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                            //noWrap
                                            >
                                                团队：{data.teamName}
                                            </Typography>
                                            <Button style={{ marginTop: '24px', color: 'white', fontSize: '24px' }} onClick={() => { navigate('/work?workId=' + data.id) }} variant="outlined" color='inherit'>
                                                前往试玩
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
            <Container fixed sx={{ marginBottom: '200px', padding: { xs: '0 0' }, maxWidth: { lg: '1800px' } }}>
                <Paper elevation={0} style={{ backgroundColor: '#121212', borderRadius: '13.33px', marginTop: '96px', padding: '36px' }}>
                    <h3 style={{
                        color: 'white',
                        margin: '0',
                        fontSize: '20px',
                        fontWeight: '600',
                    }}
                    >报名中的比赛</h3>
                    <Grid container spacing={3} style={{ marginTop: '0px' }}>
                        {GetSignupCompetitionList?.list.map((item) => {
                            return (
                                <ItemCard name={item.name} id={item.id} image={item.headerImageURL} staffName={item.staffName} description={item.description}></ItemCard>
                            )
                        })}
                    </Grid>
                </Paper>

                <Paper elevation={0} style={{ backgroundColor: '#121212', borderRadius: '13.33px', marginTop: '96px', padding: '36px' }}>
                    <h3 style={{
                        color: 'white',
                        margin: '0',
                        fontSize: '20px',
                        fontWeight: '600',
                    }}
                    >进行中的比赛</h3>
                    <Grid container spacing={3} style={{ marginTop: '0px' }}>
                        {GetStartCompetitionList?.list.map((item) => {
                            return (
                                <ItemCard name={item.name} id={item.id} image={item.headerImageURL} staffName={item.staffName} description={item.description}></ItemCard>
                            )
                        })}
                    </Grid>
                </Paper>

                <Paper elevation={0} style={{ backgroundColor: '#121212', borderRadius: '13.33px', marginTop: '96px', padding: '36px' }}>
                    <h3 style={{
                        color: 'white',
                        margin: '0',
                        fontSize: '20px',
                        fontWeight: '600',
                    }}
                    >结束的比赛</h3>
                    <Grid container spacing={3} style={{ marginTop: '0px' }}>
                        {GetEndCompetitionList?.list.map((item) => {
                            return (
                                <ItemCard name={item.name} id={item.id} image={item.headerImageURL} staffName={item.staffName} description={item.description}></ItemCard>
                            )
                        })}
                    </Grid>
                </Paper>
            </Container >
            <Bottombar></Bottombar>
        </div>
    )
}