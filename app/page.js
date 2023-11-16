import Image from 'next/image'
import styles from './page.module.css'
import Contact from './components/contactus'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.image}>
        Unlock Your Future
      </div>
      <Contact/>     
    </main>
  )
}
