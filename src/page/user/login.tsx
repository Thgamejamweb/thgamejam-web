import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import { UserApi } from '@api/api/thgamejam/user/userApi';
import { GetUserPublicKeyRequest, LoginRequest } from "@api/api/thgamejam/user/user";
import axios from 'axios';

import { JSEncrypt } from 'jsencrypt';
import Topbar from '../../component/topbar';


const customSend = async <T, R>({ method, url, data }: { method: string, url: string, data: T }): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};

const fromRequest = <T = any>(data: T) => {
    return data
}


const userApi = new UserApi(customSend, fromRequest, fromRequest);


export default function Login() {


    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.target.value);
        console.log(username);
    };
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };
    const handleLoginSubmit = (e: any) => {

        userApi.getUserPublicKey(new GetUserPublicKeyRequest({
            username: username
        })).then(req => {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(req.publicKey);

            const encryptedData = encrypt.encrypt(password);
            //登入
            userApi.login(new LoginRequest({
                username: username,
                password: btoa(encryptedData as string)
            })).then(() => {
              
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })


    }
    return (
        <>
            <Topbar></Topbar>
            <Box sx={{ height: window.innerHeight - 75, bgcolor: '#F4F4F4' }}>
                <Box sx={{ height: 500, pt: 5, bgcolor: '#F4F4F4', display: 'flex', justifyContent: 'center' }}>


                    <Card sx={{ width: 500, height: '100%' }} >
                        <CardContent sx={{ p: '0' }}>
                            <Box sx={{ height: 75, px: 5, display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }} color="text.secondary" gutterBottom>
                                    login in
                                </Typography>
                            </Box>
                            <Divider />

                            <Box sx={{ pt: 5, px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="account" variant="standard" onChange={handleUsernameChange} />
                                <TextField sx={{ mb: 5 }} id="outlined-basic" label="password" variant="standard" onChange={handlePasswordChange} />
                                <Box>
                                    <Button sx={{ width: '20%', mb: 3 }} variant="contained" onClick={handleLoginSubmit}>LOGIN</Button>
                                    <Link
                                        href='register'
                                        variant="body2"
                                        onClick={() => {

                                        }}
                                        sx={{ ml: 3 }}
                                    >
                                        register
                                    </Link>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ mb: 3 }}>
                                    <Link
                                        href='unknown link'
                                        variant="body2"
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        forget password?
                                    </Link>
                                </Box>
                            </Box>

                        </CardContent>
                        <Divider />

                    </Card>
                </Box>
            </Box>
        </>
    );
}

