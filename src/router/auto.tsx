import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        importPages();
    }, []);

    const importPages = async () => {
        const modules = import.meta.glob('../page/**/*.tsx');

        const pagePaths = Object.keys(modules).map((path) => {
            return path.replace('../page', '').replace('.tsx', '');
        });

        setPages(pagePaths);
    };

    return (
        <Router>
            <Routes>
                {pages.map((page) => {
                    const PageComponent = React.lazy(() => import(`../page${page}.tsx`));

                    return <Route key={page} path={page} element={<PageComponent />} />;
                })}
            </Routes>
        </Router>
    );
};

export default App;
