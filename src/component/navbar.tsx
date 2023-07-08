import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { userApi } from "@/http/http_api";


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

    useEffect(()=>{
        userApi.getUserTokenInfoWithoutError(undefined).then(req => {
            setStatus(1);
        })
    },[])

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    ThGameJam
                </Typography>
                {
                    status == 0
                        ?
                        <>
                            <nav>
                                <Link variant="button" color="textPrimary" href="/index" className={classes.link}>
                                    首页
                                </Link>
                            </nav>
                            <Button href="/login" color="primary" variant="outlined" className={classes.link}>
                                登入
                            </Button>
                        </>
                        :
                        <>
                            <nav>
                                <Link variant="button" color="textPrimary" href="/index" className={classes.link}>
                                    首页
                                </Link>
                                <Link variant="button" color="textPrimary" href="/user/team" className={classes.link}>
                                    队伍管理
                                </Link>
                                <Link variant="button" color="textPrimary" href="/user/competition" className={classes.link}>
                                    发布比赛
                                </Link>
                            </nav>
                            <Button href="/user" color="primary" variant="outlined" className={classes.link}>
                                用户中心
                            </Button>
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
