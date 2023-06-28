import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
import Topbar from '@/component/topbar';
=======
import Topbar from '../component/topbar';
>>>>>>> acb416f3a9e2f05b4319951950fd72967e583d33


export default function Register() {
    return (
        <>
            <Topbar></Topbar>
            <Box sx={{ height: window.innerHeight - 75, bgcolor: '#F4F4F4' }}>
                <Box sx={{ height: 500, pt: 5, bgcolor: '#F4F4F4', display: 'flex', justifyContent: 'center' }}>



                    <Card sx={{ width: 500, height: '100%' }} >
                        <CardContent sx={{ p: '0' }}>
                            <Box sx={{ height: 75, px: 5, display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }} color="text.secondary" gutterBottom>
                                    Create Account
                                </Typography>
                            </Box>
                            <Divider />

                            <Box sx={{ pt: 3, px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="username" variant="standard" />
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="password" variant="standard" />
                                <TextField sx={{ mb: 3 }} id="outlined-basic" label="repeat password" variant="standard" />
                                <TextField sx={{ mb: 4 }} id="outlined-basic" label="your email address" variant="standard" />
                                <Box>
                                    <Button sx={{ width: '20%', mb: 3 }} variant="contained">register</Button>
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