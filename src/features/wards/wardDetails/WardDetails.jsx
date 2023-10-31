import styles from "./wardDetails.module.css";

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchWards } from "../wardsSlice";

export const WardDetails = () => 
{
    const {wardId} = useParams();

    const dispatch = useDispatch();
    const wards = useSelector(state=>state.wards.wards);

    const foundWard = wards.find(({_id})=>_id === wardId);

    useEffect(()=>{ 
        dispatch(fetchWards());
    },[dispatch])


  return (
    <div className={styles[`form-container`]}>
    <h2 className={styles.heading}>Ward Details</h2>
    <p><b>Ward Number: </b>{foundWard?.number}</p>
    <p><b>Capacity: </b> {foundWard?.capacity} </p>
    <p><b>Specializations: </b> {foundWard?.specializations} </p>
</div>
  )
}
