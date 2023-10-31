import styles from "./wardList.module.css";

import React, {useEffect} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { fetchWards } from "../wardsSlice";

import { useDispatch, useSelector } from "react-redux";

export const WardList = () => 
{
    const wards = useSelector(state=>state.wards.wards);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchWards());
    },[dispatch])

  return (
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
                    <td className={styles[`table-data`]}>{item.number}</td>
                    <td className={styles[`table-data`]}> {item.specializations}</td>
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
