import { AlertColor, Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Stack, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/footer";
import React, { useEffect } from "react";
import Item from "antd/es/descriptions/Item";
import { Editor } from '@tinymce/tinymce-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { aigcApi, calculateFileHash, competitionApi, fileApi, teamApi, workApi } from "@/http/http_api";
import { CreateWorksRequest } from "@api/api/thgamejam/works/works";
import { useNavigate } from "react-router-dom";
import SnackBar from '@/component/snackbar';
import { GetDownloadUrlByStrRequest, GetDownloadUrlRequest, GetUploadReply, GetUploadUrlRequest } from "@api/api/thgamejam/file/file";
import axios from "axios";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CreateCompetitionRequest } from "@api/api/thgamejam/competition/competition";
import { UpdateContentRequest } from "@api/api/thgamejam/chatgpt/aigc";
import AdbIcon from '@material-ui/icons/Adb';
export default function Home() {
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
    //对话框
    const [openDialogHeaderImageURL, setOpenDialogHeaderImageURL] = React.useState(false);
    //
    const [name, setName] = React.useState('');
    const [headerImageURL, setHeaderImageURL] = React.useState('');
    const [content, setContent] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [signupStartDate, setSignupStartDate] = React.useState('');
    const [signupEndDate, setSignupEndDate] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [scoreStartDate, setScoreStartDate] = React.useState('');
    const [scoreEndDate, setScoreEndDate] = React.useState('');

    //重定向初始化
    const navigate = useNavigate();

    //AI优化
    const [openDialogYouHua, setOpenDialogYouHua] = React.useState(false);
    const [YouHuaContent, setYouHuaContent] = React.useState('');
    const youhuaBtn = () => {
        setOpenDialogYouHua(true);
        if (YouHuaContent == '') {
            youhua();
        }
    }
    const youhua = () => {
        if (YouHuaContent != 'upload') {
            setYouHuaContent('upload');
            aigcApi.updateContent(new UpdateContentRequest({
                content: content
            })).then(req => {
                //console.log(req);
                setYouHuaContent(req.newContent);
                FunSnackbars(1, '优化成功');
            }).catch(req => {
                console.log(req);
                setYouHuaContent('优化失败');
                FunSnackbars(2, '优化失败');
            })
        }
    }


    //提交按钮
    const addBtn = () => {
        competitionApi.createCompetition(new CreateCompetitionRequest({
            name: name,
            headerImageURL: headerImageURL,
            content: content,
            description: description,
            signupStartDate: signupStartDate,
            signupEndDate: signupEndDate,
            startDate: startDate,
            endDate: endDate,
            scoreStartDate: scoreStartDate,
            scoreEndDate: scoreEndDate
        })).then(req => {
            FunSnackbars(1, '添加成功');
        }).catch(req => {
            FunSnackbars(2, '添加失败');
        })
    }
    //内容区域绑定
    const handleEditorChange = (content: React.SetStateAction<string>) => {
        setContent(content);
    };

    //头图上传函数
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                calculateFileHash(selectedFile).then(req => {
                    const fileHash = req;
                    setHeaderImageURL('upload');
                    fileApi.getUploadUrl(new GetUploadUrlRequest({
                        fileName: selectedFile.name as string,
                        fileSize: selectedFile.size as number,
                        eTag: fileHash, // 如果有文件哈希值，可以在这里提供
                    })).then(req => {
                        const { url } = req;
                        const ImgId = req.id;
                        // 使用预签名URL上传文件
                        axios.put(url, selectedFile, {
                            headers: {
                                "Content-Type": selectedFile.type,
                            },
                        }).then(req => {
                            fileApi.getDownloadUrlByid(new GetDownloadUrlRequest({
                                id: ImgId
                            })).then(req => {
                                // 在此处处理上传成功的逻辑
                                FunSnackbars(1, '上传成功');
                                //console.log(req.url);
                                setHeaderImageURL(req.url);
                            }).catch(req => {
                                setHeaderImageURL('');
                                FunSnackbars(2, 'URL获取失败');
                            });
                        }).catch(req => {
                            setHeaderImageURL('');
                            FunSnackbars(2, '上传失败');
                        });
                    }).catch(req => {
                        setHeaderImageURL('');
                        FunSnackbars(2, '上传地址获取失败');
                    })
                })
            }
        }
    };


    return (
        <>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <NavBar></NavBar>
            <Container fixed sx={{ marginTop: '24px', marginBottom: '360px' }}>
                <Card>
                    <CardContent>
                        <Grid container sx={{ marginBottom: '12px' }}>
                            <Grid item sx={{ padding: '4px 4px' }} xs={12} md={10}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="作品名"
                                    multiline
                                    maxRows={4}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    onChange={e => setName(e.target.value)}
                                />
                            </Grid>
                            {/* 上传头图对话框 */}
                            <Grid item sx={{ padding: '4px 4px' }} xs={12} md={2}>
                                <Button
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="contained"
                                    onClick={() => setOpenDialogHeaderImageURL(true)}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    上传头图
                                </Button>
                            </Grid>
                            <Dialog
                                maxWidth='sm'
                                fullWidth={true}
                                open={openDialogHeaderImageURL}
                                onClose={() => setOpenDialogHeaderImageURL(false)}
                                aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">
                                    选择图片
                                </DialogTitle>
                                <DialogContent>
                                    {
                                        headerImageURL != 'upload'
                                            ?
                                            <>
                                                <img style={{ width: "100%" }} src={headerImageURL} alt="" />
                                                <label htmlFor="file-input">
                                                    <input
                                                        accept="image/*"
                                                        id="file-input"
                                                        multiple={false}
                                                        type="file"
                                                        style={{ display: "none" }}
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button
                                                        sx={{ width: '100%', height: '100%' }}
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                    >
                                                        选择图片
                                                    </Button>
                                                </label>
                                            </>
                                            :
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <CircularProgress />
                                            </div>
                                    }
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenDialogHeaderImageURL(false)} color="primary">
                                        完成
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="报名开始日期"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setSignupStartDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="报名结束日期"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setSignupEndDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="此赛开始日期"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setStartDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="比赛结束日期"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setEndDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="评分开始日期"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setScoreStartDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={6} md={4}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="平分结束日期"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => { setScoreEndDate(e.target.value + ' 0:0:0') }}
                                />
                            </Grid>
                            <Grid item sx={{ padding: '4px 4px' }} xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="简介"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    onChange={e => { setDescription(e.target.value) }}
                                />
                            </Grid>
                        </Grid>

                        <Editor
                            inline={false}
                            apiKey='c9xsfs30dnk6exa27xghs44zl6av7syofgfbh9jekewxq01k'
                            value={content}
                            onEditorChange={handleEditorChange}
                            init={{
                                language: 'zh_CN',
                                height: '300px',
                                branding: false,
                                elementpath: false,
                                placeholder: '请输入内容',
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                            }}
                        />
                        <Button
                            sx={{marginTop:'6px', width: '100%', height: '100%' }}
                            variant="contained"
                            onClick={youhuaBtn}
                            startIcon={<AdbIcon />}
                        >
                            AI智能优化
                        </Button>
                        <Dialog
                            maxWidth='sm'
                            fullWidth={true}
                            open={openDialogYouHua}
                            onClose={() => setOpenDialogYouHua(false)}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">
                                AI智能优化
                            </DialogTitle>
                            <DialogContent>
                                {
                                    YouHuaContent != 'upload'
                                        ?
                                        <>
                                            <Editor
                                                inline={false}
                                                apiKey='c9xsfs30dnk6exa27xghs44zl6av7syofgfbh9jekewxq01k'
                                                value={YouHuaContent}
                                                //onEditorChange={handleEditorChange}
                                                init={{
                                                    mode : "textareas",
                                                    language: 'zh_CN',
                                                    height: '300px',
                                                    branding: false,
                                                    elementpath: false,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                    ],
                                                    toolbar: false,
                                                    readonly: true,
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                                                }}
                                            />
                                            <Button
                                                sx={{marginTop:'6px', width: '100%', height: '100%' }}
                                                variant="contained"
                                                onClick={youhua}
                                            //startIcon={<CloudUploadIcon />}
                                            >
                                                重新优化
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <CircularProgress />
                                            </div>
                                            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>优化中...</div>
                                        </>
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialogYouHua(false)} color="primary">
                                    取消
                                </Button>
                                <Button onClick={() => {
                                    setOpenDialogYouHua(false)
                                    setContent(YouHuaContent)
                                }} color="primary">
                                    应用
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardContent>
                    <CardActions sx={{ float: "right" }}>
                        <Button onClick={addBtn} size="small">提交</Button>
                    </CardActions>
                </Card>
            </Container>
            <Bottombar></Bottombar>
        </>
    )
}