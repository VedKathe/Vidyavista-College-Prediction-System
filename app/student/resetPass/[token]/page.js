"use client"
import React from 'react'

import PassForm from '../../../components/passForm/passForm'
import styles from './resetPass.module.css'

import Navbar from '../../../components/navbar'

function Page({ params }) {


  return (
    <div className={styles['main']}>
      
      <Navbar Nav="1"/>
        <div className={styles['back']}>Student Login</div>
        <PassForm token = {params.token} />
    </div>
  )
}

export default Page