import React from 'react'


import styles from './register.module.css'
import Registration from '../../components/register/register'
import Navbar from '../../components/navbar'

function page() {
  return (
    <div className={styles['main']}>.
        <Navbar Nav="1"/>
        <div className={styles['back']}>Student Registration</div>
        <Registration/>
    </div>
  )
}

export default page