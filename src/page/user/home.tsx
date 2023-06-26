import { Box, Grid } from "@mui/material";
import NavBar from "../../component/navbar";


export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ maxHeight: window.innerHeight - 70 }}>
                <Grid container sx={{ height: window.innerHeight - 70 }}>
                    <Grid item xs={2}>
                        <Box sx={{ bgcolor: '#F4F4F4', height: '100%',overflowY:'scroll' }}>
                            <Box></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ background: 'green', height: '100%' }}>

                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </>
    )
}