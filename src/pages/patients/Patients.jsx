import React from 'react'

import styles from "./patients.module.css"

import { AddPatient } from '../../features/patients/addPatient/AddPatient'
import { PatientList } from '../../features/patients/patientList/PatientList'

export const Patients = () => {
  return (
    <div>
      <h1>Patients</h1>
      <section className={styles.container}>
      <AddPatient />
      <PatientList />
      </section>
    </div>
  )
}
