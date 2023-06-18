import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import './login.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard() {
    return (
        <Box sx={{ height: 500, pt: 5, bgcolor: 'black', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 500, height: '100%' }} >
                <CardContent sx={{ p: '0' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        login in
                    </Typography>
                    <Divider />

                    <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <TextField sx={{ mx: 'auto', width: '80%', mb: 1 }} id="outlined-basic" label="account" variant="outlined" />
                        <TextField sx={{ mx: 'auto', width: '80%', mb: 1 }} id="outlined-basic" label="password" variant="outlined" />
                        <Button sx={{ mx: 'auto', width: '20%', mb: 2 }} variant="contained">Contained</Button>
                        {/* <TextField margin='normal' id="outlined-basic" label="account" variant="outlined" />
                        <TextField margin='normal' id="outlined-basic" label="account" variant="outlined" /> */}
                    </Box>

                </CardContent>
                <Divider />
                <CardActions sx={{ p: '0' }}>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
}