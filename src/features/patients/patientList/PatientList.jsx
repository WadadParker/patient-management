import styles from "./patientList.module.css";

import React, {useEffect} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../patientsSlice";

export const PatientList = () => 
{
    const patients = useSelector(state=>state.patients.patients);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchPatients());
    },[dispatch])


  return (
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
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.edit}/>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete} />
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
  )
}
