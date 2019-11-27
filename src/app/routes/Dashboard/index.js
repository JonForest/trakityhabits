import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/Header';

export default function Dashboard() {
  console.log('Dashboard');
  return (
    <>
      <Header />
      <Link to="/2019-10-20">Temp habits link</Link>
    </>
  )
}
