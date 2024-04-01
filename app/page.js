
"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Contact from './components/contactus'
import Navbar from './components/navbar'
import { useEffect } from 'react'
import { getServerSession } from 'next-auth'
import { ToastContainer, toast } from "react-toastify";
export default function Home() {

  const handleToast = () =>{
    toast.success("Message Sent", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <main className={styles.main}>
      <Navbar Nav="1" />
      <div className={styles.image}>
        Unlock Your Future
      </div>
      <div className="row mt-5">
                <div className="col-md-12">
                    <div className="section-header text-center pt-4">
                        <h2>Contact Us</h2>
                    </div>
                </div>
      </div>
      <Contact handleToast ={handleToast}/>    
      <ToastContainer/> 
    </main>
  )
}
