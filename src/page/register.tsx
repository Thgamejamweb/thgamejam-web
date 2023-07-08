import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { RegisterUserRequest } from "@api/api/thgamejam/user/user";

import { JSEncrypt } from 'jsencrypt';
import NavBar from "@/component/navbar";
import { userApi } from "@/http/http_api.ts";
import { Container } from '@material-ui/core';
import { AlertColor } from '@mui/material';
import SnackBar from '@/component/snackbar';

export default function Reg() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const navigate = useNavigate();

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

    //防止重复登入
    useEffect(() => {
        userApi.getUserTokenInfoWithoutError(undefined).then(req => {
            navigate('/user')
        })
    }, [])

    const handleRegSubmit = (e: any) => {
        userApi.registerUser(new RegisterUserRequest({
            username: username,
            password: password,
            email: email
        })).then(() => {
            FunSnackbars(1, '注册成功')
            navigate('/user')
        }).catch(err => {
            FunSnackbars(2, '注册失败，请重试')
            console.log(err);
        })
    }
    return (
        <>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <NavBar></NavBar>
            <Container fixed >
                <Box sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: 500, height: '100%' }} >
                        <CardContent sx={{ p: '0' }}>
                            <Box sx={{ height: 75, px: 5, display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }} color="text.secondary" gutterBottom>
                                    注 册
                                </Typography>
                            </Box>
                            <Divider />

                            <Box sx={{ pt: 5, px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <TextField sx={{ mb: 5 }} id="outlined-basic" label="邮箱" type="email" variant="standard" value={email} onChange={e => { setEmail(e.target.value) }} />
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="用户名" type="text" variant="standard" value={username} onChange={e => { setUsername(e.target.value) }} />
                                <TextField sx={{ mb: 5 }} id="outlined-basic" label="密码" type="password" variant="standard" value={password} onChange={e => { setPassword(e.target.value) }} />
                                <Box>
                                    <Button sx={{ width: '20%', mb: 3 }} variant="contained" onClick={handleRegSubmit}>注册</Button>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ mb: 3 }}>
                                    <Link
                                        href='login'
                                        variant="body2"
                                        sx={{ float: 'right' }}
                                    >
                                        返回登入
                                    </Link>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    );
}

