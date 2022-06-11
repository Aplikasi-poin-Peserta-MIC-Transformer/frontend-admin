import React from 'react'
import Admin from './admin'
import Kelompok from './kelompok'

const Dashboard = () => {
  const role = localStorage.getItem('role')

  if (role === 'admin') {
    return <Admin />
  } else if (role === 'user') {
    return <Kelompok />
  }
}

export default Dashboard