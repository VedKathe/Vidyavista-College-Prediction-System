import React from 'react'

import LoginForm from '../components/loginForm/loginForm'
import styles from './student.module.css'
import Registration from '../components/register/register'


function page() {
  return (
    <div className={styles['main']}>
        <div className={styles['back']}>Student Login</div>
        <LoginForm/>
    </div>
  )
}

export default page