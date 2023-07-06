import { AlertColor, Avatar, Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/bottombar";
import React from "react";
import Item from "antd/es/descriptions/Item";
import { Editor } from '@tinymce/tinymce-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { teamApi, workApi } from "@/http/http_api";
import { CreateWorksRequest } from "@api/api/thgamejam/works/works";
import { useNavigate } from "react-router-dom";
import SnackBar from '@/component/snackbar';

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


    const [openDialogHeaderImageURL, setOpenDialogHeaderImageURL] = React.useState(false);

    const [name, setName] = React.useState('');
    const [headerImageURL, setHeaderImageURL] = React.useState('');
    const [content, setContent] = React.useState('');
    const navigate = useNavigate();

    const ClickDialogHeaderImageURLOpen = () => {
        setOpenDialogHeaderImageURL(true);
    };
    const ClickDialogHeaderImageURLClosen = () => {
        setOpenDialogHeaderImageURL(false);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('workId');
    const teamId = Number(urlParams.get('teamId') as unknown);
    if (teamId == 0) {
        navigate('/index');
        return;
    }

    const addWorks = () => {
        workApi.createWorks(new CreateWorksRequest({
            name: name,
            teamId: teamId,
            headerImageURL: 'https://img1.imgtp.com/2023/06/20/2sqWClRH.png',
            content: content,
            fileId: 0,
            imageUrlList: []
        })).then(req => {
            FunSnackbars(1, '添加成功');
        }).catch(req => {
            FunSnackbars(2, '添加失败');
        })
    }
    const handleEditorChange = (content: React.SetStateAction<string>) => {
        setContent(content);
    };

    return (
        <>
            <NavBar></NavBar>
            <SnackBar severity={snackbarsSeverity} open={snackbarsState} setOpen={setSnackbarsState} message={snackbarsMessage} />
            <Box sx={{ height: window.innerHeight - 60 }}>
                <Container fixed sx={{ marginTop: '24px' }}>
                    <Card>
                        <CardContent>
                            <Grid container sx={{ marginBottom: '12px' }}>
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={10}>
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
                                <Grid item sx={{ padding: '4px 4px' }} xs={12} sm={2}>
                                    <Button
                                        sx={{ width: '100%', height: '100%' }}
                                        variant="contained"
                                        //color="default"
                                        //className={classes.button}
                                        onClick={ClickDialogHeaderImageURLOpen}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        上传头图
                                    </Button>
                                </Grid>
                                <Dialog open={openDialogHeaderImageURL} onClose={ClickDialogHeaderImageURLClosen} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">选择图片</DialogTitle>
                                    <DialogContent>
                                        <img style={{ width: "100%" }} src="https://img1.imgtp.com/2023/06/27/c6DJUd0e.jpg" alt="" />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        >
                                            选择图片
                                        </Button>
                                    </DialogContent>
                                    <DialogActions>
                                        {/* <Button onClick={ClickDialogHeaderImageURLClosen} color="primary">
                                            取消
                                        </Button> */}
                                        <Button onClick={ClickDialogHeaderImageURLClosen} color="primary">
                                            确定
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>

                            <Editor
                                inline={false}
                                //value={this.state.body}
                                //selector='#tinydemo'
                                // 这里放入上面注册成功的Tiny API Key
                                apiKey='c9xsfs30dnk6exa27xghs44zl6av7syofgfbh9jekewxq01k'
                                //onChange={this.handleEditorChange}
                                value={content}
                                onEditorChange={handleEditorChange}
                                init={{
                                    //selector: '#tinydemo',
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
                        </CardContent>
                        <CardActions sx={{ float: "right" }}>
                            <Button onClick={addWorks} size="small">提交</Button>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}