// do not need it from React 17+
// import React from 'react'
import './home.css';
import Navbar from '../../components/navbar/Navbar';
import Shows from '../../components/shows/Shows';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Shows />
    </div>
  );
};

export default Home;
