import Bottombar from "@/component/bottombar";
import NavBar from "@/component/navbar";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Divider } from "antd";
import { useState } from "react";



interface CompetitionDetial {
    startSignUp: string,
    endSignUp: string,
    start: string,
    end: string,
    startScore: string,
    endScore: string,
}


function Competition(info: CompetitionDetial) {

    const startSignUpDate: Date = new Date(info.startSignUp);
    const endSignUpDate: Date = new Date(info.endSignUp);
    const startDate: Date = new Date(info.start);
    const endDate: Date = new Date(info.end);
    const scoreStartDate: Date = new Date(info.startScore);
    const scoreEndDate: Date = new Date(info.endScore);

    const now = new Date().getDate();
    const signUp: boolean = now > startSignUpDate.getDate() && now < endSignUpDate.getDate();
    const preparation: boolean = now > endSignUpDate.getDate() && now < startDate.getDate();
    const started: boolean = now > startDate.getDate() && now < endDate.getDate();
    const scorePreparation: boolean = now > endDate.getDate() && now < scoreStartDate.getDate();
    const score: boolean = now > scoreStartDate.getDate() && now < scoreEndDate.getDate();
    const end: boolean = now > scoreEndDate.getDate();
    return (
        <Card sx={{ width: '60%', bgcolor: '#9EBCF0' }}>
            <CardContent >
                <Box sx={{ height: '100px' }}>
                    <Typography variant="h2" sx={{ pt: '10px' }}>
                        adadadadada
                    </Typography>
                    <Typography variant="h6">
                        hosted by
                    </Typography>
                </Box>
                <Divider ></Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{
                        width: '70%', height: '130px',
                        borderRadius: '8px', overflow: 'auto', border: '1px solid white',
                        color: 'black'
                    }}>
                        <Box sx={{
                            height: '40%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderBottom: '1px solid white'
                        }}>
                            {signUp ? 'sign up period' : preparation ? 'preparation time' :
                                started ? 'jaming' : score ? ' scoring' :
                                    end ? 'end' : ''}

                        </Box>
                        <Box sx={{
                            height: '59%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Grid container sx={{ height: '100%' }}>
                                <Grid xs={signUp ? 8 : 12} sx={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    borderRight: '1px solid white'
                                }} >
                                    From {
                                        signUp ? info.startSignUp : preparation ? info.endSignUp :
                                            started ? info.start : score ? info.startScore :
                                                end ? info.endScore : ''}
                                    To {
                                        signUp ? info.endSignUp : preparation ? info.start :
                                            started ? info.end : score ? info.endScore :
                                                end ? ' ' : ''

                                    }
                                </Grid>
                                <Grid xs={4} sx={{ display: signUp ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}  >
                                    <Button sx={{ color: 'white', bgcolor: 'black' }}>Join Jam</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default function CompetitionDetails() {

    var info: CompetitionDetial = {
        startSignUp: "2023-06-28 02:44:14",
        endSignUp: "2023-06-28 02:44:14",
        start: "2023-06-28 02:44:14",
        end: "2023-06-28 02:44:14",
        startScore: "2023-06-28 02:44:14",
        endScore: "2023-06-28 02:44:14"
    }
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ width: '100%', pt: '150px', pb: '150px', display: 'flex', justifyContent: 'center' }}>
                <Competition
                   startSignUp={info.startSignUp}
                   endSignUp={info.endSignUp}
                   start={info.start}
                   end={info.end}
                   startScore={info.startScore}
                   endScore={info.endScore}
                >
                </Competition>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}

