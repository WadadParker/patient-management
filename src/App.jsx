import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { SideBar } from './components/sideBar/sideBar'
import { Patients } from './pages/patients/Patients.jsx'
import { Ward } from './pages/wards/Ward.jsx'
import { Hospital } from './pages/hospital/Hospital.jsx'
import { PatientDetails } from './features/patients/patientDetails/PatientDetails'


function App() {

  return (
    <div className='app'>
      <SideBar />

      <Routes>
        <Route path='/' element={<Patients />} />
        <Route path='/wards' element={<Ward />} />
        <Route path='/hospital' element={<Hospital />} />
        <Route path='/patients/:patientId' element={<PatientDetails />} />
      </Routes>

    </div>
  )
}

export default App
