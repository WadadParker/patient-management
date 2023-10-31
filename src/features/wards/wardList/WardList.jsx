import styles from "./wardList.module.css";

import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { fetchWards,updateWard, deleteWard } from "../wardsSlice";
import { EditWardModal } from "../editWard/EditWardModal";

import { useDispatch, useSelector } from "react-redux";

export const WardList = () => 
{
    const navigate=useNavigate();
    const wards = useSelector(state=>state.wards.wards);
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState({ modal: false, item: {} })

    const editHandler=(newWard)=>
    {
        dispatch(updateWard(newWard))
    }

    const deleteHandler=(wardId)=>
    {
        dispatch(deleteWard(wardId));
    }

    useEffect(()=>{
        dispatch(fetchWards());
    },[dispatch])

  return (
    <>
    {showModal.modal &&  <EditWardModal item={showModal.item} setShowModal={setShowModal} editHandler={editHandler}/>}
    <table className={styles.table}>
        <thead >
            <tr className={styles[`heading-row`]}>
                <th>Number</th>
                <th>Specializations</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { wards.map(item=>(
                <tr key={item._id}>
                    <td className={`${styles[`table-data`]} ${styles.name}`} onClick={()=>navigate(`/wards/${item._id}`)}>{item.number}</td>
                    <td className={styles[`table-data`]}> {item.specializations}</td>
                    <td className={`${styles[`icon-container`]} ${styles[`table-data`]}`}>
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.edit} onClick={() => setShowModal({ modal: true, item })}/>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=>deleteHandler(item._id)}/>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </>
  )
}
