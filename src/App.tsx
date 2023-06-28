import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserApi } from '@api/api/thgamejam/user/userApi';
import { GetUserIdInfoReply } from '@api/api/thgamejam/user/user';

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求前进行处理
    // 这里可以添加请求头等操作
    return config;
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    // 在接收到响应后进行处理
    // 这里可以对响应数据进行处理
    return response;
});

// 请求
const customSend = async <T, R>({ method, url, data }: { method: string, url: string, data: T }): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};
const fromResponse = <T = any>(data: T) => {
    return data;
}
const fromRequest = <T = any>(data: T) => {
    return JSON.stringify(data);
}
const userApi = new UserApi(customSend, fromRequest, fromResponse);

const App = () => {
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        importPages();
    }, []);

    const importPages = async () => {
        userApi.getUserTokenInfo(undefined).then((req: GetUserIdInfoReply) => {
            console.log('sec');
        }).catch((req: GetUserIdInfoReply) => {
            console.log('error');
        });

        const modules = import.meta.glob('/src/page/**/*.tsx');
        const pagePaths = Object.keys(modules).map((path) => {
            return path.replace('/src/page', '').replace('.tsx', '');
        });
        setPages(pagePaths);
    };

    // 路由拦截函数
    const handleRoute = (page: string) => {
        if (page === '/xxx.xxx.xxx/page') {
            // 这里可以根据需要进行相关处理，比如跳转到其他页面或执行特定操作
            return <Navigate to="/other-page" />;
        } else {
            const PageComponent = lazy(() => import(`/src/page${page}.tsx` as any));
            return <Route key={page} path={page} element={<PageComponent />} />;
        }
    };

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {pages.map((page) => handleRoute(page))}
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
