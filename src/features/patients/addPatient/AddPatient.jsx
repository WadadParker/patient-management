import styles from "./addPatient.module.css";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { addNewPatient  } from "../patientsSlice"; 
import { fetchWards } from "../../wards/wardsSlice";

export const AddPatient = () => 
{
  const [input,setInput] = useState({name:"",age:"",medicalHistory:"",contact:"",assignedWard:""})

  const wards = useSelector(state=>state.wards.wards);
  const dispatch = useDispatch();

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev, [inputField]:text}));
  }

  const isDisabled = () => input.name==="" || input.age<1 || input.medicalHistory==="" || input.contact==="" || input.assignedWard

  const clickHandler =()=>
  {
    addNewPatient({name:input.name, age:Number(input.age), medicalHistory:input.medicalHistory, contact:input.contact, assignedWard:input.assignedWard});
    setInput({name:"",age:"",medicalHistory:"",contact:"",assignedWard:""});
  }

  useEffect(()=>
  {
    dispatch(fetchWards());
    
  },[dispatch])

  return (
    <div className={styles[`form-container`]}>
    <h2 className={styles.heading}>Add New Ward</h2>

    <input placeholder='Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
    <input type='Number' placeholder='Age' value={input.age} onChange={(e)=>changeHandler("age",e.target.value)}/>
    <input placeholder='Medical History' value={input.medicalHistory} onChange={(e)=>changeHandler("medicalHistory",e.target.value)}/>
    <input placeholder='Contact' value={input.contact} onChange={(e)=>changeHandler("contact",e.target.value)}/>

    <select value={input.assignedWard} onChange={(e)=>changeHandler("assignedWard",e.target.value)}>

      <option value={""}>Select Ward</option>
      {wards.map( ward => (
        <option key={ward._id}>{ward.number} - {ward.specializations}</option>
      ))}
    </select>

    <button className={styles.button} disabled={isDisabled()} onClick={()=>clickHandler()}>Add Patient</button>

  </div>
  )
}
