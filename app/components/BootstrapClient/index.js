"use client"
import React from 'react'
import { useEffect } from 'react'

export default function Index() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, [])
    
  return null
}
