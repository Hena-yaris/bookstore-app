import React, { useContext } from 'react'
import { AppState } from '../App';

function Dashboard() {
  const {user} = useContext(AppState);
  console.log(user);
  return (
    <>
      <h1>Dashboard</h1>
      <h2>selam😘 {user.username}</h2>
      <h2>you are {user.msg}</h2>
      <h6>😘 {user.role}</h6>
    </>
  );
}

export default Dashboard