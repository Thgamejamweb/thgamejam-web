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

    setPages(pagePaths);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/index" element={<MainPage />} />
          {pages.map((page) => {
            const PageComponent = lazy(() => import(`./page${page}`));

            return <Route key={page} path={page} element={<PageComponent />} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

const MainPage = () => {
  return <div>This is the main page.</div>;
};

export default App;
