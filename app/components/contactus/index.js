import React from 'react'
import './contact.module.css'

function index() {
  return (
    <section id="contact" className="contact section-padding">
        <div className="container  mb-5 ">
            
			<div className="row m-0 ">
				<div className="col-md-12 p-0 pt-4 pb-4">
					<form action="#" className="bg-light p-4 m-auto ">
						<div className="row">
							<div className="col-md-12">
								<div className="mb-3">
									<input className="form-control" placeholder="Full Name" required="" type="text"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="mb-3">
									<input className="form-control" placeholder="Email" required="" type="email"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="mb-3">
									<textarea className="form-control" placeholder="Message" required="" rows="3"></textarea>
								</div>
							</div><button className="btn btn-warning btn-lg btn-block mt-3" type="button">Send Now</button>
						</div>
					</form>
				</div>
			</div>
		</div>
      </section>
  )
}

export default index