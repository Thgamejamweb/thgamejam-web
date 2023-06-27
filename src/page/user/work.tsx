import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, TextField, Typography, createStyles, makeStyles, styled } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/bottombar";
import React from "react";
import Item from "antd/es/descriptions/Item";
import { Editor } from '@tinymce/tinymce-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default function Home() {
    const [openDialogHeaderImageURL, setOpenDialogHeaderImageURL] = React.useState(false);
    const ClickDialogHeaderImageURLOpen = () => {
        setOpenDialogHeaderImageURL(true);
    };
    const ClickDialogHeaderImageURLClosen = () => {
        setOpenDialogHeaderImageURL(false);
    };

    return (
        <>
            <NavBar></NavBar>
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
                                apiKey=''
                                //onChange={this.handleEditorChange}
                                init={{
                                    //selector: '#tinydemo',
                                    language: 'zh_CN',
                                    height: '300px',
                                    branding: false,
                                    elementpath: false,
                                    placeholder: '请输入内容',
                                    menubar: false,
                                    // 这里我只放了一些我自己使用的toolbar，其他的可以去官网自行查看
                                    toolbar: ` bold italic forecolor | alignleft aligncenter alignright alignjustify |numlist bullist outdent indent`
                                }}
                            />
                        </CardContent>
                        <CardActions sx={{float:"right"}}>
                            <Button size="small">提交</Button>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}