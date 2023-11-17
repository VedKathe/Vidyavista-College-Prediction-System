import React from 'react'
import Navbar from '../../components/navbar2'
import styles from './search.module.css'

function Page() {
  return (
    <div id='search'>
      <Navbar/>
      
      <div className={styles['main']}>
        <div className={styles['back']}>search</div>
        
    </div>
      
      </div>
  )
}

export default Page