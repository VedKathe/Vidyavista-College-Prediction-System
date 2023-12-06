"use client";

import React from "react";
import styles from "./register.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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


  const initialFormData = {
    name: "",
    address: "",
    zip_code: "",
    phone: "",
    comp: "",
    it: "",
    civil: "",
    mech: "",
    entc: "",
    chemical: "",
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
        toast.success('Registration Successfully', {
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
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter Address..."
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Zip Code</label>
              <input
                type="number"
                placeholder="Enter Zip..."
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>Phone No</label>
              <input
                type="number"
                placeholder="Enter Number..."
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Computer Engineering</label>
              <input
                type="number"
                placeholder="Enter Percent..."
                name="comp"
                value={formData.comp}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>Mechanical Engineering</label>
              <input
                type="number"
                placeholder="Enter Percent..."
                name="mech"
                value={formData.mech}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Electrical and Electronic Engineering</label>
              <input
                type="number"
                placeholder="Enter Date..."
                name="entc"
                value={formData.entc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>Chemical Engineering</label>
              <input
                type="number"
                placeholder="Enter Percent..."
                name="chemical"
                value={formData.chemical}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Civil Engineering</label>
              <input
                type="number"
                placeholder="Enter Percent..."
                name="civil"
                value={formData.civil}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <label>Infomation Technology</label>
              <input
                type="number"
                placeholder="Enter Percent..."
                name="it"
                value={formData.it}
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
      <ToastContainer/>
    </div>
  );
}

export default Index;
