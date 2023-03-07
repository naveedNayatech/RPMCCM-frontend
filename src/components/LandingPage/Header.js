import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TDW_logo from '../../assets/Images/official_logo.png';
import { Image } from 'react-bootstrap';
import MetaData from '../../layouts/MetaData';

const Header = () => {

  const sendEmail = () => {
    window.open(`mailto:support@worpm.com`)
}

  return (
 <Fragment>
  {/****************** Top Bar  ************************/}
  <div id="topbar" className="d-flex align-items-center fixed-top">
    <div className="container d-flex justify-content-between">
      <div className="row-display contact-info d-flex align-items-center">
        <i className='bx bx-mail-send'></i> <Link to="/"  onClick={() => sendEmail()}>support@dummyweb.com</Link>
        <i className='bx bx-phone'></i> <Link to="/">  +844 598 889 448 </Link>
      </div>
    </div>
  </div>
  

  {/* Header  */}
  <MetaData title="WO RPM - Home"/>

  <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">
      <Image src={TDW_logo} className="landingPageHeaderLogo" alt="logo" />

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto" href="#about-us">Who we are</a></li>
          <li><a className="nav-link scrollto" href="#how_it_works">Solutions</a></li>
          <li><a className="nav-link scrollto" href="#rpm_devices">Advantages</a></li>       
          <li><a className="nav-link scrollto" href="#telemedicine">Contact</a></li>

          <li style={{float: 'right'}}><Link to="/login" className="nav-link">Login to your account</Link></li>
      
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>

   {/* End Header  */}

   {/* Home Section  */}
  <section id="home" className="d-flex align-items-center">
    <div className="container">
    <h1 className="text-white">We are Experts, <br /> of RPM & CCM</h1>
    <h2 className="text-white">We Provide the Best Monitoring Devices
        with <br /> the help of experienced and qualified
        medical <br/> staff right at your door steps
        "Your devotion <br/> and care bring healing, comfort and hope."</h2>
    </div>
  </section>
  {/*  End Home  */}
    
         
    </Fragment>
    )
}

export default Header;
