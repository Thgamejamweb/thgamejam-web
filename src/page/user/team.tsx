import { AlertColor, Avatar, Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/footer";
import React, { useState } from "react";
import Item from "antd/es/descriptions/Item";
import { competitionApi, teamApi, userApi } from "@/http/http_api";
import react from "@vitejs/plugin-react-swc";
import { ChangeTeamNameRequest, CreateTeamRequest, DeleteTeamRequest, GetTeamMemberListReply, GetTeamMemberListRequest, GetUserAllTeamListReply, GetUserJoinAllTeamListRequest, SetTeamMemberRequest, UserInfo } from "@api/api/thgamejam/team/team";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GetUserIdByNameRequest, GetUserIdInfoReply } from "@api/api/thgamejam/user/user";
import SnackBar from '@/component/snackbar'
import { useNavigate } from "react-router-dom";
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export default function Home() {
    const navigate = useNavigate();
    const [list, setList] = useState<GetUserAllTeamListReply>();
    const [teamList, setTeamList] = useState<GetTeamMemberListReply>();
    const [teamName, setTeamName] = useState('');
    const [editViewStatus, setEditViewStatus] = useState('');
    const [addTeamName, setAddTeamName] = useState('');
    const [teamListStatus, setTeamListStatus] = useState(0);
    const [teamId, setTeamId] = useState<number>();
    const [openDialogAddUser, setOpenDialogAddUser] = React.useState(false);
    const [openDialogAddTeam, setOpenDialogAddTeam] = React.useState(false);
    const [searchUserValue, setSearchUserValue] = React.useState('');
    const [searchUser, setSearchUser] = React.useState<GetUserIdInfoReply>();


    //队伍列表
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
    }, [teamListStatus])

    //弹窗
    const [snackbarsState, setSnackbarsState] = React.useState(false);
    const [snackbarsSeverity, setSnackbarsSeverity] = React.useState<AlertColor>('info');
    const [snackbarsMessage, setSnackbarsMessage] = React.useState('');
    const FunSnackbars = (Severity: number, Message: string) => {
        setSnackbarsMessage(Message);
        let data: AlertColor;
        switch (Severity) {
            case 1:
                data = 'success';
                break;
            case 2:
                data = 'warning';
                break;
            case 3:
                data = 'error';
                break;
            default:
                data = 'info'
                break;
        }
        setSnackbarsSeverity(data);
        setSnackbarsState(true);
    }

    //实时更新搜索列表
    React.useEffect(() => {
        userApi.getUserIdByName(new GetUserIdByNameRequest({
            name: searchUserValue
        })).then(req => {
            setSearchUser(req)
        }).catch(req => {
            setSearchUser(undefined);
        })
    }, [searchUserValue])


    const editTeamBtn = (teamName: string, teamId: number) => {
        setTeamId(teamId);
        teamApi.getTeamMemberList(new GetTeamMemberListRequest({
            teamId: teamId
        })).then(req => {
            setTeamName(teamName);
            setTeamList(req);
            setEditViewStatus('true');
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

    const editTeamNameBtn = () => {
        teamApi.changeTeamName(new ChangeTeamNameRequest({
            newName: teamName,
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '修改成功');
            setTeamListStatus(teamListStatus + 1);
        }).catch(req => {
            console.log(req);
        })
    }

    const addTeamUserBtn = () => {
        teamApi.addTeamMember(new SetTeamMemberRequest({
            userId: searchUser?.id,
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '邀请成功');
            //关闭弹窗
            setOpenDialogAddUser(false);
        }).catch(req => {
            FunSnackbars(2, '邀请失败');
        })
    }

    const deleteTeamUserBtn = (userId: number) => {
        teamApi.deleteTeamMember(new SetTeamMemberRequest({
            userId: userId,
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '删除成功');
            //更新列表
            teamApi.getTeamMemberList(new GetTeamMemberListRequest({
                teamId: teamId
            })).then(req => {
                setTeamList(req);
            }).catch(req => {
                console.log(req);
            })
        }).catch(req => {
            FunSnackbars(2, '删除失败');
        })
    }

    const deleteTeamBtn = (teamId: number) => {
        teamApi.deleteTeam(new DeleteTeamRequest({
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '删除成功');
            //更新列表
            setTeamListStatus(teamListStatus + 1);
        }).catch(req => {
            FunSnackbars(2, '删除失败');
        })
    }

    const addTeamBtn = () => {
        teamApi.createTeam(new CreateTeamRequest({
            name: addTeamName
        })).then(req => {
            FunSnackbars(1, '创建成功');
            //关闭弹窗更新列表
            setOpenDialogAddTeam(false);
            setTeamListStatus(teamListStatus + 1);
        }).catch(req => {
            FunSnackbars(2, '创建失败');
        })
    }

    const editStatus = () => {
        if (editViewStatus != '') {
            return (
                <Card variant="outlined" sx={{ marginTop: '24px' }}>
                    <CardContent>
                        <Grid container>
                            <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={10}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="队伍名称"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
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
                                    onClick={() => editTeamNameBtn()}
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
                                                        <IconButton onClick={() => deleteTeamUserBtn(row.id)} aria-label="delete">
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
                                            <Button onClick={() => setOpenDialogAddUser(false)} color="primary">
                                                取消
                                            </Button>
                                            <Button onClick={() => addTeamUserBtn()} color="primary">
                                                邀请
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        } else {
            return null;
        }
    }


    return (
        <>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <NavBar></NavBar>
            <Container fixed sx={{ marginTop: '24px', marginBottom: '20%' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">队名</TableCell>
                                <TableCell align="right">作品</TableCell>
                                <TableCell align="right">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list?.list && list?.list.map((row) => (
                                <TableRow key={row.teamId}>
                                    <TableCell component="th" scope="row">
                                        {row.teamId}
                                    </TableCell>
                                    <TableCell align="right">{row.teamName}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => navigate('/user/work?teamId=' + row.teamId)} color="primary">
                                            创建作品
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => editTeamBtn(row.teamName, row.teamId)} aria-label="EditIcon">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteTeamBtn(row.teamId)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button startIcon={<ControlPointIcon />} onClick={() => setOpenDialogAddTeam(true)} sx={{ float: 'right' }} href="#text-buttons" color="primary">创建队伍</Button>
                    {/* 弹窗 */}
                    <Dialog
                        fullWidth={true}
                        maxWidth='sm'
                        open={openDialogAddTeam}
                        onClose={() => setOpenDialogAddTeam(false)}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">创建队伍</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="filled-multiline-flexible"
                                label="队伍名称"
                                multiline
                                maxRows={4}
                                onChange={(e) => setAddTeamName(e.target.value)}
                                sx={{ width: '100%' }}
                                variant="filled"
                            />
                            {getSearchUser()}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialogAddTeam(false)} color="primary">
                                取消
                            </Button>
                            <Button onClick={() => addTeamBtn()} color="primary">
                                创建
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
                {editStatus()}
            </Container>
            <Bottombar></Bottombar>
        </>
    )
}