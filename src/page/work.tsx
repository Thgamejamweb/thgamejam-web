import { AlertColor, Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Paper, Stack, TextField, Typography, createStyles, styled } from "@mui/material";
import NavBar from "@/component/navbar";
import Bottombar from "@/component/footer";
import React, { useEffect } from "react";
import { fileApi, userApi, workApi } from "@/http/http_api";
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
import { GetUserIsTeamAdminRequest, WorkDetails, WorksIdRequest } from "@api/api/thgamejam/works/works";
import { useNavigate } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetDownloadUrlReply, GetDownloadUrlRequest } from "@api/api/thgamejam/file/file";

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
    const [worksDetails, setWorksDetails] = React.useState<WorkDetails>()
    const [worksDownload, setWorksDownload] = React.useState<GetDownloadUrlReply>()
    const [adminStatus, setAdminStatus] = React.useState(false)
    //检查参数是否存在不存在重定向
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const workId = Number(urlParams.get('workId') as unknown);

    //重命名下载
    const handleDownload = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        link.click();
    };

    //初始化加载
    useEffect(() => {
        if (workId === 0) {
            navigate('/index');
            return;
        }
        workApi.getWorksDetailsById(new WorksIdRequest({
            worksId: workId
        })).then(req => {
            //下载URL
            fileApi.getDownloadUrlByid(new GetDownloadUrlRequest({
                id: req.fileId
            })).then(req => {
                //console.log(req);
                setWorksDownload(req);
            }).catch(req => {
                console.log(req);
            })
            const teamId = req.teamId;
            //检查是否为管理员
            userApi.getUserTokenInfoWithoutError(undefined).then(req => {
                workApi.getUserIsTeamAdmin(new GetUserIsTeamAdminRequest({
                    teamId: teamId
                })).then(req => {
                    setAdminStatus(true);
                }).catch(req => {
                    console.log(req);
                })
            })

            setWorksDetails(req);
        }).catch(req => {
            console.log(req);
        })

    }, [])


    return (
        <>
            <NavBar></NavBar>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <Container fixed sx={{ padding: { xs: '0 0' } }} >
                <div style={{ height: '200px', maxWidth: '100%', overflow: 'hidden' }}>
                    <img style={{ width: '100%' }} src={worksDetails?.headerImageURL} alt="" />
                </div>
            </Container>
            <Container fixed sx={{ marginBottom: '200px' }}>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                            {worksDetails?.worksName}
                        </Typography>
                        <Divider />
                        {worksDetails?.content}
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
                            {worksDetails?.imageUrlList.map((imageUrl) => (
                                <SwiperSlide >
                                    <div style={{ overflow: 'hidden', maxHeight: '400px' }}>
                                        <img style={{ width: '100%' }} src={imageUrl} alt="" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div style={{ marginBottom: '32px' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"

                                endIcon={<GetAppIcon></GetAppIcon>}
                                onClick={() => { handleDownload(worksDownload?.url as string, worksDownload?.fileName as string) }}
                            >
                                下载
                            </Button>
                        </div>
                        <Paper elevation={0} className={classes.sidebarAboutBox} style={{ backgroundColor: '#eeeeee' }}>
                            <Typography variant="h6" gutterBottom>
                                团队：{worksDetails?.teamName}
                            </Typography>
                            <Typography>[description]</Typography>
                        </Paper>
                        {
                            adminStatus == false
                                ?
                                <></>
                                :
                                <>
                                    <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                        管理
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color='secondary'
                                        endIcon={<EditIcon></EditIcon>}
                                        onClick={()=>{navigate('/user/workEdit?workId='+workId+'&teamId='+worksDetails?.teamId)}}
                                    >
                                        编辑
                                    </Button>
                                    <Button
                                        sx={{ marginTop: '8px' }}
                                        fullWidth
                                        variant="contained"
                                        endIcon={<DeleteIcon></DeleteIcon>}
                                    >
                                        删除
                                    </Button>
                                </>
                        }
                        {/* <Link display="block" variant="body1" href='#'>
                                [archive.title]
                            </Link> */}

                        {/* <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                Social
                            </Typography>

                            <Link display="block" variant="body1" href="#">
                                <Grid container direction="row" spacing={1} alignItems="center">
                                    <Grid item>
                                        <TwitterIcon />
                                    </Grid>
                                    <Grid item>[network.name]</Grid>
                                </Grid>
                            </Link>
                            <Link display="block" variant="body1" href="#">
                                <Grid container direction="row" spacing={1} alignItems="center">
                                    <Grid item>
                                        <TwitterIcon />
                                    </Grid>
                                    <Grid item>[network.name]</Grid>
                                </Grid>
                            </Link>
                            <Link display="block" variant="body1" href="#">
                                <Grid container direction="row" spacing={1} alignItems="center">
                                    <Grid item>
                                        <TwitterIcon />
                                    </Grid>
                                    <Grid item>[network.name]</Grid>
                                </Grid>
                            </Link> */}

                    </Grid>
                </Grid>
            </Container >

            <Bottombar></Bottombar>
        </>
    )
}