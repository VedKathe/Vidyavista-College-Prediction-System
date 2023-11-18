
"use client";
import React from "react";
import styles from "./loginForm.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    //   });
    if(admin)
    {
      axios.post('/api/auth/getadmin',{ email:user , password:pass}).then((response) => {
        console.log(response.data);
        if (response.data==true){
          router.push('/admin/home')
        }
        else{
          alert("Wrong user")
        }
      });

     
    }
    else{
      axios.post('/api/auth/getlogin',{ email:user , password:pass}).then((response) => {
        console.log(response.data);
        if (response.data==true){
          router.push('/student/home')
        }
        else{
          alert("Wrong user")
        }
      });
      //router.push('/student/home')
    }
  };
  return (
    <div className={styles["body"]} >
      <section className={styles["container"]} style={{background: 'hsla(0, 0%, 100%, 0.6)', backdropFilter: 'blur(30px)'}}>
        <form action="/" onSubmit={handleSubmit}  className={styles["form"]}>
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

          {!isAdmin && <div className=" d-flex row  mt-5 justify-content-center">
            <div className="col d-flex justify-content-center">
              <a href="/student/register">Register</a>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>}
          <button className="btn-warning mt-5">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Index;
