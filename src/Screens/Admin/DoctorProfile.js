import React, { useEffect, Fragment, useState } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import defaultImg from '../../assets/Images/defaultUser.png';
import { useDispatch, useSelector } from 'react-redux';
import { doctorProfile, getDoctorPatients, removePatientsDoctor, removeHRFromDoctor } from '../../actions/adminActions';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {Badge, Modal, Button, DropdownButton, Dropdown, Table} from 'react-bootstrap';

const DoctorProfile = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let docId = props?.location?.state?.id;
    const [smShow, setSmShow] = useState(false); //small confirm modal.
    const [patientName, setPatientName] = useState(""); //patient name to show in modal.
    const [patientToRemove, setpatientToRemove] = useState(""); //set patient id to remove.
    const [doctorId, setDoctorID] = useState(docId); 
    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState("");
    const keys = ["firstname", "lastname", "DOB", "email", "phone1", "diseases"];

    const { loading, error: doctorProfileError, doctor } = useSelector(state => state.doctorProfile);
    const { doctorpatients } = useSelector(state => state.docPatients);
    const {error, message} = useSelector(state => state.common);

    useEffect(() => {
        if(message){
            alert.success(message);
        }
    
        if(error){
            alert.error(error)
        }
        
        dispatch(doctorProfile(doctorId));
        dispatch(getDoctorPatients(doctorId));
    }, [dispatch, error, doctorId, message, doctorId]);


    const removePatient = () => {
        dispatch(removePatientsDoctor(patientToRemove, doctorId));
        setSmShow(false);
    }

    const removeHR = (hrId) => {
        dispatch(removeHRFromDoctor(hrId, doctorId));
        props.history.push('/doctors');
    }

    const sendEmail = (email) => {
        window.open(`mailto:${email}`)
    }


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

                        
                        <div className="row-display">
                            <div className="col-md-9">   
                                <h5 style={{color: '#02C39A', marginTop: '10px'}}>
                                    <i className="bx bx-user"></i> <strong>&nbsp;Doctor Profile </strong>
                                </h5>
                            </div>
                            
                            <div className="row-display">
                                <Button className="btn btn-secondary" onClick={() => props.history.goBack()}><i className='bx bx-arrow-back' ></i></Button> &nbsp;
                                    <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-home'></i></Link> &nbsp;
                                    <Link to={{ pathname: "/assigndoctor", state: {id: doctor?._id, firstName: doctor?.firstname, lastName: doctor?.lastname}}} 
                                    className="add-staff-btn">Assign Patient
                                </Link>
                            </div>                          
                        </div>
                         <hr />

                        
                        <div className="container">
                        {doctor && <Fragment>
                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={defaultImg} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">Dr. {doctor?.firstname} {doctor?.lastname} </p>
                                    
                                    <Link to="/doctorProfile" 
                                        className="link text-center" 
                                        onClick={() => sendEmail(doctor?.email)}><p className="text-center">{doctor?.email}</p>
                                    </Link>
                                                                        
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-4">

                                            <span className="profile-label">License Number: </span>
                                            <p className="profile-value-text">{doctor?.licensenumber ? doctor?.licensenumber : 'N/A'}</p>
                                            
                                            <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(doctor.DOB).format("MM/DD/YYYY")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{doctor?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.phone1} </span> : 'N/A'}</p>

                                                <span className="profile-label">Acc. Created At: </span>
                                                <p className="profile-value-text">{moment(doctor?.createdAt).format("MM/DD/YYYY")}</p>
                                            </div>


                                            <div className="col-md-3" style={{borderRightStyle: 'solid', borderRightWidth: '2px', borderRightColor: '#ccc'}}>
                                                
                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{doctor?.licensenumber}</p>

                                                <span className="profile-label">Mobile No: </span>
                                                <p className="profile-value-text">{doctor?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.mobileNo} </span> : 'N/A'}</p>
                                            </div>

                                            <div className="col-md-5 text-center">
                                            
                                            <h5 style={{color: '#02C39A', marginTop: '10px'}}>
                                                <i className="bx bx-user"></i> <strong>&nbsp;Assigned HR </strong>
                                            </h5> 


                                                {doctor && doctor?.assigned_hr_id?._id ? <>
                                                <hr />
                                                <img src={defaultImg} className="img-responsive profile-card-img"/>
                                                <p className="profile-name">{doctor?.assigned_hr_id?.firstname} {doctor?.assigned_hr_id?.lastname} </p>
                                                <p className="profile-value-text text-center" style={{wordWrap: 'break-word'}}>{doctor?.assigned_hr_id?.email}</p>
                                                <p className="profile-value-text text-center">{doctor?.assigned_hr_id?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.assigned_hr_id?.phone1} </span> : 'N/A'}</p>
                                                <button className="btn btn-danger ml-5" onClick={() => removeHR(doctor?.assigned_hr_id?._id)}>Remove HR</button>
                                                </> : <small style={{color: 'gray'}}> <hr /> No HR assigned yet</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    


                        {/* paste patients list fragment here */}
                        {doctorpatients && doctorpatients?.length > 0 ? (<Fragment>
                            <div className="row-display">
                            
                            <h5 style={{color: '#02C39A', marginTop: '10px'}}>
                                <i className="bx bxs-user-check"></i> <strong>&nbsp;Assigned Patients ({doctorpatients && doctorpatients.length < 10 ? '0'+doctorpatients.length : doctorpatients.length})</strong>
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

                                <div className="col-md-12">
                                    <Fragment>
                                        <Table className="table table-sm table-striped">
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>D.O.B </th>
                                            <th>Account Status</th>
                                            <th>Assigned Physician</th>
                                            <th>Compliancy Status</th>
                                            <th>Diseases</th>
                                            <th>Consent Role</th>
                                            <th>Action</th>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                            {doctorpatients && doctorpatients.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr align="center" key={index}>

                                        {patient?.block === false ? <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}}
                                                to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}
                                                <p>{patient?.phone1}</p>  
                                                </Link>
                                            </td> : <td>
                                            {patient?.firstname} {patient?.lastname}
                                                <p>{patient?.phone1}</p>
                                            </td> }

                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 

                                    
                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td><Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge></td>
                                            </>}

                                            <td>
                                                {patient?.assigned_devices.length > 0 ? <Badge 
                                                pill bg="success text-white" style={{fontSize: '12px'}}>compliant</Badge> : 
                                                <Badge pill bg="danger text-white" style={{fontSize: '12px'}}>non-compliant</Badge>}
                                            </td>

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>

                                            <td>{patient?.patientType}</td>        
                                            <td>
                                            <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                <Dropdown.Item>
                                                <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="link">View Profile</Link> &nbsp;

                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <Link to="/doctorProfile" className="link" style={{color: 'red'}} onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>Remove from list</Link> &nbsp;
                                                </Dropdown.Item>
                                            </DropdownButton>
                                            </td>

                                            {/* <td>
                                            </td> */}
                                        </tr> 
                                        
                                        ))}    
                                        </> : <>
                                        {doctorpatients && doctorpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                        
                                            <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}  
                                                <p>{patient?.phone1}</p></Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 

                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>

                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td><Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge></td>
                                            </>}

                                            <td>
                                                {patient?.assigned_devices.length > 0 ? <Badge 
                                                pill bg="success text-white" style={{fontSize: '12px'}}>compliant</Badge> : 
                                                <Badge pill bg="danger text-white" style={{fontSize: '12px'}}>non-compliant</Badge>}
                                            </td>

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>
                                            
                                                
                                            <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light">
                                                    <Dropdown.Item>
                                                    <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="link">View Profile</Link> &nbsp;

                                                    </Dropdown.Item>

                                                    <Dropdown.Item>
                                                        <Link to="/doctorProfile" className="link" style={{color: 'red'}} onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>Remove from list</Link> &nbsp;
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        </> }
                                        
                                        
                                        </tbody>
                                        </Table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>

                        <div>    
                        <h5 className="pt-2 mt-2">Patient's List </h5> 
                            <hr className="blue-hr"/>
                                           
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>
                            
                             
                        </div>
                        </Fragment> }               


                        {/* paste patients list fragment here */}
                        </Fragment>}
                        
                        </div>
                    </div>
                    </div>
                    </Fragment>
                    }
            </section>

             <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body>
                    <small style={{color: '#303030'}}>Are you sure you want to remove patient 
                            <span style={{color: '#303030', fontWeight: 'bold'}}> {patientName}</span> from doctor 
                            <span style={{color: '#303030', fontWeight: 'bold'}}> {doctor?.firstname} {doctor?.lastname} ?
                            </span>
                            
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-danger" onClick={removePatient}>Remove</button>
                </Modal.Footer>
             </Modal> 
        </Fragment>
    )
}

export default DoctorProfile
