"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import styles from "./register.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";

function index() {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    collageName: "",
    university: "",
    zipCode: "",
    phoneNo: "",
    CS: "",
    Civil: "",
    mech: "",
    ENTC: "",
  });

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
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
        <form action="#" className={styles["form"]}>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Name</label>
              <input type="text" placeholder="Enter Name..." required />
            </div>
            <div className={styles["input-box"]}>
              <label>Phone no</label>
              <input type="number" placeholder="Enter Number..." required />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Email</label>
              <input type="text" placeholder="Enter Email..." required />
            </div>
            <div className={styles["input-box"]}>
              <label>Address</label>
              <input type="text" placeholder="Enter Address..." required />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>DOB</label>
              <input type="date" placeholder="Enter Date..." required />
            </div>
            <div className={styles["input-box"]}>
              <label>Percent</label>
              <input type="text" placeholder="Enter Percent..." required />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles["input-box"]}>
              <label>Gender</label>
              <input type="text" placeholder="Enter Gender..." required />
            </div>
            <div className={styles["input-box"]}>
              <label>Password</label>
              <input type="text" placeholder="Enter Password..." required />
            </div>
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
          
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}

export default index;
