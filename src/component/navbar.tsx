import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { userApi } from "@/http/http_api";
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },

    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const [status, setStatus] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        userApi.getUserTokenInfoWithoutError(undefined).then(req => {
            setStatus(1);
        })
    }, [])

    //退出账户
    const deleteUserToken = () => {
        const date = new Date();
        date.setTime(date.getTime() - 1); // 将时间设置为过去的时间
        const expires = "expires=" + date.toUTCString();
        document.cookie = "token=; " + expires + "; path=/;";
        navigate('/login');
    }

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    <img src="https://avatars.githubusercontent.com/u/93113615?s=400&u=6676c6988de9047403189e9d9cb34a66962fb29b&v=4" style={{ width: '40px' }} alt="" />
                </Typography>
                {
                    status == 0
                        ?
                        <>
                            <nav>
                                <IconButton className={classes.link} href="/index" aria-label="delete">
                                    <HomeIcon fontSize='large' />
                                </IconButton>
                            </nav>
                            <Button href="/login" color="primary" variant="outlined" className={classes.link}>
                                登入
                            </Button>
                        </>
                        :
                        <>
                            <nav>
                                <IconButton className={classes.link} href="/index" aria-label="delete">
                                    <HomeIcon fontSize='large' />
                                </IconButton>
                                <IconButton className={classes.link} href="/user/team" aria-label="delete">
                                    <GroupIcon fontSize='large' />
                                </IconButton>
                                <Link variant="button" color="textPrimary" href="/user/competition" className={classes.link}>
                                    发布比赛
                                </Link>
                            </nav>
                            <Button href="/user" color="primary" variant="outlined" className={classes.link}>
                                用户中心
                            </Button>
                            <IconButton onClick={deleteUserToken} className={classes.link} aria-label="delete">
                                <ExitToAppIcon fontSize='large' />
                            </IconButton>
                        </>
                }
            </Toolbar>
        </AppBar>

        // <Box sx={{ width: '100%', height: 60,borderBottom:1,borderColor:'#DADADA' }}>
        //     <Grid container>
        //         <Grid item xs={2}>
        //             logo
        //         </Grid>
        //         <Grid item xs={6} >
        //             <Tabs sx={{ height: 60 }} value={value} onChange={handleChange} >
        //                 <LinkTab label="首页" href="/index" />
        //             </Tabs>
        //         </Grid>
        //         <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        //             <LinkButton name='Log in' href='/login'></LinkButton>
        //             <LinkButton name='Register' href='/register'></LinkButton>
        //         </Grid>
        //     </Grid>
        // </Box >
        // :
        // <Box sx={{ width: '100%', height: 60,borderBottom:1,borderColor:'#DADADA' }}>
        //     <Grid container>
        //         <Grid item xs={2}>
        //             logo
        //         </Grid>
        //         <Grid item xs={6} >
        //             <Tabs sx={{ height: 60 }} value={value} onChange={handleChange} >
        //                 <LinkTab label="首页" href="/index" />
        //                 <LinkTab label="队伍管理" href="" />
        //             </Tabs>
        //         </Grid>
        //         <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        //             <LinkButton name='用户中心' href='/user'></LinkButton>
        //         </Grid>
        //     </Grid>
        // </Box >
    );
}
