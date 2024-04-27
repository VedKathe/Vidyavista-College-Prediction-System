"use client";

import React from "react";
import styles from "./passForm.module.css";
import bootstrap from "../../bootstrap.min.css";
import { handleClientScriptLoad } from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordChecklist from "react-password-checklist";

function Index({ ...props }) {
    const [pass, setPass] = React.useState("");
    const [passAgain, setPassAgain] = React.useState("");
    const [isValidPass, setValidPass] = React.useState(false);
    const {token} = props;

    const router = useRouter();
    const initialFormData = {
        password: "",
        token:token
    };
    const [formData, setFormData] = React.useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPass(value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isValidPass) {
                const response = await fetch("/api/auth/resetpass", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json.data);
                    // Handle success (e.g., show a success message)
                    if (json.data == true) {
                        setFormData(initialFormData);
                        toast.success("Password Reset Successfully", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });

                        router.push("/student");
                        
                    } else {
                        toast.error("Password Reset Failed", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                } else {
                    // Handle errors (e.g., show an error message)
                    console.error("Form submission failed");
                }
            } else {
                window.alert("Check passowrd ");
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
                <form onSubmit={handleSubmit} className={styles["form"]}>

                    <div className={styles["column"]}>
                        <div className={styles["input-box"]}>
                            <label>Password</label>
                            <input
                                type="text"
                                placeholder="Enter Password..."
                                name="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className={styles["input-box"]}>
                            <label>Conform Password</label>
                            <input
                                type="text"
                                placeholder="Enter Password..."
                                name="passwordAdmin"
                                value={passAgain}
                                onChange={(e) => {
                                    setPassAgain(e.target.value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    {(pass || passAgain) && (
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={pass}
                            valueAgain={passAgain}
                            onChange={(isValid) => {
                                setValidPass(isValid);
                            }}
                        />
                    )}





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
