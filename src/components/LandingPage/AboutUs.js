import React, { Fragment } from 'react'
import telemedicineImg from '../../assets/Images/3720926.jpg';

const AboutUs = () => {
    return (
        <Fragment>
             <section className="container" id="about-us" style={{marginTop: '100px'}}> 
                <div className="row-display">

                    <div className="m-5">
                        <img src={telemedicineImg} height="100%" width="100%" />
                    </div>

                    <div className="ml-5">
                        <h2>Who we are</h2>
                        <p style={{textAlign: 'justify'}}>
                            We are a team of Physicians, Nurses, Physical Therapist and Pharmacist, plus Technical and 
                            Administrative experts that can provide enhanced clinical monitoring services using advanced 
                            APP technology plus basics services (phone, email, mail, etc..) to improve outcomes. We can 
                            increase engagement and access which improves patient experience and ensures follow through. 
                            Our staff has implemented clinical case management programs for all the major health plans 
                            over the last 30 years.
                        </p>

                        <p>
                            We are not a technology owned company and being agnostic, this allows us to select the
                            best advanced monitoring devices and SaaS platforms to meet our client’s needs.
                        </p>
                    </div>    
                </div>     
            </section>
        </Fragment>
    )
}

export default AboutUs
