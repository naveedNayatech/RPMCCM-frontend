import React, {useState, useEffect} from 'react';
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import { Link, useHistory } from 'react-router-dom';
import { getDoctorCCMPatients, searchDoctorCCMPatient } from '../../actions/adminActions';
import { DropdownButton, Dropdown, Badge, Form, InputGroup } from 'react-bootstrap';
import moment from 'moment';


const StaffCCMPatients = () => {
 
    const {CcmPatients} = useSelector(state => state.doctorStats);
    const { user, isAuthenticated} = useSelector(state => state.auth);
    const { loading, doctorpatients } = useSelector(state => state.docPatients);

    const [keyword, setKeyword] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    
    let id = user._id;

    useEffect(() => {
        dispatch(getDoctorCCMPatients(id));
	}, [dispatch])

    const searchhandler = () => {
        dispatch(searchDoctorCCMPatient(id, searchBy, keyword));
    }

    return (
    <>
    <MetaData title="CCM Patients"/>
                <Sidebar />    

            <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : <>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                    <div className="home-content">
                        <div>
                            <div className="row-display">
                                <h5 className="title">CCM Patients 
                                    <p style={{color: '#8FBB2C'}}>
                                        <small> Total CCM patients are: {CcmPatients && CcmPatients < 10 ? '0'+CcmPatients : CcmPatients} </small> 
                                    </p>
                                </h5>

                                <div>
                                <div className="row">
                                    <div className="row-display">
                                    
                                        <select 
                                            className="form-control select-input-type" 
                                            value={searchBy}
                                            onChange={e => setSearchBy(e.target.value)}
                                            >
                                                <option value="undefined">Filter Patient </option>
                                                <option value="firstname">Firstname</option>
                                                <option value="lastname">Lastname</option>
                                                <option value="email">email</option>
                                                <option value="phone1">phone1</option>
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
                                                        style={{width: '200px'}}
                                                        value={keyword}
                                                        onChange={e => setKeyword(e.target.value) }
                                                    />
                                                    &nbsp;<button className="btn btn-outline-primary btn-sm" 
                                                        id="button-addon2" onClick={searchhandler}>
                                                        <i className='bx bx-search-alt'></i>
                                                    </button>
                                            </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />


                            {doctorpatients?.length > 0 ? <>
                                <div className="col-md-12">
                                    <>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                        <tr>  
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Consent Program</th>
                                            <th>Actions</th> 
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link className="link" to={{ pathname: "/doctor/patientprofile/ccm", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="success text-white">{patient?.gender}</Badge></p></td>
                                            
                                            
                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td style={{fontWeight: 'bold', color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Not Assigned</Badge></td>
                                            </>}
                                            
                                            <td>{patient?.patientType}</td>

                                            <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                    <Dropdown.Item>
                                                        <Link className="link" to={{ pathname: "/doctor/patientprofile/ccm", state: {patientid: patient?._id}}}>View Profile</Link>
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        
                                        </tbody>
                                        </table>    
                                    </>                      
                            </div>
                        </>  : <>

                        <div>   
                            <img src={folderImg} className="no-record-found-img"/>
                            <p className="doctor-specilizations">Not Found Any Patient...</p>         
                        </div>
                        </> }
                        </div>
                    </div>
                </div>
                </>
            }

            </section>
    </>
  )
}

export default StaffCCMPatients