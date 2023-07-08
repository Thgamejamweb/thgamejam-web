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

import { GetUserPublicKeyRequest, LoginRequest } from "@api/api/thgamejam/user/user";

import { JSEncrypt } from 'jsencrypt';
import NavBar from "@/component/navbar";
import { userApi } from "@/http/http_api.ts";
import { Container } from '@material-ui/core';



export default function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();

    //防止重复登入
    useEffect(() => {
        userApi.getUserTokenInfoWithoutError(undefined).then(req => {
            navigate('/user')
        })
    }, [])

    const handleLoginSubmit = (e: any) => {
        userApi.getUserPublicKey(new GetUserPublicKeyRequest({
            username: username
        })).then(req => {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(req.publicKey);

            const encryptedData = encrypt.encrypt(password);

            userApi.login(new LoginRequest({
                username: username,
                password: encryptedData as string
            })).then(() => {
                navigate('/index');
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })


    }
    return (
        <>
            <NavBar></NavBar>
            <Container fixed >
                <Box sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: 500, height: '100%' }} >
                        <CardContent sx={{ p: '0' }}>
                            <Box sx={{ height: 75, px: 5, display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }} color="text.secondary" gutterBottom>
                                    登 入
                                </Typography>
                            </Box>
                            <Divider />

                            <Box sx={{ pt: 5, px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="用户名" type="text" variant="standard" value={username} onChange={e => { setUsername(e.target.value) }} />
                                <TextField sx={{ mb: 5 }} id="outlined-basic" label="密码" type="password" variant="standard" value={password} onChange={e => { setPassword(e.target.value) }} />
                                <Box>
                                    <Button sx={{ width: '20%', mb: 3 }} variant="contained" onClick={handleLoginSubmit}>登入</Button>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ mb: 3 }}>
                                    <Link
                                        href='register'
                                        variant="body2"
                                        sx={{ float: 'right' }}
                                    >
                                        注册
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

