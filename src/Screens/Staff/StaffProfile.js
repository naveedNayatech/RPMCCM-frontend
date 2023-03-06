import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector } from 'react-redux';
import moment from 'moment';
import doctorProfileImg from '../../assets/Images/patientProfile.png';

const StaffProfile = ({ history }) => {


    const { loading, isAuthenticated, user} = useSelector(state => state.auth);
    
    useEffect(() => {
		
		if(isAuthenticated === false) {
			history.push("/doctor/login");
		}

	}, [isAuthenticated])

    return (
        <Fragment>
            <MetaData title="Doctors Profile"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                
                    {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                        <div className="container">
                         <div className="row">
                             <div className="col-md-12">
                                <h5 className="pt-2 mt-2">My <span style={{color: '#F95800'}}>Profile</span> </h5> 
                             </div>
                         </div>   

                         <hr/>
                        

                        {user && <Fragment>
                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={doctorProfileImg} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">Dr. {user?.firstname} {user?.lastname} </p>
                                    
                                    
                                    {user.specialization && user?.specialization.map((spec, index) => (
                                        
                                            <div key={index}>
                                                <p className="doctor-specilizations">{spec?.fieldname }</p>
                                                <br />
                                            </div>
                        
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                            <div className="col-md-6">
                                            <span className="profile-label">Email: </span>
                                                <p className="profile-value-text">{user?.email}</p>

                                                <span className="profile-label">Gender: </span>
                                                <p className="profile-value-text">{user?.gender}</p>

                                                <span className="profile-label">Contact #: </span>
                                                <p className="profile-value-text">{user?.contactno ? user?.contactno : 'N/A'}</p>

                                                <span className="profile-label">Phone # 1: </span>
                                                <p className="profile-value-text">{user?.phone1 !== '' ? user?.phone1 : 'N/A'}</p>
                                            </div>


                                            <div className="col-md-6">
                                            <span className="profile-label">Phone # 2: </span>
                                                <p className="profile-value-text"> {user?.phone2 !== '' ? user?.phone2 : 'N/A'} </p>

                                                <span className="profile-label">License #: </span>
                                                <p className="profile-value-text">{user?.npinumber}</p>

                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{user?.licensenumber}</p>

                                                <span className="profile-label">Account Created Date: </span>
                                                <p className="profile-value-text">{moment(user?.createdAt).format("lll")}</p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                        </Fragment>}
                        
                        </div>
                    </div>
                    </div>
                    </Fragment>
                    }
            </section>
        </Fragment>
    )
}

export default StaffProfile
