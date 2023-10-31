import styles from "./editWardModel.module.css";

import React, { useState } from 'react'


export const EditWardModal = ({item,setShowModal,editHandler}) => {
    const [input,setInput]=useState(item);

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        editHandler({_id:item._id,number:Number(input.number), capacity:Number(input.capacity), specializations:input.specializations});
        setShowModal({modal:false,item:{}});
    }

    const isDisabled = () => input.number<1 || input.capacity<1 || input.specializations===""

  return (
    <div className={styles[`background-container`]}>
        <main className={styles[`modal-container`]}>
            <h3>Edit Item Form</h3>
            <input type='Number' placeholder='Ward Number' value={input.number} onChange={(e)=>changeHandler("number",e.target.value)}/>
            <input type='Number' placeholder='Capacity' value={input.capacity} onChange={(e)=>changeHandler("capacity",e.target.value)}/>
            <input placeholder='Specializations' value={input.specializations} onChange={(e)=>changeHandler("specializations",e.target.value)}/>
            
            <section className={styles[`button-container`]}>
            <button className={styles.close} onClick={()=>setShowModal({modal:false,item:{}})}>Close</button>
            <button className={styles.update} disabled={isDisabled()} onClick={()=>clickHandler()}>Update Item</button>
            </section>
        </main>
    </div>
  )
}