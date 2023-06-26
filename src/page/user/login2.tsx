import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserApi } from "@api/api/thgamejam/user/userApi";
import { GetUserPublicKeyRequest, LoginRequest } from "@api/api/thgamejam/user/user";
import axios from 'axios';
import  {JSEncrypt} from 'jsencrypt';

// const onFinish = (values: any) => {
//     console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };

const customSend = async <T, R>({ method, url, data }: { method: string, url: string, data: T }): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};

const fromRequest = <T = any>(data: T) => {
    return data
}


const userApi = new UserApi(customSend, fromRequest, fromRequest);

const Login2: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin() {


        userApi.getUserPublicKey(new GetUserPublicKeyRequest({
            username: username
        })).then(req => {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(req.publicKey);

            const encryptedData = encrypt.encrypt(password);
            //登入
            userApi.login(new LoginRequest({
                username: username,
                password: encryptedData as string
            })).then(() => {
                console.log('sec');
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>请阅读</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={submitLogin} type="primary" htmlType="submit">
                    登入
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Login2;
