'use client'
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 export default function Index(){
  const notify = () => toast("Wow so easy!");

  return (
    <div className='pt-5 mt-5'>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}