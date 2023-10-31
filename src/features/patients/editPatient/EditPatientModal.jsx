import styles from "./editPatientModal.module.css";

import React, { useState, useEffect } from 'react'

import { useSelector,useDispatch } from "react-redux";

import { fetchWards } from "../../wards/wardsSlice";


export const EditPatientModal = ({item,setShowModal,editHandler}) => {
    const [input,setInput]=useState({...item, assignedWard:item.assignedWard._id});

    const wards = useSelector(state=>state.wards.wards);
    const dispatch = useDispatch();

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        editHandler({id:item._id,name:input.name, age:Number(input.age), medicalHistory:input.medicalHistory, contact:input.contact, assignedWard:input.assignedWard});
        setShowModal({modal:false,item:{}});
    }

    const isDisabled = () => input.name==="" || input.age<1 || input.medicalHistory==="" || input.contact==="" || input.assignedWard===""

    useEffect(()=>
    {
        dispatch(fetchWards());
    },[dispatch])

  return (
    <div className={styles[`background-container`]}>
        <main className={styles[`modal-container`]}>
            <h3>Edit Item Form</h3>
            <input placeholder='Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
            <input type='Number' placeholder='Age' value={input.age} onChange={(e)=>changeHandler("age",e.target.value)}/>
            <input placeholder='Medical History' value={input.medicalHistory} onChange={(e)=>changeHandler("medicalHistory",e.target.value)}/>
            <input placeholder='Contact' value={input.contact} onChange={(e)=>changeHandler("contact",e.target.value)}/>

            <select value={input.assignedWard} onChange={(e)=>changeHandler("assignedWard",e.target.value)} className={styles.select}>

            <option value={""}>Select Ward</option>
            {wards.map( ward => (
                <option key={ward._id} value={ward._id}>{ward.number} - {ward.specializations}</option>
            ))}
            </select>
            
            <section className={styles[`button-container`]}>
            <button className={styles.close} onClick={()=>setShowModal({modal:false,item:{}})}>Close</button>
            <button className={styles.update} disabled={isDisabled()} onClick={()=>clickHandler()}>Update Item</button>
            </section>
        </main>
    </div>
  )
}