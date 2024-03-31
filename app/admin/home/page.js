import Image from 'next/image'
import styles from './home.module.css'
import Contact from '../../components/contactus'
import Navbar from '../../components/navbar'


export default function Home() {
  return (
    <div>
    <Navbar Nav="3"/>
    <div className={styles.main}>
      <div className={styles.image}>
        Welcome Admin
      </div>    
    </div>
    </div>
  )
}
