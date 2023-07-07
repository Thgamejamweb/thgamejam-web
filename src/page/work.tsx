import { AlertColor, Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Paper, Stack, TextField, Typography, createStyles, styled } from "@mui/material";
import NavBar from "@/component/navbar";
import Bottombar from "@/component/footer";
import React, { useEffect } from "react";
import { workApi } from "@/http/http_api";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import SnackBar from '@/component/snackbar';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';
import { WorkDetails, WorksIdRequest } from "@api/api/thgamejam/works/works";
import { useNavigate } from "react-router-dom";

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
    //检查参数是否存在不存在重定向
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const workId = Number(urlParams.get('workId') as unknown);
    useEffect(() => {
        if (workId === 0) {
            navigate('/index');
            return;
        }
        workApi.getWorksDetailsById(new WorksIdRequest({
            worksId: workId
        })).then(req => {
            console.log(req);
            
            setWorksDetails(req);
        }).catch(req => {
            console.log(req);
            
            //navigate('/index');
            //return;
        })
    
    }, [])



    return (
        <>
            <NavBar></NavBar>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <Container fixed sx={{ padding: { xs: '0 0' } }} >
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
                    {worksDetails.imageUrlList.map((data) =>{

                    })}
                    <SwiperSlide>
                        <div style={{ overflow: 'hidden', maxHeight: '400px' }}>
                            <img style={{ width: '100%' }} src="http://wx.xcx.tophousekeep.chizg.cn/view/admin/assets/img/header/0.png" alt="" />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </Container>
            <Container fixed sx={{ marginBottom: '200px' }}>
                <main>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                {worksDetails?.teamName}
                            </Typography>
                            <Divider />
                            {worksDetails?.content}
                            {/* {posts.map((post) => (
                                <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                                    {post}
                                </Markdown>
                            ))} */}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className={classes.sidebarAboutBox} style={{ backgroundColor: '#eeeeee' }}>
                                <Typography variant="h6" gutterBottom>
                                    [TITLE]
                                </Typography>
                                <Typography>[description]</Typography>
                            </Paper>
                            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                Archives
                            </Typography>

                            <Link display="block" variant="body1" href='#'>
                                [archive.title]
                            </Link>
                            <Link display="block" variant="body1" href='#'>
                                [archive.title]
                            </Link>
                            <Link display="block" variant="body1" href='#'>
                                [archive.title]
                            </Link>

                            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
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
                            </Link>

                        </Grid>
                    </Grid>
                </main>

            </Container >

            <Bottombar></Bottombar>
        </>
    )
}