import { useState } from 'react';
import Login from "./login";
import Register from "./register";
import { Box } from '@mui/material';
import Topbar from './topbar';

interface ILogin {
    login: boolean
}
export default function UserAccess({ login }: ILogin) {

    const [isLogin, setIsLogin] = useState(login);

    const loginCallback = (register: boolean) => {
        setIsLogin(false);
    }

    return (
        <>
           <Topbar></Topbar>
            <Box sx={{ height: window.innerHeight - 75, bgcolor: '#F4F4F4' }}>
                <Box sx={{ height: 500, pt: 5, bgcolor: '#F4F4F4', display: 'flex', justifyContent: 'center' }}>
                    {isLogin ? <Login callback={loginCallback}></Login> : <Register></Register>}
                </Box>
            </Box>
        </>
    )
}