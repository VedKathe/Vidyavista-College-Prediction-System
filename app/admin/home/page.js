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
    </div>
  )
}
