import React, { Fragment } from 'react';
// Landing Page components
import Header from "../components/LandingPage/Header";
import AboutUs from "../components/LandingPage/AboutUs";
import HowItWorks from "../components/LandingPage/HowItWorks";
import RPMDevices from "../components/LandingPage/RPMDevices";
import Telemedicine from '../components/LandingPage/Telemedicine';
import BookDemo from '../components/LandingPage/BookDemo';
import ContactUs from '../components/LandingPage/ContactUs';
import Footer from '../components/LandingPage/Footer';


const LandingPage = () => {
    return (
        <Fragment>
            <div className="landingpagebody">
                <Header />
                <HowItWorks />
                <AboutUs />
                <RPMDevices />
                {/* <Telemedicine /> */}
                {/* <BookDemo /> */}
                {/* <ContactUs /> */}
                <Footer />
            </div>
        </Fragment>
    )
}

export default LandingPage
