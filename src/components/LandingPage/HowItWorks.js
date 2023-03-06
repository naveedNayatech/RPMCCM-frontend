import React, { Fragment } from 'react'
import MedicalReportImg from '../../assets/Images/medical-report.png'
import PatientImg from '../../assets/Images/patient.png';
import MonitorImg from '../../assets/Images/monitor.png';
import MedicalBookImg from '../../assets/Images/medical-book.png';
import HowItWorksImg from '../../assets/Images/how-it-works.png';

const HowItWorks = () => {
    return (
    <Fragment>
    {/* Services Section */}
    <br/>
    <section id="how_it_works" className="services section-bg mt-4">
      <div className="container">
        <br /><br />
        <div>
          <h2> Advantages for choosing us</h2>
        </div>

        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <p style={{textAlign: 'justify'}}>
              We are a team of Physicians, Nurses, Physical Therapist and Pharmacist, plus Technical and Administrative
              experts that can provide enhanced clinical monitoring services using advanced APP technology plus basics 
              services (phone, email, mail, etc..) to improve outcomes. We can increase engagement and access which 
              improves patient experience and ensures follow through. Our staff has implemented clinical case management
              programs for all the major health plans over the last 30 years.
            </p>

            <p style={{textAlign: 'justify'}}>
              We are not a technology owned company and being agnostic, this allows us to select the best advanced monitoring
              devices and SaaS platforms to meet our client’s needs.
            </p>

            <p style={{textAlign: 'justify'}}>
              We are a clinical centric service using technology to improve quality and access to care.  
              We are not a technology company.  Being agnostic allows us to select the best devices and software
              to meet our client’s needs.  
            </p>

            <p style={{textAlign: 'justify'}}>
              We are not a technology owned company and being agnostic, this allows us to select the best advanced monitoring
              devices and SaaS platforms to meet our client’s needs.
            </p>
          </div>
        </div>
        </div>

    </section>
    </Fragment>
    )
}

export default HowItWorks;
