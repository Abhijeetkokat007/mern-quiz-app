import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout'
import Settings from './Settings'


function Dashboard() {
  return (
    <RootLayout>
      <Routes>
       
        <Route path="/dashbord/settings" element={<Settings />} />
       
      </Routes>
    </RootLayout>
  )
}

export default Dashboard
