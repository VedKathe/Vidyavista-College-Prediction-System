"use client";
import React from "react";
import styles from "./loginForm.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {signIn} from 'next-auth/react'
import Modal from 'react-modal'
import { AiOutlineCloseCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

function Index({ ...props }) {
  const [user, setUser] = React.useState("");
  const [userE, setUserE] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [admin, setadmin] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter();
  const { isAdmin } = props;

  const customStyles = {
    overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       marginRight: '-50%',
       transform: 'translate(-50%, -50%)'
    }
 }

  useEffect(() => {
    if (isAdmin == 1) {
      setadmin(true);
    }
  }, [isAdmin]);

  const  handleSubmit = async (e) => {
    e.preventDefault();
    if (admin) {
      axios
        .post("/api/auth/getadmin", { email: user, password: pass })
        .then((response) => {
          console.log(response.data);
          if (response.data == true) {
            toast.success("Login Successfully", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              onClose: () => {
                router.push("/admin/home");
              },
            });
          } else {
            toast.error("Wrong Email or Password", {
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
    } else {

      axios
        .post("/api/auth/getlogin", { email: user, password: pass })
        .then((response) => {
          console.log(response.data);
          if (response.data.found == true) {
            
            localStorage.setItem('username',response.data.data.name)
            toast.success("Login Successfully", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              // onClose: () => {
              //   router.push("/student/home");
              // },
            });
            
            router.push('/student/home')
          } else {
            toast.error("Wrong Email or Password", {
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
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

      axios
        .post("/api/sendMail", { email: userE })
        .then((response) => {
          console.log(response.data);
          if (response.data.data == true) {
            toast.success("Login Successfully", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
             
            });
          } else {
            toast.error("Wrong Email or Password", {
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
    
  };

  return (
    <div className={styles["body"]}>
      <section
        className={styles["container"]}
        style={{
          background: "hsla(0, 0%, 100%, 0.6)",
          backdropFilter: "blur(30px)",
        }}
      >
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <div className={styles["input-box"]}>
            <label>Email Address</label>

            <input
              type="text"
              placeholder="Enter email"
              required
              onChange={(e) => {
                setUser(e.currentTarget.value);
              }}
            />
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

          {!isAdmin && (
            <div className=" d-flex row  mt-4 justify-content-center">
              <div className="col d-flex justify-content-center">
                <a href="/student/register">Register</a>
              </div>

              <div className="col">
                <a  onClick={() => setIsOpen(true)}>Forgot password?</a>
              </div>
            </div>
          )}
          <button className="btn-warning mt-4">Login</button>
        </form>
      </section>
      <ToastContainer />
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
      <div className="d-flex justify-content-end">
        <button className="btn p-1"  onClick={() => setIsOpen(false)}><AiOutlineCloseCircle size={28}/>  </button>
      </div>
      <form onSubmit={handleSubmitEmail} className={styles["form"]}>
      <div className={styles["input-box"]}>

            <label>Enter Your Email Address</label>

            <input
              type="text"
              placeholder="Enter email"
              required
              onChange={(e) => {
                setUserE(e.currentTarget.value);
              }}
            />
            </div>
            <div className="px-4 mt-2">
            <button className="my-4 btn-warning  ">Send Email</button>
            </div>
        </form>
      </Modal>
    </div>
  );
}

export default Index;
