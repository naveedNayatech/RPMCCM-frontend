import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import moment from 'moment';
import { Link } from 'react-router-dom';
import patientProfileImg from "../../assets/Images/patientProfile.png";

const HR = () => {
  
const {user} = useSelector(state => state.auth);

  return <Fragment>
    <MetaData title="Profile" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                  <div className="home-content">
                    <div className="container">

                    <div className="row-display">
                      
                        <h5 className="pt-2 mt-2">My <span style={{color: '#8FBB2C'}}>Profile</span></h5> 

                        <div className="row-display">
                              <Link to="/Nurse/Dashboard">
                                  <button className="btn btn-primary mt-3">
                                      <i className='bx bx-arrow-back'></i>
                                  </button>
                              </Link>
                              &nbsp;&nbsp;
                              <Link to="/Nurse/Dashboard">
                                  <button className="btn btn-primary mt-3">
                                  <i className='bx bxs-home'></i>
                                  </button>
                              </Link>
                          </div> 
                    </div>  
                    <hr />

                    <div className="row">
                    <div className="col-md-4">
                        <div>
                            <img src={patientProfileImg} className="img-responsive profile-card-img"/>
                                
                            <p className="profile-name">HR. {user?.firstname} {user?.lastname} </p>
                            
                        </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div>
                          <div className="card-inner-margin">
                              <div className="row">
                              <div className="col-md-4">
                                  <span className="profile-label">Email: </span>
                                  <p className="profile-value-text" style={{wordWrap: 'break-word'}}>{user?.email}</p>

                                  <span className="profile-label">Gender: </span>
                                  <p className="profile-value-text">{user?.gender}</p>                            
                                  </div>


                                  <div className="col-md-4">
                                      <span className="profile-label">DOB : </span>
                                      <p className="profile-value-text">{moment(user.DOB).format("ll")}</p>

                                      <span className="profile-label">Phone 1: </span>
                                      <p className="profile-value-text">{user?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {user?.phone1} </span> : 'N/A'}</p>                                            
                                  </div>

                                  <div className="col-md-4">
                                      <span className="profile-label">Mobile No: </span>
                                      <p className="profile-value-text">{user?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {user?.mobileNo} </span> : 'N/A'}</p>

                                      <span className="profile-label">Created At: </span>
                                      <p className="profile-value-text">{moment(user?.createdAt).format("lll")}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
                </div>
            </div>

          </div>
        </section>
      </Fragment>;
};

export default HR;
