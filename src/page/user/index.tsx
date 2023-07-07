import { AlertColor, Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/footer";
import React, { useState } from "react";
import Item from "antd/es/descriptions/Item";
import { GetUserAllTeamListReply, GetUserJoinAllTeamListRequest, RejectJoinTeamRequest, SetTeamMemberRequest } from "@api/api/thgamejam/team/team";
import { competitionApi, teamApi, userApi, workApi } from "@/http/http_api";
import list from "antd/es/list";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { ChangeDescriptionRequest, ChangePasswordRequest, GetUserIdInfoReply, GetUserInfoByIdRequest, UserInfoReply } from "@api/api/thgamejam/user/user";
import Password from "antd/es/input/Password";
import SnackBar from '@/component/snackbar'
import { CompetitionListReply, GetTeamJoinCompetitionListRequest, GetUserJoinCompetitionListRequest } from "@api/api/thgamejam/competition/competition";
import { GetAllWorksByUserReply, GetWorksByIdRequest, GetWorksListByTeamIdReply, WorksIdRequest } from "@api/api/thgamejam/works/works";
import { useNavigate } from "react-router-dom";

interface ItemInfo {
    description?: string,
    staffName?: string,
    id: number,
    name: string,
    image: string,
}


export default function Home() {

    const [list, setList] = useState<GetUserAllTeamListReply>();
    const [listStatus, setListStatus] = useState(0);
    const [userData, setUserData] = useState<UserInfoReply>();
    const [userId, setUserId] = useState<number>();
    const [userDataStatus, setUserDataStatus] = useState(0);
    const [userJoinComList, setUserJoinComList] = useState<CompetitionListReply>();
    const [teamJoinWorksList, setTeamJoinWorksList] = useState<GetAllWorksByUserReply>();

    const [changeDescriptionDialog, setChangeDescriptionDialog] = useState(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    const [oldChangePassword, setOldChangePassword] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const navigate = useNavigate();

    //Card
    function ItemCard(item: ItemInfo) {
        return (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card onClick={()=>navigate('/work?workId='+item.id)}>
                    <CardActionArea>
                        <CardMedia
                            style={{ height: 140 }}
                            image={item.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions> */}
                </Card>
            </Grid>
        )
    }

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

    //初始化比赛列表
    React.useEffect(() => {
        userApi.getUserTokenInfo(undefined).then(req => {
            competitionApi.getUserJoinCompetitionList(new GetUserJoinCompetitionListRequest({
                userId: req.id
            })).then(req => {
                setUserJoinComList(req);
            }).catch(req => {
                console.log(req);
            })

            workApi.getAllWorksByUserRequest(undefined).then(req => {
                console.log(req);
                
                setTeamJoinWorksList(req)
            }).catch(req => {
                console.log(req);
            })
        });

    }, [userDataStatus])

    //用户信息
    React.useEffect(() => {
        userApi.getUserTokenInfo(undefined).then(req => {
            setUserId(req.id);
            userApi.getUserInfoById(new GetUserInfoByIdRequest({
                userId: req.id
            })).then(req => {
                setUserData(req);
            }).catch(req => {
                console.log(req);
            })
        }).catch(req => {
            console.log(req);
        })
    }, [userDataStatus])

    //邀请队伍列表
    React.useEffect(() => {
        teamApi.getAllRequestTeamList(undefined).then(req => {
            setList(req);
        }).catch(req => {
            console.log(req);
        })
    }, [listStatus])

    //加入
    const RejectJoinTeamBtn = (teamId: number) => {
        teamApi.rejectJoinTeam(new RejectJoinTeamRequest({
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '成功拒绝');
            setListStatus(listStatus + 1);
        }).catch(req => {
            FunSnackbars(1, '拒绝失败');
        })
    }
    //拒绝
    const JoinTeamBtn = (userId: number, teamId: number) => {
        teamApi.joinTeam(new SetTeamMemberRequest({
            userId: userId,
            teamId: teamId
        })).then(req => {
            FunSnackbars(1, '成功加入');
            setListStatus(listStatus + 1);
        }).catch(req => {
            FunSnackbars(2, '加入失败');
        })
    }

    //修改信息
    const ChangeDescriptionBtn = () => {
        userApi.changeDescription(new ChangeDescriptionRequest({
            description: userData?.description
        })).then(req => {
            setChangeDescriptionDialog(false);
            FunSnackbars(1, '修改成功');
        }).catch(req => {
            FunSnackbars(2, '修改失败');
        })
    }
    //修改密码
    const ChangePasswordBtn = () => {
        userApi.changePassword(new ChangePasswordRequest({
            oldPassword: oldChangePassword,
            newPassword: changePassword
        })).then(req => {
            setChangePasswordDialog(false);
            FunSnackbars(1, '修改成功');
        }).catch(req => {
            FunSnackbars(2, '修改失败');
        })
    }

    return (
        <>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <NavBar></NavBar>

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
                                    {userData?.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {userData?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => setChangeDescriptionDialog(true)} size="small" color="primary">
                            修改信息
                        </Button>
                        <Button onClick={() => setChangePasswordDialog(true)} size="small" color="primary">
                            修改密码
                        </Button>
                    </CardActions>
                </Card>

                <Dialog
                    fullWidth={true}
                    maxWidth='sm'
                    open={changeDescriptionDialog}
                    onClose={() => setChangeDescriptionDialog(false)}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">修改信息</DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{ width: "100%" }}
                            id="filled-multiline-flexible"
                            label="用户描述"
                            multiline
                            rows={6}
                            value={userData?.description}
                            onChange={(e) => setUserData(new UserInfoReply({
                                id: userData?.id,
                                name: userData?.name,
                                avatarImage: userData?.avatarImage,
                                isStaff: userData?.isStaff,
                                description: e.target.value,
                            }))}
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setChangeDescriptionDialog(false)} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => ChangeDescriptionBtn()} color="primary">
                            修改
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    fullWidth={true}
                    maxWidth='sm'
                    open={changePasswordDialog}
                    onClose={() => setChangePasswordDialog(false)}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={6}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="filled-multiline-flexible"
                                    label="旧密码"
                                    type="password"
                                    multiline
                                    maxRows={4}
                                    onChange={(e) => setChangePassword(e.target.value)}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={6}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="filled-multiline-flexible"
                                    label="新密码"
                                    multiline
                                    type="password"
                                    maxRows={4}
                                    onChange={(e) => setOldChangePassword(e.target.value)}
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setChangePasswordDialog(false)} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => ChangePasswordBtn()} color="primary">
                            修改
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>

            <Container fixed sx={{ marginTop: '36px' }}>
                <h3>我的比赛</h3>
                <Grid container spacing={2}>
                    {userJoinComList?.list.map((item) => {
                        return (
                            <ItemCard name={item.name} id={item.id} image={item.headerImageURL} staffName={item.staffName} description={item.description}></ItemCard>
                        )
                    })}
                </Grid>
            </Container>

            <Container fixed sx={{ marginTop: '36px' }}>
                <h3>我的作品</h3>
                <Grid container spacing={2}>
                    {teamJoinWorksList?.workList.map((item) => {
                        return (
                            <ItemCard name={item.workName} id={item.id} image={item.headerImageURL} staffName={''} description={''}></ItemCard>
                        )
                    })}
                </Grid>
            </Container>

            <Container fixed sx={{ marginTop: '36px', marginBottom: '20%' }}>
                <h3>入队邀请</h3>
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
                            {list?.list && list.list.map((row) => (
                                <TableRow key={row.teamId}>
                                    <TableCell component="th" scope="row">
                                        {row.teamId}
                                    </TableCell>
                                    <TableCell align="right">{row.teamName}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => JoinTeamBtn(userId as number, row.teamId)} aria-label="EditIcon">
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton onClick={() => RejectJoinTeamBtn(row.teamId)} aria-label="delete">
                                            <CloseIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Bottombar></Bottombar>
        </>
    )
}