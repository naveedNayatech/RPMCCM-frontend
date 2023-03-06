import React, { Fragment } from 'react'
import TelemedicineImg from '../../assets/Images/telemedicine.png';

const Telemedicine = () => {
    return (
        <Fragment>
        {/* Telemedicine Section  */}
        <div className="telemedicine-section" id="telemedicine">
          <div className="container">
              <h2 className="telemedicine-heading"><br />TELE-MEDICINE</h2>
              <h4 className="telemedine-subheading">Now Consultations made more convenient</h4>
              <div className="row">
                <div className="col-md-7">
                  <p>Need help with health management or looking to consult a health professional? No need for in-person consultations. HelathEz offers Telemedicine for your convenience. Health professionals are even more accessible with remote consultation. You may reach us anywhere and anytime without a hassle. Let our medical professionals evaluate, treat, and offer expert advice to chronic health concerns and other ailments at a distance through phone calls or video conferencing.</p>
                </div>

                <div className="col-md-4">
                    <img src={TelemedicineImg} className="telemedine-img" alt="" />
                </div>
              </div>
          </div>
        </div>
         {/* Telemedicine Section Ends Here  */}

        </Fragment>
    )
}

export default Telemedicine
