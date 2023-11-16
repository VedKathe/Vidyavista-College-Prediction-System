"use client";
import React from "react";
import styles from "./loginForm.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";

function index() {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    axios.post('/api/auth',{ user:user , pass:pass}).then((response) => {
        console.log(response.data);
        router.push('/')
      });
  };
  return (
    <div className={styles["body"]} >
      <section className={styles["container"]} style={{background: 'hsla(0, 0%, 100%, 0.6)', backdropFilter: 'blur(30px)'}}>
        <form action="/" onSubmit={handleSubmit} className={styles["form"]}>
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

          <div className=" d-flex row mb-4 mt-5 justify-content-center">
            <div className="col d-flex justify-content-center">
                <a href="/student/register">Register</a>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          <button className="btn-warning">Login</button>
        </form>
      </section>
    </div>
  );
}

export default index;
