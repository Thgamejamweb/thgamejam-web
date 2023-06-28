import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../component/navbar";
import Bottombar from "../component/bottombar";
import React from "react";
import Item from "antd/es/descriptions/Item";
import { competitionApi, teamApi } from "@/http/http_api";
import react from "@vitejs/plugin-react-swc";
import { GetTeamMemberListRequest } from "@api/api/thgamejam/team/team";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function Home() {
    React.useEffect(() => {
        teamApi.getTeamMemberList(new GetTeamMemberListRequest({
            teamId:10
        })).then(req => {
            console.log(req);
        }).catch(req => {
            console.log(req);
        })
    },[])   
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ height: window.innerHeight - 60 }}>
                <Container fixed sx={{ marginTop: '24px' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}