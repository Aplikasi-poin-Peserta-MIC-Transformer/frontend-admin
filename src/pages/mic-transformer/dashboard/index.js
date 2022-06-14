import React from 'react'
import Admin from './admin'
import Kelompok from './kelompok'
import { useAuthContext } from "../../../context/authContext";

const Dashboard = () => {
  const { user } = useAuthContext();

  if (user?.role === 'admin') {
    return <Admin />
  } else if (user?.role === 'user') {
    return <Kelompok />
  }
}

export default Dashboard