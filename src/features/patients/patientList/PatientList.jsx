import styles from "./patientList.module.css";

import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, updatePatient, deletePatient } from "../patientsSlice";
import { EditPatientModal } from "../editPatient/EditPatientModal";

export const PatientList = () => 
{
    const navigate=useNavigate();
    const patients = useSelector(state=>state.patients.patients);
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState({ modal: false, item: {} })

    const editHandler=(newPatient)=>
    {
        dispatch(updatePatient(newPatient));
        setTimeout(()=>{
            dispatch(fetchPatients());
        },300)
    }

    const deleteHandler=(patientId)=>
    {
        dispatch(deletePatient(patientId));
    }

    useEffect(()=>{
        dispatch(fetchPatients());
    },[dispatch])

  return (
    <>
    {showModal.modal &&  <EditPatientModal item={showModal.item} setShowModal={setShowModal} editHandler={editHandler}/>}
    <table className={styles.table}>
        <thead >
            <tr className={styles[`heading-row`]}>
                <th>Name</th>
                <th>Ward</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { patients.map(item=>(
                <tr key={item._id}>
                    <td className={`${styles[`table-data`]} ${styles.name}`} onClick={()=>navigate(`/patients/${item._id}`)}>{item.name}</td>
                    <td className={styles[`table-data`]}>{item?.assignedWard?.number ?item.assignedWard.number : "Ward deleted"} - {item?.assignedWard?.specializations}</td>
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
