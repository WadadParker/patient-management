import styles from "./ward.module.css";

import React from 'react'

import { AddWard } from "../../features/wards/addWard/AddWard";

export const Ward = () => {
  return (
    <div>
      <h1>Wards</h1>
      <AddWard />
    </div>
  )
}
