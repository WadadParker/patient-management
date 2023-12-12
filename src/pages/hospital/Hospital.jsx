import styles from "./hospital.module.css";

import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { fetchWards } from "../../features/wards/wardsSlice";
import { fetchPatients } from "../../features/patients/patientsSlice";

export const Hospital = () => 
{
  const wards = useSelector(state=>state.wards.wards);
  const patients = useSelector(state=>state.patients.patients);
  const dispatch = useDispatch();

  const totalPatients = patients.length;
  const totalWardCapacity = wards.reduce((acc,curr)=> acc + curr.capacity,0);
  const occupancyRate = totalWardCapacity - totalPatients;

  useEffect(()=>
  {
    dispatch(fetchWards());
    dispatch(fetchPatients());
  },[dispatch])

  return (
    <div className={styles[`form-container`]}>
      <h1>Hospital Details</h1>
      <p>Total Number of Patients: {totalPatients ?? ""}</p>
      <p>Current Occupancy Rate: {occupancyRate ?? ""}</p>
    </div>
  )
}
