import React, { Fragment } from 'react';
import GmailImg from '../../assets/Images/gmail.png';
import PlaceholderImg from '../../assets/Images/placeholder.png';
import PhoneCallImg from '../../assets/Images/phone-call.png';


const ContactUs = () => {
    return (
    <Fragment>
    {/* Contact Section */}
    <div className="container">
        <hr />
    </div>

    <section id="contact" className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Our Location</h2>
        </div>
      </div>

      {/*********************** Google map  ****************************/}
      <div className="mapouter"><div className="gmap_canvas">
        <iframe className="gmap_iframe" width="100%"  
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.9240252823324!2d-77.11241108511884!3d39.03985164614048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7cc225026e40f%3A0x5132732f9f0a464d!2sTHE%20BECO%20BUILDING%2C%2011140%20Rockville%20Pike%2C%20Rockville%2C%20MD%2020852%2C%20USA!5e0!3m2!1sen!2s!4v1671531977084!5m2!1sen!2s"></iframe><a href="https://www.fnfgo.com/">FNF Mods</a></div></div>
      
      <div className="container">
        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <img src={PlaceholderImg} alt="placeholder-img"/>
                <h4>Location:</h4>
                  <p>11140 Rockville Pike<br />
                  Unit 100<br />
                  North Bethesda, MD 20852<br/>
                  United States</p>
                
              </div>

              <div className="email">
                <img src={GmailImg} alt="gmail-icon"/>
                <h4>Email:</h4>
                <p>support@thedoctorsweb.com</p>
              </div>

              <div className="phone">
                <img src={PhoneCallImg} alt="phone-call-img"/>
                <h4>Call:</h4>
                <p>( 844 ) 614-3297</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form action="" role="form" className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
              <br /><br /><br />
            </form>
          </div>
        </div>
      </div>
     </section>
    </Fragment>
    )
}

export default ContactUs;
