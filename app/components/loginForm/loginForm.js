
"use client";
import React from "react";
import styles from "./loginForm.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Index({...props}) {

 
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [admin, setadmin] = React.useState(false)
  const router = useRouter()
  const {isAdmin}= props
 

  useEffect(() => {
    if(isAdmin==1){
      setadmin(true)
    }

  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    // axios.post('/api/auth',{ user:user , pass:pass}).then((response) => {
    //     console.log(response.data);
    //     router.push('/')
    // //   });
    if(admin)
    {
      axios.post('/api/auth/getadmin',{ email:user , password:pass}).then((response) => {
        console.log(response.data);
        if (response.data==true){
          toast.success('Login Successfully', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              router.push('/admin/home')
            },
            }); 
                     
          
        }
        else{
          toast.error('Wrong Email or Password', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            
            });
        }
      });

     
    }
    else{
      axios.post('/api/auth/getlogin',{ email:user , password:pass}).then((response) => {
        console.log(response.data);
        if (response.data.found==true){
          
          toast.success('Login Successfully', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              router.push('/student/home')
            },
            }); 
                  
        }
        else{
          
          toast.error('Wrong Email or Password', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            
            });
        
        }
      });
      //router.push('/student/home')
    }
  };
  
  return (
    <div className={styles["body"]} >
      <section className={styles["container"]} style={{background: 'hsla(0, 0%, 100%, 0.6)', backdropFilter: 'blur(30px)'}}>
        <form  onSubmit={handleSubmit}  className={styles["form"]}>
          <div className={styles["input-box"]}>
            <label>Email Address</label>
            
            <input type="text" placeholder="Enter email" required onChange={(e) => {
                setUser(e.currentTarget.value);
              }}/>
          </div>
          <div className={styles["input-box"]}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              required
              onChange={(e) => {
                setPass(e.currentTarget.value);
              }}
            />
          </div>

          {!isAdmin && <div className=" d-flex row  mt-4 justify-content-center">
            <div className="col d-flex justify-content-center">
              <a href="/student/register">Register</a>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>}
          <button className="btn-warning mt-4" >Login</button>
          
        </form>
      </section>
      <ToastContainer/>
    </div>
  );
}

export default Index;
