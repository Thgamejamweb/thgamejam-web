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
        <Tab sx={{ height: 70 }}
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
        <Box sx={{ width: '100%', height: 70 }}>
            <Grid container>
                <Grid item xs={8} >
                    <Tabs sx={{ height: 70 }} value={value} onChange={handleChange} aria-label="nav tabs example">
                        <LinkTab label="Page One" href="/drafts" />
                        <LinkTab label="Page Two" href="/trash" />
                        <LinkTab label="Page Three" href="/spam" />
                    </Tabs>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}} item xs={4}>
                    <LinkButton name='Log in' href='/login'></LinkButton>
                    <LinkButton name='Register' href='/register'></LinkButton>
                </Grid>
            </Grid>
        </Box>

    );
}