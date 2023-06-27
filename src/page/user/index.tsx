import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/bottombar";
import React from "react";
import Item from "antd/es/descriptions/Item";

export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ height: window.innerHeight - 60 }}>
                <Container fixed sx={{ marginTop: '24px' }}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={3} sm={1}>
                                    <Avatar sx={{
                                        padding: 0,
                                        width: '100%',
                                        maxWidth: '120px',
                                        height: 'auto',
                                        aspectRatio: '1/1' // 设置宽高比例为1:1，根据需要进行调整
                                    }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </Grid>
                                <Grid item sx={{ paddingLeft: '16px' }} xs={9} sm={11}>
                                    <Typography variant="h6" gutterBottom>
                                        用户名
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{ marginTop: '24px' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12}>
                                    <TextField
                                        sx={{ width: "100%"}}
                                        id="filled-multiline-flexible"
                                        label="用户描述"
                                        multiline
                                        rows={6}
                                        // value={}
                                        // onChange={}
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={6}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        id="filled-multiline-flexible"
                                        label="密码"
                                        multiline
                                        maxRows={4}
                                        // value={}
                                        // onChange={}
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={6}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        id="filled-multiline-flexible"
                                        label="重复密码"
                                        multiline
                                        maxRows={4}
                                        // value={}
                                        // onChange={}
                                        variant="filled"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{float:"right"}}>
                            <Button size="small" color="primary">
                                修改
                            </Button>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}