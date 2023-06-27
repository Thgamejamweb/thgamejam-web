import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        importPages();
    }, []);

    const importPages = async () => {
        const modules = import.meta.globEager('../page/**/*.tsx');

        const pagePaths = Object.keys(modules).map((path) => {
            return path.replace('../page', '').replace('.tsx', '');
        });

        setPages(pagePaths);
    };

    return (
        <Router>
            <Routes>
                {pages.map((page) => {
                    const PageComponent = lazy(() => import(`./page${page}.tsx` /* webpackIgnore: true */));

                    return (
                        <Route key={page} path={page} element={<Suspense fallback={<div>Loading...</div>}><PageComponent /></Suspense>} />
                    );
                })}
            </Routes>
        </Router>
    );
};

export default App;
