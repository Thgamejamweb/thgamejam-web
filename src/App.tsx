import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        importPages();
    }, []);

    const importPages = async () => {
        const modules = import.meta.glob('./page/**/*.tsx');

        const pagePaths = Object.keys(modules).map((path) => {
            return path.replace('./page', '').replace('.tsx', '');
        });

        console.log(pagePaths);

        setPages(pagePaths);
    };

    const renderRoutes = () => {
        return pages.map((page) => {
            const PageComponent = lazy(() => import(`./page${page}`));

            return [
                <Route key={page} path={page} element={<PageComponent />} />,
                page.includes('index') && (
                    <Route
                        key={page}
                        path={page.replace('index', '')}
                        element={<PageComponent />}
                    />
                ),
            ];
        });
    };

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>{renderRoutes()}</Routes>
            </Suspense>
        </Router>
    );
};

export default App;
