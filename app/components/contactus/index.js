'use client'
import React from 'react'
import './contact.module.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Index() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		feedback: '',		
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
		  const response = await fetch('/api/setFeedback', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		  }).then(()=>{
			
		  });
	
		  if (response.ok) {
			// Handle success (e.g., show a success message)
			console.log('Form submitted successfully');
			alert("Form submitted successfully")
		  } else {
			// Handle errors (e.g., show an error message)
			console.error('Form submission failed');
		  }
		} catch (error) {
		  console.error('Error submitting form:', error);
		}
	  };
  return (
    <section id="contact" className="contact section-padding">
        <div className="container  mb-5 ">
            
			<div className="row m-0 ">
				<div className="col-md-12 p-0 pt-4 pb-4">
					<form action="#" onSubmit={handleSubmit} className="bg-light p-4 m-auto ">
						<div className="row">
							<div className="col-md-12">
								<div className="mb-3">
									<input className="form-control" placeholder="Full Name" name='name' onChange={handleInputChange} required type="text"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="mb-3">
									<input className="form-control" placeholder="Email" name='email' onChange={handleInputChange} required type="email"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="mb-3">
									<textarea className="form-control" placeholder="Message" name='feedback' onChange={handleInputChange} required rows="3"></textarea>
								</div>
							</div><button className="btn btn-warning btn-lg btn-block mt-3" type="submit">Send Now</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
      </section>
  )
}

export default Index