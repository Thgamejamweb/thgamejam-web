import React from 'react';
import PrimarySearchAppBar from './components/Navbar/navbar';
import NavTabs from './components/Navbar/navbar';
import BasicCard from './pages/Login/login';


function App() {
  return (
    <>
      <NavTabs></NavTabs>
      <BasicCard></BasicCard>
    </>
  );
}

export default App;
