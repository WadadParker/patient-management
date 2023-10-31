import styles from "./patientList.module.css";

import React, {useEffect,useState} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, updatePatient } from "../patientsSlice";
import { EditPatientModal } from "../editPatient/EditPatientModal";

export const PatientList = () => 
{
    const patients = useSelector(state=>state.patients.patients);
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState({ modal: false, item: {} })

    const editHandler=(newPatient)=>
    {
        dispatch(updatePatient(newPatient));
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
                    <td className={styles[`table-data`]}>{item.name}</td>
                    <td className={styles[`table-data`]}>{item.assignedWard.number} - {item.assignedWard.specializations}</td>
                    <td className={`${styles[`icon-container`]} ${styles[`table-data`]}`}>
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.edit} onClick={() => setShowModal({ modal: true, item })}/>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete} />
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </>
  )
}
