import { Box, Grid, Stack, Typography } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/bottombar";


export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{height:window.innerHeight - 60 }}></Box>
            <Bottombar></Bottombar>
        </>
    )
}