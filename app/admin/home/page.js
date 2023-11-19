import Image from 'next/image'
import styles from './home.module.css'
import Contact from '../../components/contactus'
import Navbar from '../../components/navbar3'


export default function Home() {
  return (
    <div>
    <Navbar/>
    <main className={styles.main}>
      <div className={styles.image}>
        Welcome Admin
      </div>
      
          
    </main>
    </div>
  )
}
