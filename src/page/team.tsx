import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../component/navbar";
import Bottombar from "../component/bottombar";
import React, { useState } from "react";
import Item from "antd/es/descriptions/Item";
import { competitionApi, teamApi, userApi } from "@/http/http_api";
import react from "@vitejs/plugin-react-swc";
import { GetTeamMemberListReply, GetTeamMemberListRequest, GetUserAllTeamListReply, GetUserJoinAllTeamListRequest, UserInfo } from "@api/api/thgamejam/team/team";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GetUserIdByNameRequest, GetUserIdInfoReply } from "@api/api/thgamejam/user/user";

export default function Home() {
    const [list, setList] = useState<GetUserAllTeamListReply>();
    const [teamList, setTeamList] = useState<GetTeamMemberListReply>();
    const [teamName, setTeamName] = useState('');
    const [openDialogAddUser, setOpenDialogAddUser] = React.useState(false);
    const [searchUserValue, setSearchUserValue] = React.useState('');
    const [searchUser, setSearchUser] = React.useState<GetUserIdInfoReply>();

    React.useEffect(() => {
        userApi.getUserTokenInfo(undefined).then(req => {

            teamApi.getUserJoinAllTeamList(new GetUserJoinAllTeamListRequest({
                userId: req.id
            })).then(req => {
                setList(req);
            }).catch(req => {
                console.log(req);
            })
        })
    }, [])


    //实时更新搜索列表
    React.useEffect(() => {
        userApi.getUserIdByName(new GetUserIdByNameRequest({
            name: searchUserValue
        })).then(req => {
            setSearchUser(req)
        }).catch(req =>{
            setSearchUser(undefined);
        })
    }, [searchUserValue])

    const editTeamBtn = (teamName: string, teamId: number) => {
        teamApi.getTeamMemberList(new GetTeamMemberListRequest({
            teamId: teamId
        })).then(req => {
            setTeamName(teamName);
            setTeamList(req);
        }).catch(req => {
            console.log(req);
        })
    }

    const getSearchUser = () => {
        if (searchUser != undefined)
            return (
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText primary={searchUserValue} />
                    </ListItem>
                </List>
            )
    }

    const editStatus = () => {
        if (teamName != '') {
            return (
                <Container fixed sx={{ marginTop: '24px' }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={10}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="点击编辑修改队伍"
                                        value={teamName}
                                        multiline
                                        maxRows={4}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={2}>
                                    <Button
                                        sx={{ width: '100%', height: '100%' }}
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                    >
                                        修改队伍名称
                                    </Button>
                                </Grid>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>头像</TableCell>
                                                    <TableCell align="right">成员</TableCell>
                                                    <TableCell align="right">操作</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {teamList?.list.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell component="th" scope="row">
                                                            <Avatar alt="Remy Sharp" src={row.avatarUrl} />
                                                        </TableCell>
                                                        <TableCell align="right">{row.name}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Button onClick={() => setOpenDialogAddUser(true)} sx={{ float: 'right' }} href="#text-buttons" color="primary">邀请成员</Button>
                                        {/* 弹窗 */}
                                        <Dialog
                                            fullWidth={true}
                                            maxWidth='sm'
                                            open={openDialogAddUser}
                                            onClose={() => setOpenDialogAddUser(false)}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">选择用户</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    id="filled-multiline-flexible"
                                                    label="用户名"
                                                    multiline
                                                    maxRows={4}
                                                    onChange={(e) => setSearchUserValue(e.target.value)}
                                                    sx={{ width: '100%' }}
                                                    variant="filled"
                                                />
                                                {getSearchUser()}
                                            </DialogContent>
                                            <DialogActions>
                                                {/* <Button onClick={ClickDialogHeaderImageURLClosen} color="primary">
                                                    取消
                                                </Button> */}
                                                <Button onClick={() => setOpenDialogAddUser(false)} color="primary">
                                                    确定
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            )
        } else {
            return null;
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ height: window.innerHeight - 60 }}>
                <Container fixed sx={{ marginTop: '24px' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">队名</TableCell>
                                    <TableCell align="right">操作</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list?.list.map((row) => (
                                    <TableRow key={row.teamId}>
                                        <TableCell component="th" scope="row">
                                            {row.teamId}
                                        </TableCell>
                                        <TableCell align="right">{row.teamName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => editTeamBtn(row.teamName, row.teamId)} aria-label="EditIcon">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                {editStatus()}
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}