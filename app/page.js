import Image from 'next/image'
import styles from './page.module.css'
import Contact from './components/contactus'

export default function Home() {
  return (
    <main className={styles.main}>
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
      <Contact/>     
    </main>
  )
}
