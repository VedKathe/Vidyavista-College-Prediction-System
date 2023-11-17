import React from 'react'
import Contact from '../../components/contactus'
import styles from './feedback.module.css'
import Navbar from '../../components/navbar2'

function Page() {
 

  return (
	<div>
		<Navbar/>
    <div className={styles['feedback']}>
		<div className="row mt-5">
                <div className="col-md-12">
                    <div className="section-header text-center pt-5">
                        <h2>Feedback</h2>
                        
                    </div>
                </div>
            </div>
		<Contact/>
	</div>
	</div>
  )
}

export default Page