import React, { Fragment } from 'react'
import WebAnalyticsImg from '../../assets/Images/web-analytics.png';
import BloodPressureGaugeImg from '../../assets/Images/blood-pressure-gauge.png';
import GlucometerImg from '../../assets/Images/glucometer.png';
import OximeterImg from '../../assets/Images/oximeter.png';

const RPMDevices = () => {
    return (
        <Fragment>
     {/************************* RPM Devices  *********************************/}
     <section id="rpm_devices">
      <div>
      <section id="how_it_works" className="how-it-works-bg mt-4">
        <div className="container">
          <div className='row'>
            <div className="col-md-5">

            </div>

            <div className="col-md-7">
              <h2>Services Offered</h2>

              <div>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; Telehealth (Integrating access services to EMR’s, SaaS and Devices).</span>

                <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; RPM (Remote Patient Monitoring using FDA approved digital devices to capture targeted vital signs).</span>

                <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; CCM (Chronic Care Management for patients with two or more chronic conditions coordinating care for their specialist or PCP’s).</span>

                <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; PCM (Principal Care Management for disease specific focused care management by a specialist
                   to coordinate and rehabilitate back to the PCP).</span>


               <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; Establishing and maintaining care plan.</span>

               <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; Onboarding patients​. Including delivery of devices.</span>

                <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; Managing patents records (CMS compliant documentation).</span>

                <br/><br/>
                <i className="bx bx-circle pt-1"></i>
                <span> &nbsp;&nbsp; Create a billing reconciliation report.</span>   
              </div>

            </div>
          </div>
        </div>
      </section>
      </div>
    </section>
     {/************************** RPM Devices Ends Here  *******************************/}
        </Fragment>
    )
}

export default RPMDevices
