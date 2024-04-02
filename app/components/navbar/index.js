"use client";
import React from "react";
import Link from "next/link";
import "./navbar.module.css";
import styles from "./navbar.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";

export default function Index({ ...props }) {
  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {
    // Perform localStorage action
    setcurrentUser(localStorage.getItem("username"));
  }, []);
  // const [isAdmin, setisAdmin] = useState(false);
  const { Nav } = props;
  useEffect(() => {
    // axios.get('/api/auth/getlogin').then((response) => {
    //     console.log(response.data);

    //   });
    setwhatNav(Nav);
  }, [Nav]);
  const [whatNav, setwhatNav] = useState("1");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-gradient fixed-top ">
      <div className="container">
        <a className="navbar-brand" href="#">
          <span className="text-warning">Vidya</span>vista
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {whatNav == "1" && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/student">
                  Student
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin">
                  Admin
                </Link>
              </li>
            </ul>
          )}

          {whatNav == "2" && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/student/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/student/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/student/feedback">
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <div className={styles["dropdown"]}>
                  <button className={styles["dropbtn"]}>{currentUser}</button>
                  <div className={styles["dropdown-content"]}>
                    <Link
                      className="nav-link"
                      href="/"
                      onClick={() => {
                        localStorage.clear("username");
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
                {/* <Link className="nav-link" href="/" onClick={()=>{localStorage.clear('username')}}>
                {currentUser}
              </Link> */}
              </li>
            </ul>
          )}

          {whatNav == "3" && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/admin/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/addCollege">
                  Add College
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/viewCollege">
                  View College
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/viewUser">
                  View Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/feedback">
                  View Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/contactus">
                  View Contact
                </Link>
              </li>
              <li className="nav-item">
              <div className={styles["dropdown"]}>
                  <button className={styles["dropbtn"]}>Admin</button>
                  <div className={styles["dropdown-content"]}>
                    <Link
                      className="nav-link"
                      href="/"
                      onClick={() => {
                        localStorage.clear("username");
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
