import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './page/index'
import UserIndex from './page/user/index'

const App = () => {
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        importPages();
    }, []);

    const importPages = async () => {
        const modules = import.meta.glob('/src/page/**/*.tsx');
        //console.log(modules );
    
        const pagePaths = Object.keys(modules).map((path) => {
            return path.replace('/src/page', '').replace('.tsx', '');
        });
        console.log(pagePaths);
        

        setPages(pagePaths);
    };

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route key={0} path={'/'} element={<Index />} />;
                    <Route key={1} path={'/user'} element={<UserIndex />} />;
                    {pages.map((page) => {
                        const PageComponent = React.lazy(() => import(/* @vite-ignore */`/src/page${page}.tsx` as any));

                        return <Route key={page} path={page} element={<PageComponent />} />;
                    })}
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
