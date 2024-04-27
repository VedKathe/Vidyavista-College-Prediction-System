'use client'
import React from 'react'
import { useEffect } from 'react'
import LoginForm from '../components/loginForm'
import styles from './admin.module.css'
import Navbar from '../components/navbar'

function page() {

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
    console.log("Admin");
},[]);

  return (
    <div className={styles['main']}>
      <Navbar Nav="1" />
     <div className={styles['back']}>Admin Login</div>
      <LoginForm isAdmin='1'/>
    </div>
  )
}

export default page