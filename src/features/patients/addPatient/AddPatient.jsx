import styles from "./addPatient.module.css";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { addNewPatient , fetchPatients } from "../patientsSlice"; 
import { fetchWards } from "../../wards/wardsSlice";

export const AddPatient = () => 
{
  const [input,setInput] = useState({name:"",age:"",medicalHistory:"",contact:"",assignedWard:"",gender:"Male"})

  const wards = useSelector(state=>state.wards.wards);
  const dispatch = useDispatch();

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev, [inputField]:text}));
  }

  const isDisabled = () => input.name==="" || input.age<1 || input.medicalHistory==="" || input.contact==="" || input.assignedWard===""

  const clickHandler =()=>
  {
    dispatch(addNewPatient({name:input.name, age:Number(input.age), medicalHistory:input.medicalHistory,gender:input.gender, contact:input.contact, assignedWard:input.assignedWard}));
    setInput({name:"",age:"",medicalHistory:"",contact:"",assignedWard:""});
    setTimeout(()=>{
      dispatch(fetchPatients());
    },300);
  }

  useEffect(()=>
  {
    dispatch(fetchWards());
    
  },[dispatch])

  return (
    <div className={styles[`form-container`]}>
    <h2 className={styles.heading}>Add New Patient</h2>

    <input placeholder='Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
    <input type='Number' placeholder='Age' value={input.age} onChange={(e)=>changeHandler("age",e.target.value)}/>
    <select value={input.gender} onChange={(e)=>changeHandler("gender",e.target.value)} className={styles.select}>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
    <input placeholder='Medical History' value={input.medicalHistory} onChange={(e)=>changeHandler("medicalHistory",e.target.value)}/>
    <input placeholder='Contact' value={input.contact} onChange={(e)=>changeHandler("contact",e.target.value)}/>

    <select value={input.assignedWard} onChange={(e)=>changeHandler("assignedWard",e.target.value)} className={styles.select}>

      <option value={""}>Select Ward</option>
      {wards.map( ward => (
        <option key={ward._id} value={ward._id}>{ward.number} - {ward.specializations}</option>
      ))}
    </select>

    <button className={styles.button} disabled={isDisabled()} onClick={()=>clickHandler()}>Add Patient</button>

  </div>
  )
}
