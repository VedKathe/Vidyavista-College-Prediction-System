import React from 'react'
import styles from './add.module.css'
import Registration from '../../components/register2'
import Navbar from '../../components/navbar'
function page() {
  return (
    <>
    <Navbar Nav="3"/>
    <div className={styles['main']}>
        <div className={styles['back']}>College Registration</div>
        <Registration/>
    </div>
    </>
  )
}

export default page