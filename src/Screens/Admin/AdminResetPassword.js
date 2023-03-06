import React, {useEffect, useState} from 'react';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/AdminDashboard/TopBar';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, doctorProfile, getHrLists, getHrProfile } from '../../actions/adminActions';
import DoctorProfile from '../../components/AdminDashboard/DoctorProfile';
import HRProfile from '../../components/AdminDashboard/HRProfile';
import { Link } from 'react-router-dom';

const AdminResetPassword = () => {

  const dispatch = useDispatch();
  
  const [doctorId, setDoctorId] = useState('');
  const [hrId, setHRId] = useState('');

  const { loading, error, doctors} = useSelector(state => state.doctor);
  const { doctor } = useSelector(state => state.doctorProfile);
  const { hrs } = useSelector(state => state.hrslist);
  const { hrProfile } = useSelector(state => state.hrprofile);

  const [userType, setUserType] = useState('doctor');


  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getHrLists());

    if(doctorId){
        dispatch(doctorProfile(doctorId))
    }

    if(hrId){
      dispatch(getHrProfile(hrId))
    }
    
}, [dispatch, error, doctorId, hrId]);

  
  return (
    <>
        <MetaData title="Reset Password"/>
              <Sidebar />    

            <section className="home-section">
                {/* TopBar */}
              <TopBar />

              <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                  <div className="home-content">
                      <div className="row-display">
                      <h5 className="pt-2 mt-2">Reset <span style={{color: '#007673'}}>Password </span></h5>

                      <div className="row-display">
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                                <i className='bx bx-arrow-back'></i>
                            </button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                            <i className='bx bxs-home'></i>
                            </button>
                        </Link>
                    </div>   
                    </div>
                      <hr />
                  </div>

                  <div className="row justify-content-center">
                      <button 
                        className={`btn ${userType === 'doctor' ? 'submit-btn' : 'link'} m-3`}
                        onClick={() => setUserType('doctor')}
                        > 
                        <i className='bx bxs-user pr-2'></i>
                          Doctor 
                      </button>

                      <button 
                        className={`btn ${userType === 'hr' ? 'submit-btn' : 'link'} m-3`}
                        onClick={() => setUserType('hr')}> 
                        <i className='bx bxs-user pr-2'></i>
                         HR </button>
                  </div>

                  <br/><br/>

                  {userType === 'doctor' ? <>
                  <div className='row'>
                  <div className="col-md-4">
                      <select 
                      className="form-control"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}

                      >

                      <option>Select Doctor</option>
                      {doctors && doctors.map((doc, index) => (
                              <option value={doc?._id} key={index}> {doc?.firstname} {doc?.lastname} {doc?.npinumber} </option>
                          ))} 
                      </select>
                    </div>
                      {doctor && doctor?.firstname && <>
                        <div className="col-md-8">  
                        <DoctorProfile doctor={doctor} />
                      </div>
                      </>
                      }
                    </div>
                     </> : <>
                     {/* HRs List */}
                     <div className='row'>
                      <div className="col-md-4">
                      <select 
                      className="form-control"
                      value={hrId}
                      onChange={(e) => setHRId(e.target.value)}
                      >

                      <option>Select HR</option>
                      {hrs && hrs.map((hr, index) => (
                              <option value={hr?._id} key={index}> {hr?.firstname} {hr?.lastname} {hr?.npinumber} </option>
                          ))} 
                      </select>
                    </div>
                      
                    {hrProfile && hrProfile?.firstname && <>
                        <div className="col-md-8">  
                        <HRProfile hrprofile={hrProfile} />
                      </div>
                      </>
                      }

                    </div>
                     
                     </> }
                  
                  </div>


            </section>
    </>
  )
}

export default AdminResetPassword