import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from "./addWard.module.css"

import { addNewWard } from '../wardsSlice'

export const AddWard = () => 
{
  const [input,setInput] = useState({number:"",capacity:"",specializations:""})

  const dispatch = useDispatch();

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev, [inputField]:text}));
  }

  const isDisabled = () => input.number<1 || input.capacity<1 || input.specializations===""

  const clickHandler =()=>
  {
    dispatch(addNewWard({number:Number(input.number), capacity:Number(input.capacity), specializations:input.specializations}));
    setInput({number:"",capacity:"",specializations:""});
  }


  return (
    <div className={styles[`form-container`]}>
      <h2 className={styles.heading}>Add New Ward</h2>

      <input type='Number' placeholder='Ward Number' value={input.number} onChange={(e)=>changeHandler("number",e.target.value)}/>
      <input type='Number' placeholder='Capacity' value={input.capacity} onChange={(e)=>changeHandler("capacity",e.target.value)}/>
      <input placeholder='Specializations' value={input.specializations} onChange={(e)=>changeHandler("specializations",e.target.value)}/>

      <button className={styles.button} disabled={isDisabled()} onClick={()=>clickHandler()}>Add Ward</button>

    </div>
  )
}
