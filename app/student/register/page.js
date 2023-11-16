import React from 'react'


import styles from './register.module.css'
import Registration from '../../components/register/register'

function page() {
  return (
    <div className={styles['main']}>
        <div className={styles['back']}>Student Registration</div>
        <Registration/>
    </div>
  )
}

export default page