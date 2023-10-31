import styles from "./ward.module.css";

import React from 'react'

import { AddWard } from "../../features/wards/addWard/AddWard";
import { WardList } from "../../features/wards/wardList/WardList";

export const Ward = () => {
  return (
    <div>
      <h1>Wards</h1>
      <section className={styles.container}>
        <AddWard />
        <WardList />
      </section>
    </div>
  )
}
