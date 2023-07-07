import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    footer: {
        //置底
        zIndex: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        //默认
        padding: theme.spacing(3, 0),
        //marginTop: '200px',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Bottombar() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    这里是title
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    这里是简介
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer>
    )
}