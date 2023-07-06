import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import LinkButton from './linkbutton';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

interface LinkTabProps {
    label?: string;
    href?: string;
}


function LinkTab(props: LinkTabProps) {
    const navigate = useNavigate();
    return (
        <Tab sx={{ fontSize: 15, fontWeight: 550, height: 60 }}
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                navigate(props.href as string)
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
                        <LinkTab label="user team" href="/user/index" />
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
