import React, { useEffect } from 'react'

import styles from "./patientDetails.module.css";
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '../patientsSlice';

export const PatientDetails = () => 
{
    const {patientId} = useParams();

    const dispatch = useDispatch();
    const patients = useSelector(state=>state.patients.patients);

    const foundPatient = patients.find(({_id})=>_id === patientId);

    useEffect(()=>{ 
        dispatch(fetchPatients());
    },[dispatch])

  return (
    <div className={styles[`form-container`]}>
        <h2 className={styles.heading}>{foundPatient?.name} Details</h2>
        <p><b>Name: </b>{foundPatient?.name}</p>
        <p><b>Age: </b> {foundPatient?.age} </p>
        <p><b>Gender: </b> {foundPatient?.gender} </p>
        <p><b>Medical History: </b> {foundPatient?.medicalHistory} </p>
        <p><b>Contact: </b> {foundPatient?.contact} </p>
        <p><b>Assigned Ward: </b> {foundPatient?.assignedWard?.number? foundPatient?.assignedWard?.number:"Ward Deleted"} - {foundPatient?.assignedWard?.specializations}</p>
    </div>
  )
}
