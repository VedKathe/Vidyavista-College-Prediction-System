"use client"
import React from 'react'
import Image from 'next/image'
import styles from './home.module.css'
import Contact from '../../components/contactus'
import Navbar from '../../components/navbar2'



export default function Home() {

  const [username, setUsername] = React.useState("")
  React.useEffect(() => {
    let value = localStorage.getItem("username")
    setUsername(value)
  }, [])
  
  return (
    <div>
    <Navbar/>
    <main className={styles.main}>
      <div className={styles.image}>
        Welcome Student
      </div>
      
       
    </main>
    </div>
  )
}
