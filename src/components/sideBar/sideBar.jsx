import styles from "./sideBar.module.css";

import React from 'react'
import {Link} from "react-router-dom";


export const SideBar = () => {
  return (
    <nav className={styles.navbar}>
        <li className={styles.list}>
          <Link className={styles.link} to="/">Patients</Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/wards"> Wards</Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/hospital"> Hospital </Link>
        </li>
        <li className={styles.list}>
            <a className={styles.link} href="https://github.com/WadadParker/patient-management" target="_blank">Github</a>
        </li>
    </nav>
  )
}
