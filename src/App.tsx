import React from 'react';

import NavBars from './components/Navbar/navbar';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router';





function App() {
  const navigate = useNavigate();
  return (
    <>
      <NavBars></NavBars>
    </>
  );
}

export default App;
