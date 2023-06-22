import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { userApi } from '../../utils/api';
import { LoginRequest } from '@api/api/thgamejam/user/user';


interface IJumpToRegister {
    callback: (toRegister: boolean) => void
}

export default function Login({ callback }: IJumpToRegister) {

 
    
    const [account, setAccount] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleAccountChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAccount(e.target.value);
        console.log(account);
    };
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };
    const handleLoginSubmit = (e: any) => {
        // userApi.getUserPublicKey(new GetUserPublicKeyRequest({username:account})).then((req)=>{
        //     console.log(rsa_encrypt(new LoginRequest({username:account,password:password}),req.publicKey))
        // }) 
        userApi.login(new LoginRequest({
            username:account,
            password:password
        })).then((req)=>{
            console.log(req);
        })
    }
    return (
        <Card sx={{ width: 500, height: '100%' }} >
            <CardContent sx={{ p: '0' }}>
                <Box sx={{ height: 75, px: 5, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }} color="text.secondary" gutterBottom>
                        login in
                    </Typography>
                </Box>
                <Divider />

                <Box sx={{ pt: 5, px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <TextField sx={{ mb: 3 }} id="outlined-basic" label="account" variant="standard" onChange={handleAccountChange} />
                    <TextField sx={{ mb: 5 }} id="outlined-basic" label="password" variant="standard" onChange={handlePasswordChange} />
                    <Box>
                        <Button sx={{ width: '20%', mb: 3 }} variant="contained" onClick={handleLoginSubmit}>LOGIN</Button>

                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                callback(true);
                            }}
                            sx={{ ml: 3 }}
                        >
                            register
                        </Link>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Link
                            component="button"
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
    );
}

function rsa_encrypt(arg0: LoginRequest, publicKey: string): any {
    throw new Error('Function not implemented.');
}
