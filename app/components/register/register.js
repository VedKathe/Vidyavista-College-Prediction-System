"use client";

import React from "react";
import styles from "./register.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";

function Index() {
  //  const [pass, setPass] = React.useState("kathe");
  //   const [user, setUser] = React.useState("vedant");

   const router = useRouter();

  const initialFormData = {
    name: "",
    email: "",
    gender: "male",
    phone: "",
    address: "",
    dob: "",
    percent: '',
    password: "",
  };
  const [formData, setFormData] = React.useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        setFormData(initialFormData);

        alert('Form Submitted')
        router.push('/student')
        console.log("Form submitted successfully");
      } else {
        // Handle errors (e.g., show an error message)
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        <form action="#" onSubmit={handleSubmit} className={styles["form"]}>
        <div className={styles["input-box"]}>
              <label>Email</label>
              <input type="text" placeholder="Enter Email..." name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className={styles["input-box"]}>
              <label>Password</label>
              <input type="text" placeholder="Enter Password..." name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Name</label>
              <input type="text" placeholder="Enter Name..." name="name" value={formData.name}  onChange={handleInputChange} required />
            </div>
            <div className={styles["input-box"]}>
            <label>Gender</label>
            <div className={styles["select-box"]}>

              <select name="gender" onChange={handleInputChange} value={formData.gender}>
                
                <option value='male'>Male</option>
                <option value='female' >Female</option>
                <option value='Other'>Prefer not to say</option>
                
              </select>
            </div>
            </div>
          </div>
          
          <div className={styles["column"]}>
          <div className={styles["input-box"]}>
              <label>Phone no</label>
              <input type="number" placeholder="Enter Number..." name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className={styles["input-box"]}>
              <label>Address</label>
              <input type="text" placeholder="Enter Address..." name="address" value={formData.address} onChange={handleInputChange} required />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>DOB</label>
              <input type="date" placeholder="Enter Date..." name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <div className={styles["input-box"]}>
              <label>Percent</label>
              <input type="number" placeholder="Enter Percent..." name="percent" value={formData.percent} onChange={handleInputChange} required />
            </div>
          </div>
          <div className={styles["column"]}>
            
            
          </div>
          {/* <div className={`${styles["input-box"]} ${styles["address"]}`}>
            <label>Deparments</label>

            <div className={styles["column"]}>
              <div className={styles["input-box"]}>
                <label>Computer</label>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className={styles["input-box"]}>
                <label>Infomation Technology</label>
                <input type="number" placeholder="Enter birth date" required />
              </div>
            </div>
            <div className={styles["column"]}>
              <div className={styles["input-box"]}>
                <label>Mechanical</label>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className={styles["input-box"]}>
                <label>Civil</label>
                <input type="number" placeholder="Enter birth date" required />
              </div>
            </div>
          </div> */}
          
          <button className="btn-warning">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Index;
