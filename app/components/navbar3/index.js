'use client'

import React from "react";
import Link from "next/link";
import './navbar.module.css'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Index() {
    // const [isAdmin, setisAdmin] = useState(false);

    // useEffect(() => {
    //     axios.get('/api/auth/getlogin').then((response) => {
    //         console.log(response.data);
            
    //       });
    // }, [])
    

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
              <Link className="nav-link" href="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
