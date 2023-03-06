import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import defaultImg from '../../assets/Images/defaultUser.png';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
import { removePatientsHR, removeDoctorFromHR } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import folderImg from '../../assets/Images/folder.png';
import {Badge, Table, Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';


const HRProfile = (props) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  let hrInfo = props?.location?.state?.hr;
  let doctor = props?.location?.state?.hr?.assigned_doctor_id;
  let id = hrInfo?._id;


  const [smShow, setSmShow] = useState(false); //small confirm modal.
  const [patientName, setPatientName] = useState(""); //patient name to show in modal.
  const [patientToRemove, setpatientToRemove] = useState(""); //set patient id to remove.
  const [hrId, setHrId] = useState(id); 
  const [doctorDetails, setDoctorDetails] = useState(doctor); 
  const [hrDetails, setHrDetails] = useState(hrInfo);
  const [sort, setSort] = useState(true);
  const [query, setQuery] = useState("");
  const keys = ["firstname", "lastname", "DOB", "email", "phone1"];

  const { hrpatients} = useSelector(state => state.hrPatients);
  const {error, message} = useSelector(state => state.common);

  useEffect(() => {
    if(message){
        alert.success(message);
    }

    if(error){
        alert.error(error)
    }


    dispatch(getHRPatients(hrId));

  },[dispatch, alert, error, message])


  const removePatient = () => {
    dispatch(removePatientsHR(patientToRemove));
    setSmShow(false);
    }

  const removeDoctor = () => {
    var confirmation = window.confirm(`Are you sure you want to remove doctor from ${hrDetails?.firstname} `);
    if(confirmation === true) {
        dispatch(removeDoctorFromHR(hrId, doctor._id));
        setDoctorDetails("");
        return;
    }  
  }

  const sendEmail = (email) => {
    window.open(`mailto:${email}`)
  }

  return <Fragment>
      <MetaData title="HR Profile"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
            <div className="home-content">

            <div className="row-display">
                    <div className="col-md-6">   
                        <h5 style={{color: '#02C39A', marginTop: '10px'}}>
                            <i className="bx bx-user"></i> <strong>&nbsp;Nurse Profile </strong>
                        </h5>
                    </div>
                    
                    <div className="row-display">
                            <Button className="btn btn-secondary" onClick={() => props.history.goBack()}><i className='bx bx-arrow-back' ></i></Button> &nbsp;
                            
                            <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-home'></i></Link> &nbsp;
                            
                            
                            <Link to={{ pathname: "/assignPatientToHr", state: {id: hrDetails}}} 
                                className="add-staff-btn">Assign patient
                            </Link>

                            &nbsp;
                            {hrDetails?.assigned_doctor_id ? ' ' : <>
                            <Link to={{ pathname: "/assignDrToHr", state: {id: hrDetails}}} 
                                className="add-staff-btn">Assign Doctor
                            </Link>
                        </>}
                    </div>                          
                </div>
                <hr />

                <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <img src={defaultImg} className="img-responsive profile-card-img"/>     
                                    <p className="profile-name"> {hrDetails?.lastname}, {hrDetails?.firstname} </p>
                                    
                                    <Link to="/hrProfile" 
                                        className="link text-center" 
                                        onClick={() => sendEmail(hrDetails?.email)}><p className="text-center">{hrDetails?.email}</p>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-6">

                                            <span className="profile-label">Account Status: </span>
                                            {hrDetails?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">
                                            {hrDetails?.gender === 'male' ? <td>
                                                <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                                </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                            </td>}
                                            </p>                            
                                            
                                            <span className="profile-label">Mobile No: </span>
                                                <p className="profile-value-text">{hrDetails?.mobileNo ? <span><i className='bx bx-phone'></i> {hrDetails?.mobileNo} </span> : '--'}</p>
                                            </div>


                                            <div className="col-md-6">
                                                <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(hrDetails?.DOB).format("MM/DD/YYYY")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{hrDetails?.phone1 ? <span><i className='bx bx-phone'></i> {hrDetails?.phone1} </span> : '--'}</p>                                            
                                                
                                                <p className="profile-label">Account Created At: </p>
                                                <p className="profile-value-text">{moment(hrDetails?.createdAt).format("MM/DD/YYYY")}</p>
                                            </div>

                                            <div className="col-md-4">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <h5 style={{color: '#02C39A', marginTop: '10px', textAlign: 'center'}}>
                                    <i className="bx bx-user"></i> <strong>&nbsp;Assigned Doctor </strong>
                                </h5>
                                {doctorDetails ? doctorDetails && <>
                                    <div>
                                    <img src={defaultImg} className="img-responsive profile-card-img"/>
                                    <p className="profile-name">Dr. {doctorDetails?.firstname} {doctorDetails?.lastname} </p>
                                    <p className="profile-value-text text-center">{doctorDetails?.email}</p>
                                    <button className="btn btn-danger ml-5" onClick={removeDoctor}>Remove Doctor</button>
                                    </div>
                                    </> : <small style={{color: 'gray'}}>No doctor assigned yet</small>}
                            </div>
                        </div>  

                        <hr />  
                        {/* HRs Patients List */}
                        <div className="row-display">
                            <h5 style={{color: '#02C39A', marginTop: '10px'}}>
                                <i className="bx bxs-user-check"></i> <strong>&nbsp;Assigned Patients ({hrpatients && hrpatients?.length < 10 ? '0'+hrpatients?.length : hrpatients?.length})</strong>
                            </h5>

                            <div className="row-display"> 
                            <input 
                                type="text" 
                                className="form-control mt-2"
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search"
                                style={{width: '180px', height: '40px'}}
                            /> 

                            &nbsp;&nbsp;&nbsp;
                            <button className="btn add-staff-btn mt-2" 
                            onClick={() => setSort(sort => !sort)}
                            style={{height: '40px'}}
                            >
                            {sort ? <i className="bx bx-sort-a-z"></i> : <i className="bx bx-sort-z-a"></i>}
                                </button>
                            </div>
                            </div>
                        <br />
                        
                        {hrpatients?.length > 0 ? (<>
                                <div className="col-md-12">
                                    <>
                                        <Table className="table table-sm table-striped">
                                        <thead align="center">
                                            <tr>
                                                <th>Name</th>
                                                <th>D.O.B </th>
                                                <th>Email</th>
                                                <th>Account Status</th>
                                                <th>Assigned Physician</th>
                                                <th>Compliancy Status</th>
                                                <th>Diseases</th>
                                                <th>Consent Program</th>
                                                <th>Action</th>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                        {hrpatients && hrpatients.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                        {patient?.block === false ?  <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}
                                                <p>{patient?.phone1}</p>  
                                                </Link>
                                            </td> : <td>
                                            {patient?.firstname} {patient?.lastname}
                                                <p>{patient?.phone1}</p> 
                                            </td> }

                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 

                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>

                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td>--</td>
                                            </>}

                                            <td>
                                                {patient?.assigned_devices.length > 0 ? <Badge 
                                                pill bg="success text-white" style={{fontSize: '12px'}}>compliant</Badge> : 
                                                <Badge pill bg="danger text-white" style={{fontSize: '12px'}}>non-compliant</Badge>}
                                            </td>

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>

                                            <td>{patient?.assigned_hr_id === hrDetails?._id &&  patient?.assigned_ccm_nurse_id !== hrDetails?._id ? <b>RPM</b> : 
                                                patient?.assigned_ccm_nurse_id === hrDetails?._id &&  patient?.assigned_hr_id !== hrDetails?._id ? <b>CCM</b> : 
                                                patient?.assigned_hr_id === hrDetails?._id && patient?.assigned_ccm_nurse_id === hrDetails?._id ? <b>RPM, CCM</b> : 
                                                null }   
                                            </td>
                                        
                                            
                                            <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : true}>
                                                    <Dropdown.Item>
                                                        <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="link">View Profile</Link> &nbsp;
                                                    </Dropdown.Item>

                                                    <Dropdown.Item>
                                                        <Link to="/hrProfile" className="link" style={{color: 'red'}} onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>Remove from list</Link> &nbsp;
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        </> : <>
                                        {hrpatients && hrpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}
                                                <p>{patient?.phone1}</p>  
                                                </Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 

                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>

                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td>--</td>
                                            </>}

                                            <td>
                                                {patient?.assigned_devices.length > 0 ? <Badge 
                                                pill bg="success text-white" style={{fontSize: '12px'}}>compliant</Badge> : 
                                                <Badge pill bg="danger text-white" style={{fontSize: '12px'}}>non-compliant</Badge>}
                                            </td>

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>

                                            <td>
                                            {patient?.rpmconsent === true && patient?.isCCM === false ? <b>RPM</b> : 
                                                patient?.isCCM === true && patient?.rpmconsent === false ? <b>CCM</b> : 
                                                patient?.rpmconsent === true && patient?.isCCM === true ? <b>RPM, CCM</b> : 
                                                <b>RPM</b>
                                                }   
                                            </td>
                                            
                                            <td>
                                            <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                 <Dropdown.Item>
                                                    <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="link">View Profile</Link> &nbsp;
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <Link to="/hrProfile" className="link" style={{color: 'red'}} onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>Remove from list</Link> &nbsp;
                                                </Dropdown.Item>
                                            </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}

                                        </> }
                                        
                                        </tbody>
                                        </Table>    
                                            </>                      
                                          </div>
                                        </> ) : <>
                                        <div>   
                                           
                        <img src={folderImg} className="no-record-found-img"/>
                        <p className="doctor-specilizations">No Patient Assigned Yet...</p>                            
                                    </div>
                                </> }
                      </div>
                    </div>
                </div>
       </section>

       {/* Modal to delete HR Patient */}
       <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Body>
                <small style={{color: '#303030'}}>Are you sure you want to remove patient 
                        <span style={{color: '#303030', fontWeight: 'bold'}}> {patientName}</span> from hr ?
                </small>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-sm btn-danger" onClick={removePatient}>Remove</button>
            </Modal.Footer>
            </Modal> 
        </Fragment>;
};

export default HRProfile;
