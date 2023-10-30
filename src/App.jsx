import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { SideBar } from './components/sideBar/sideBar'
import { Patients } from './pages/patients/Patients.jsx'
import { Ward } from './pages/wards/Ward.jsx'
import { Hospital } from './pages/hospital/Hospital.jsx'


function App() {

  return (
    <div className='app'>
      <SideBar />

      <Routes>
        <Route path='/' element={<Patients />} />
        <Route path='/wards' element={<Ward />} />
        <Route path='/hospital' element={<Hospital />} />
      </Routes>

    </div>
  )
}

export default App
