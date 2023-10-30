import React from 'react'

import styles from "./patients.module.css"

import { AddPatient } from '../../features/patients/addPatient/AddPatient'

export const Patients = () => {
  return (
    <div>
      <h1>Patients</h1>
      <AddPatient />
    </div>
  )
}
