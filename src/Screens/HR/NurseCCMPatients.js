import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { Link } from 'react-router-dom';
import { InputGroup, Table, Form, Badge, DropdownButton, Dropdown } from 'react-bootstrap';
import { getHRCCMPatients, searchNurseCCMPatients } from '../../actions/HRActions';
import { getHrProfile } from '../../actions/adminActions'; 
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useAlert } from 'react-alert';
import Loader from '../../layouts/Loader';
import notFound from '../../assets/Images/notFound.png';




const NurseCCMPatients = () => {
   const alert = useAlert(); 
   const dispatch = useDispatch(); 
   const [searchBy, setSearchBy] = useState('');
   const [keyword, setKeyword] = useState(''); 
   const [currentPage, setCurrentPage] = useState('1');
   const [resPerPage, setResPerPage] = useState('20');

   const { user} = useSelector(state => state.auth);
   const { loading, error, hrpatients} = useSelector(state => state.hrPatients);

   const { hrProfile } = useSelector(state => state.hrprofile);
   
   let id = user._id;
   let drId = hrProfile?.assigned_doctor_id?._id;
   
   
    useEffect(() => {
        if(error) {
            alert.error(error);
        }

        dispatch(getHRCCMPatients(drId, resPerPage, currentPage))
        dispatch(getHrProfile(id))

    }, [dispatch, error, drId]);

    

    const searchhandler = () => {
        dispatch(searchNurseCCMPatients(drId, searchBy, keyword));
    }  

    const refreshhandler =() => {
        dispatch(getHRCCMPatients(drId, resPerPage, currentPage))
    }

  return (
    <>
    <MetaData title="CCM Patients" />
          <HRSidebar />
          
          <section className="home-section">
              {/* TopBar */}  
              <HRTopBar />

              {loading ? <Loader /> : (  
              <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                        <div className="row-display">
                        <h5 style={{color: '#8FBB2C'}}>
                        <i className="fas fa-hospital-user" style={{color: '#3CAEA3', fontSize: '24px'}}></i>
                         <strong>&nbsp;&nbsp;CCM Patients </strong>
                        </h5>


                        <div className="row-display"> 
                                <Link to="/Nurse/Dashboard" className="btn btn-secondary btn-sm pt-2"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                &nbsp;&nbsp;
                                <Link to="/Nurse/Add_New_Patient" className="add-staff-btn">+ Add New Patient</Link> 
                        </div>
                        </div>

                        <hr />
                            <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row-display">
                                    
                                        <select 
                                            className="form-control select-input-type" 
                                            value={searchBy}
                                            onChange={e => setSearchBy(e.target.value)}
                                            >
                                                <option value="undefined">Search By</option>
                                                <option value="firstname">Firstname</option>
                                                <option value="lastname">Lastname</option>
                                                <option value="email">email</option>
                                                <option value="phone1">phone1</option>
                                                <option value="initialsetup">Initial Month</option>
                                                <option value="diseases">Diseases</option>
                                                <option value="insurancecompany">Ins. Company</option>
                                                <option value="address">Address</option>
                                                <option value="state">State</option>
                                                <option value="city">City</option>
                                                <option value="zipCode">Zip Code</option>
                                        </select>    
                                            &nbsp;
                                            <InputGroup>
                                                    <Form.Control
                                                        placeholder="Search here ..."
                                                        aria-label="Search here ..."
                                                        className="form-control"
                                                        value={keyword}
                                                        onChange={e => setKeyword(e.target.value) }
                                                    />
                                                    &nbsp;<button className="btn btn-outline-primary btn-sm pt-2" id="button-addon2" onClick={searchhandler}>
                                                        <i className='bx bx-search-alt'></i>
                                                    </button>
                                                    &nbsp;<button className="btn btn-outline-danger btn-sm pt-2 " id="button-addon2" onClick={refreshhandler}>
                                                        <i className='bx bx-refresh'></i>
                                                    </button>
                                            </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        {/* Patient List Card */}
                        <div className="col-md-12">
                        {hrpatients && hrpatients.length > 0 ? <Fragment>
                            <Table hover striped bordered>
                            <thead align="center">
                                <tr>
                                <th>EMRID</th>    
                                <th>Name</th>
                                <th>DOB </th>
                                <th>Acc Status</th>
                                <th>Physician</th>
                                <th>Consent Role</th>
                                <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                            
                            {hrpatients && hrpatients.length > 0 ? <Fragment> 
                                {hrpatients && hrpatients.filter(item => item?.block === false).map((patient, index) => (
                                <tr key={index}>
                                <td>{patient?.emrId || 'N/A'}</td>  
                                <td>
                                    <Link className="link" 
                                        to={{ pathname: "/Nurse/Patient/CCM/Profile", state: {patientid: patient?._id}}}>
                                         {patient?.lastname +', '+ patient?.firstname}
                                    </Link>
                                </td>
                                
                                <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                
                                <td style={{color: 'green'}}>
                                   Active
                                </td> 
                                    
                                {patient?.assigned_doctor_id ? <>
                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                </> : <>
                                <td>---</td>
                                </>}

                                <td>{patient?.patientType}</td>
                                
                                {/* Actions */}
                                <td>
                                <DropdownButton id="dropdown-basic-button" variant="link">
                                    <Dropdown.Item>
                                        <Link className="link" to={{ pathname: "/Nurse/Patient/CCM/Profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                    </Dropdown.Item>
                                </DropdownButton>
                                </td>
                            </tr>    
                            ))}
                            </Fragment> : <div>
                                <small className="not-found-text">Patients Not Found</small>
                            </div> }
                            
                            </tbody>
                            
                            </Table>
                            
                        </Fragment> : <>
                            <div className="text-center">
                                <img src={notFound} style={{width: '40px', height: '40px'}} alt="not found" />
                                    <p><small>No CCM Patient found of your assigned doctor.</small></p>
                            </div>
                        </>}                      
                        </div>
                    </div>
                </div>
            </div>
          )}
        </section>
    </>
  )
}

export default NurseCCMPatients