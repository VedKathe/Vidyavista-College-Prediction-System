"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

function Index() {

  //  const [pass, setPass] = React.useState("kathe");
  //   const [user, setUser] = React.useState("vedant");

  // const router = useRouter();

  // const [formData, setFormData] = React.useState({
  //   collageName: "",
  //   university: "",
  //   zipCode: "",
  //   phoneNo: "",
  //   CS: "",
  //   Civil: "",
  //   mech: "",
  //   ENTC: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       // Handle success (e.g., show a success message)
  //       console.log("Form submitted successfully");
  //     } else {
  //       // Handle errors (e.g., show an error message)
  //       console.error("Form submission failed");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };
  const depts =['Artificial Intelligence and Data Science','Civil Engineering','Computer Engineering','Chemical Engineering','Electrical Engineering','Electronics & Telecom Engineering','Information Technology','Mechanical Engineering']


  const initialFormData = {
    clg_code: "",
    name: "",
    dept: "",
    city: "",
    gopen: "",
    gscs: "",
    gsts: "",
    gvjs: "",
    gnt1s: "",
    gnt2s: "",
    gnt3s: "",
    gobcs: "",
    tfws: "",
    ews: "",
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
      const response = await fetch("/api/registerClg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        setFormData(initialFormData);
        toast.success("Registration Successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

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
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Collage Name</label>
              <input
                type="text"
                placeholder="Enter Collage..."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>Deparments</label>

              <select className={styles["select"]} name="dept" onChange={handleInputChange}>
                {depts.map((_,index)=>(
                  <option key={index} value={_}>{_}</option>
                ))}
                
              </select>
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Collage Code</label>
              <input
                type="number"
                placeholder="Enter Code..."
                name="clg_code"
                value={formData.clg_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>City</label>
              <input
                type="text"
                placeholder="Enter City..."
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>EWS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="ews"
                value={formData.ews}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>GOPEN</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gopen"
                value={formData.gopen}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>GSCS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gscs"
                value={formData.gscs}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>GSTS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gsts"
                value={formData.gsts}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>GVJS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gvjs"
                value={formData.gvjs}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>GNT1S</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gnt1s"
                value={formData.gnt1s}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>GNT2S</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gnt2s"
                value={formData.gnt2s}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles["column"]}></div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>GNT3S</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gnt3s"
                value={formData.gnt3s}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>GOBCS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="gobcs"
                value={formData.gobcs}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>TFWS</label>
              <input
                type="number"
                placeholder="Enter Rank..."
                name="tfws"
                value={formData.tfws}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles["column"]}></div>
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
      <ToastContainer />
    </div>
  );
}

export default Index;
