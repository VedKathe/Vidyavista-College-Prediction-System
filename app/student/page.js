"use client"
import React from 'react'

import LoginForm from '../components/loginForm'
import styles from './student.module.css'
import Registration from '../components/register/register'
import Navbar from '../components/navbar'

function page() {


  return (
    <div className={styles['main']}>
      
      <Navbar Nav="1"/>
        <div className={styles['back']}>Student Login</div>
        <LoginForm/>
    </div>
  )
}

export default page