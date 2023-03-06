import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TDW_logo from '../../assets/Images/official_logo.png';


const Footer = () => {
    return (
    <Fragment>
        {/* Footer Section */}
        <footer id="footer">
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="footer-info">
                    <img src={TDW_logo} className="landingPageHeaderLogo" alt="logo" />
                    <p>
                        11140 Rockville Pike<br />
                        Unit 100<br />
                        North Bethesda, MD 20852<br/>
                        United States
                        <br /><br />
                        <h5>Phone :</h5> ( 844 ) 614-3297<br /><br />
                        <h5>Email :</h5> support@dummyweb.com<br />
                    </p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#about-us">Who we are</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#how_it_works">Soultions ?</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#rpm_devices">Advantages</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#telemedicine">Contact</a></li>
                    </ul>
                </div> 

                <div className="col-lg-4 col-md-6 footer-newsletter">
                    <h4>Our Newsletter</h4>
                    <p>Please subscribe to our news letter</p>
                    <form action="" method="post">
                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                    </form>
                </div>

                </div>
              </div>
            </div>
        </footer>
        {/* End Footer Section */}
        </Fragment>
    )
}

export default Footer;
