import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinkButton from './linkbutton';


interface LinkTabProps {
    label?: string;
    href?: string;
}




function LinkTab(props: LinkTabProps) {
    return (
        <Tab sx={{ fontSize: 15, fontWeight: 550, height: 60 }}
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

    };

    return (
        <Box sx={{ width: '100%', height: 60,borderBottom:1,borderColor:'#DADADA' }}>
            <Grid container>
                <Grid item xs={2}>
                    logo
                </Grid>
                <Grid item xs={6} >
                    <Tabs sx={{ height: 60 }} value={value} onChange={handleChange} >
                        <LinkTab label="upload game" href="/drafts" />
                        <LinkTab label="gamejams" href="/trash" />
                        <LinkTab label="user team" href="/spam" />
                    </Tabs>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <LinkButton name='Log in' href='/login'></LinkButton>
                    <LinkButton name='Register' href='/register'></LinkButton>
                </Grid>             
            </Grid>
        </Box >

    );
}