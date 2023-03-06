import React, {useEffect, useState} from 'react';
import patientProfileImg from '../../assets/Images/add-user.png';
import { Image, Button, Badge, Tabs, Tab } from 'react-bootstrap';
import { removeAssignedDevice} from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import systolicImg from '../../assets/Images/blood-pressure.png';
import notFound from '../../assets/Images/notFound.png';
import { hrTimeSpentOfCurrentMonth, hrTimeSpentOfCurrentMonthinCCMCategory, getTimeReportCCM } from '../../actions/HRActions';
import { searchAdminLogsByPatient, removePatientsDoctor, patientProfile, removePatientsHR, removeCCMNurse } from '../../actions/adminActions';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import nurseIcon from '../../assets/Images/nurse.png';
import { Link, useHistory } from 'react-router-dom';
import RPMMinutesProgress from '../../components/HR/RPMMinutesProgress';
import CCMMinutesProgress from '../../components/HR/CCMMinutesProgress';
import { useAlert } from 'react-alert';
import PatientCCMConsent from '../../components/Patient/PatientCCMConsent';
import PatientCareplans from '../../components/Patient/PatientCareplans';
import {CCM_CONSENT_RESET} from '../../constants/HRConstants';
import { CCM_CAREPLAN_RESET } from '../../constants/HRConstants';
const moment = require('moment-timezone');

const PatientInfo = ({patient,patientid, telemetaryReadings, count, batterySignal}) => {

const dispatch = useDispatch();
const history = useHistory();
const alert = useAlert();

let strtDate = '2023/03/01';
let edDate = '2023/03/31'


const [minutesCategory, setMinutesCategory] = useState('RPM');
const {error, message} = useSelector(state => state.common);


const removeAssignDevice = (device, patientid) => {
    var confirmation = window.confirm(`Please confirm to remove device from patient ?`);
        if(confirmation === true){
            dispatch(removeAssignedDevice(device, patientid));
            return;
        }
    }

const { totalTime : timeSpentInCCM} = useSelector(state => state.target);
const { totalTime : timeSpentInRPM } = useSelector(state => state.totalTimeSpent);
const { logs } = useSelector(state => state.searchLogResult);
// const { totalTimeinCCM } = useSelector(state => state.totalTimeSpentInCCM);
// const { user } = useSelector(state => state.auth);

let startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
let endDate = moment().clone().endOf('month').format('YYYY-MM-DD');

useEffect(() => {
    if(message){
        alert.success(message);
        dispatch(patientProfile(patientid));
        
        dispatch({
            type: CCM_CONSENT_RESET
        });
        dispatch({
            type: CCM_CAREPLAN_RESET
        });
    } 

    dispatch(getTimeReportCCM(patientid, strtDate, edDate));

    if(error){
        alert.error(error);
        dispatch({
            type: CCM_CONSENT_RESET
        });
        dispatch({
            type: CCM_CAREPLAN_RESET
        });
    }

    if(patient?._id && patient?.assigned_hr_id?._id){
        dispatch(hrTimeSpentOfCurrentMonth(patient._id, patient.assigned_hr_id._id, startDate, endDate));
        dispatch(hrTimeSpentOfCurrentMonthinCCMCategory(patient._id, patient.assigned_hr_id._id, startDate, endDate));
        dispatch(searchAdminLogsByPatient(patientid));
    }
}, [dispatch, message, error])

const sendEmail = (email) => {
    window.open(`mailto:${email}`)
}

let filteredReadings = calcTotalReadings();

function calcTotalReadings() {
    return telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
    sum + 1, 0
    )
}

const removeDoctor = (patientId, doctorId) => {
    var confirmation = window.confirm('Are you sure you want to remove Doctor from' + 
    ` ${patient?.firstname} ` + `${patient?.lastname}` + '?' );

    if(confirmation){
        dispatch(removePatientsDoctor(patientId, doctorId));
    }
}

const removeRPMNurse = (patientId) => {
    var confirmation = window.confirm('Are you sure you want to remove RPM Nurse from' + 
    ` ${patient?.firstname} ` + `${patient?.lastname}` + '?' );

    if(confirmation){
        dispatch(removePatientsHR(patientId));
    }
}

const RemovePatientCCMNurse = (patientId) => {
    var confirmation = window.confirm('Are you sure you want to remove CCM Nurse from' + 
    ` ${patient?.firstname} ` + `${patient?.lastname}` + '?' );

    if(confirmation){
        dispatch(removeCCMNurse(patientId));
    }
}

return (
    <>
        <div className="row-display">
            <div className="col-md-11">
                <h4 style={{color: '#02C39A'}}>
                    <i className="bx bx-user"></i> <strong>&nbsp;Patient Profile </strong>
                </h4>
            </div>

            <Button className="btn btn-secondary" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></Button> &nbsp;
            <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-home'></i></Link> &nbsp;
        </div>
        <hr />

        {/* New Profile look added here */}
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-center">
                        <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />
                        <b className="mt-3">{patient?.firstname} {patient?.lastname}  </b>
                        <span><small>{patient?._id}</small></span>
                        {patient?.emrId ? <span><small>EMR ID: {patient?.emrId}</small></span> : null }
                        <Link to="/patientProfile" style={{marginLeft: "10%", fontSize: "14px", fontWeight: 'bold'}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>
                        <span style={{padding: '5px', color: "#222"}}><small>Age: {moment().diff(moment(patient?.DOB).format("MM/DD/YYYY"), 'years')} yrs</small></span>
                        <Link className="btn btn-sm btn-primary ml-3 mr-3" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}>
                            Edit Profile
                        </Link>
                        <br/>
                    </div>

                    <br/>
                    <div className="card text-center p-1">
                        <b>Consent Program</b>
                        <h3 style={{color: '#02C39A'}}>
                        {patient?.patientType === 'RPM' ? 'RPM' : 
                            patient?.patientType === 'CCM' ? 'CCM' : 
                            patient?.patientType === 'Both' ? 'RPM, CCM' : 
                            null
                        }
                        </h3>
                    </div>

                    <br />
                    <div className="card text-center p-2">
                        <b>Information</b>
                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Acc. Status:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                {patient?.block === true ? <Badge bg="danger text-white" style={{padding: '5px', letterSpacing: '2px'}}>Blocked</Badge> : 
                                    <Badge bg="success text-white" style={{padding: '5px', letterSpacing: '2px'}}>Active</Badge>
                                 }
                            </div>
                        </div>

                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Gender:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{patient?.gender}</small>
                            </div>
                        </div>

                        <div className="row-display-secondary">
                            <div style={{width: '120px'}}>
                                <small><b>D.O.B:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{moment(patient?.DOB).format('MM/DD/YYYY')}</small>
                            </div>
                        </div>

                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Primary Ph #:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{patient?.phone1 || '--'}</small>
                            </div>
                        </div>

                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Diseases:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{patient?.diseases || '--'}</small>
                            </div>
                        </div>

                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Ins. Co.:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{patient?.insurancecompany || '--'}</small>
                            </div>
                        </div>

                        <div className="row-display">
                            <div style={{width: '120px'}}>
                                <small><b>Acc. Created:</b></small>
                            </div>

                            <div style={{width: '200px'}}>
                                <small>{moment(patient?.createdAt).format('MM/DD/YYYY') || '--'}</small>
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Middle section of profile */}
                <div className="col-md-6">
                    <div className="card">
                        <span className="text-center mt-3"> <small>{patient?.address}, {patient?.city} - {patient?.line2} - {patient?.city}, {patient?.state} - {patient?.zipCode} </small></span>
                        <hr />

                        <div className="row">
                            {/* Devices Details */}
                            {patient?.patientType === 'RPM' || patient?.patientType === 'Both' ? <>
                            <div className="col-6 text-center" style={{borderRightWidth: '2px', borderRightStyle: 'solid', borderRightColor: '#F1F1FA'}}>
                                <b className="mt-3">Device (s) Assigned  </b>
                                <br/>
                                {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                    <div key={index}>
                                        {/* device IMEI */}
                                        <div className="row-display">
                                            <div style={{width: '120px'}}>
                                                <small>Device IMEI:</small>
                                            </div>

                                            <div style={{width: '170px'}}>
                                                <small>{deviceass?.deviceObjectId?.imei || '---'}</small>
                                            </div>
                                        </div>

                                        {/* device Type */}
                                        <div className="row-display">
                                            <div style={{width: '120px'}}>
                                                <small>Device Type:</small>
                                            </div>

                                            <div style={{width: '170px'}}>
                                            {deviceass?.deviceObjectId?.deviceType === 'bp' ? 
                                            <Badge bg="warning text-white" style={{padding: '5px', letterSpacing: '2px'}}>cuff</Badge>
                                                : deviceass?.deviceObjectId?.deviceType === 'spO2' ? <Badge bg="info text-white" style={{padding: '5px', letterSpacing: '2px'}}>Spo2</Badge> : 
                                                <td><Badge bg="danger text-white" style={{padding: '5px', letterSpacing: '2px'}}>Weight</Badge></td>}
                                                
                                            </div>
                                        </div>

                                        {/* device Type */}
                                         
                                        <div className="row-display">
                                            <div style={{width: '120px'}}>
                                                <small>Assign Date:</small>
                                            </div>

                                            <div style={{width: '170px'}}>
                                                <small>{deviceass?.deviceObjectId?.assignedTime || '---'}</small>
                                            </div>
                                        </div>

                                        {/* Device Signal strength */}
                                        <div className="row-display">
                                            <div style={{width: '120px'}}> 
                                                <small>Device Signal: </small>
                                            </div>

                                            <div style={{width: '170px'}}>
                                            {batterySignal >= 0 && batterySignal <= 10 ? 
                                                <small style={{color: 'red', fontWeight: 'bold'}}>Weak</small> : batterySignal > 10 && batterySignal <= 20 ? 
                                                <small style={{color: 'orange', fontWeight: 'bold'}}>Medium</small> : batterySignal > 20 ? <small style={{color: 'green', fontWeight: 'bold'}}>Strong</small> : '--'}
                                            </div>
                                        </div>

                                        <div className="row-display">
                                            <div style={{width: '120px'}}>
                                                <small><b>RPM Consent: </b></small>
                                            </div>

                                            <div style={{width: '170px'}}>
                                                <small>{patient?.rpmconsent === true ? <span style={{color: 'green', fontWeight: 'bold'}}>
                                                    Signed</span> : 
                                                    <span style={{color: 'red', fontWeight: 'bold'}}>Not Signed</span>}
                                                </small>
                                            </div>
                                        </div>
                                                
                                        <div className="row ml-4">
                                            <button className="btn btn-sm btn-outline-primary ml-3 mt-2" onClick={() => {navigator.clipboard.writeText(deviceass?.deviceObjectId?.imei); alert.success('IMEI COPIED')}}> 
                                                <i className="bx bx-copy"></i>
                                            </button>

                                            <Link to={{ pathname:"/devices"}} className="btn btn-sm btn-outline-primary ml-3 mt-2">
                                                <i className="bx bx-menu"></i>
                                            </Link>

                                            <button className="btn btn-sm btn-outline-danger ml-3 mt-2" onClick={() => removeAssignDevice(deviceass, patientid)}>
                                                <i className='bx bxs-user-minus'></i>
                                            </button>
                                        </div>
                                        {/* <hr/> */}
                                    </div>
                                ))}
                            </div>
                            </> : <>
                                <div className="col-6 text-center" style={{borderRightWidth: '2px', 
                                    borderRightStyle: 'solid', 
                                    borderRightColor: '#F1F1FA'
                                    }}>
                                
                                </div>
                            </> }
                            
                            {/* Doctors and nurse details */}
                            <div className="col-6">
                                {/* Assigned Doctor Nurse */}
                                <div className="text-center">
                                        {patient?.assigned_doctor_id ? <>
                                            <span className="text-center"><b>Assigned Doctor</b>
                                            <div className="row-display-secondary">
                                                <img src={doctorIcon} alt="patientProfile" style={{width:'60px', height:'60px'}}/>    

                                                <Link className="link" to={{ pathname: "/doctorProfile", state: {id: patient?.assigned_doctor_id?._id}}}>
                                                    <p className="pt-2 m-1">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                                    <small><b>Role: </b> Doctor</small>
                                                </Link> 
                                            </div>

                                            &nbsp;&nbsp;<button className="btn btn-sm btn-outline-danger mt-2 mb-2" 
                                                onClick={() => removeDoctor(patient?._id, patient?.assigned_doctor_id?._id)}>
                                                <i className='bx bxs-user-minus'></i> Rmv. Doctor
                                            </button>
                                            </span>
                                            <hr />
                                            </>
                                            : null}
                                    

                                    {/* Assigned RPM Nurse */}
                                    {patient?.patientType === 'RPM' || patient?.patientType === 'Both' ? <>
                                        <div>
                                        {patient?.assigned_hr_id ?
                                            <span>
                                                <b>Assigned RPM Nurse</b>                                             
                                                <div className="row-display-secondary">
                                                    <img src={nurseIcon} alt="nurse-icon" style={{width:'60px', height:'60px'}}/>    

                                                    <Link className="link" to={{ pathname: "/hrProfile", state: {hr: patient?.assigned_hr_id}}}>
                                                        <p className="pt-2 m-1">RN. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                                                        <small><b>Consent Role: </b> {patient?.assigned_hr_id?.consentRole}</small>
                                                    </Link>
                                                </div>

                                                &nbsp;&nbsp;<button className="btn btn-sm btn-outline-danger mt-2 mb-2"
                                                onClick={() => removeRPMNurse(patient?._id, patient?.assigned_hr_id?._id)}>
                                                    <i className='bx bxs-user-minus'></i> Rmv. RPM Nurse
                                                </button>
                                                </span>
                                            : null}
                                        </div>
                                    </> : null }
                                    
                                    
                                    {patient?.patientType === 'CCM' || patient?.patientType === 'Both' ? <>
                                    <div>
                                        {patient?.assigned_ccm_nurse_id ?
                                            <span>
                                            <b>Assigned CCM Nurse</b>
                                            {/* Assigned CCM Nurse */}
                                            
                                            <div className="row-display-secondary">
                                                <img src={nurseIcon} alt="nurse-icon" style={{width:'60px', height:'60px'}}/>    

                                                <Link className="link" to={{ pathname: "/hrProfile", state: {hr: patient?.assigned_ccm_nurse_id}}}>
                                                    <p className="pt-2 m-1">RN. {patient?.assigned_ccm_nurse_id?.firstname} {patient?.assigned_ccm_nurse_id?.lastname}</p>
                                                    <small><b>Consent Role: </b> {patient?.assigned_ccm_nurse_id?.consentRole}</small>
                                                </Link> 
                                            </div>

                                            &nbsp;&nbsp;<button className="btn btn-sm btn-outline-danger mt-2 mb-2"
                                            onClick={() => RemovePatientCCMNurse(patient?._id, patient?.assigned_ccm_nurse_id?._id)}>
                                                <i className='bx bxs-user-minus'></i> Rmv. CCM Nurse
                                            </button>
                                            <br/>
                                            </span>  
                                            : null }
                                            <br/>
                                        </div>
                                    </> : null }
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    {/* Avg B.P and reent readings section */}
                    {patient?.patientType === 'RPM' || patient?.patientType === 'Both' ? <>
                        
                    <div className="card">
                        <div className="row">
                            <div className="col-5 text-center">
                                <b><br/>Telemetary Readings</b>
                                <hr/>

                                {/* Telemetary Readings */}
                                {telemetaryReadings && telemetaryReadings.length > 0 ? <>
                                {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,5).map((devicedata, index) => (
                                    <div key={index} className="row-display text-center ml-4 mt-2" >
                                        {devicedata.telemetaryData?.sys && devicedata.telemetaryData?.dia !== undefined ? <>
                                            <Image src={systolicImg} style={{width: '30px', height: '30px'}} /> 
                                                {devicedata?.telemetaryData?.sys} / {devicedata?.telemetaryData?.dia} <small>mmHG</small>
                                                {/* */}
                                                
                                                <br/>
                                                <br/>
                                        </> : " "}
                                    </div>
                                ))}
                            </> : <div className="text-center">
                                <img src={notFound} style={{width: '40px', height: '40px'}} alt="not found" />
                                    <p><small>No records found</small></p>
                                </div> 
                                }
                            </div>

                            <div className="col-7 text-center">
                                <b className="ml-2"><br/>Avg Systolic / Diastolic</b>
                                <hr />

                                <div className="row-display">
                                <div className="circularbox">
                                    <div className="percent">
                                    <svg stroke='darkblue'>
                                        <circle cx="70" cy="70" r="50"></circle>
                                        <circle cx="70" cy="70" r="50"></circle>  
                                    </svg> 

                                        <div className="number">
                                        {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,10).reduce((total, devicedata) =>  
                                        (Number(total) + Number(devicedata?.telemetaryData?.sys) / filteredReadings).toFixed(), 0
                                        )}
                                        
                                        </div>
                                    </div>
                                    <h5 className="text">Avg. Systolic</h5>
                                </div>

                                    <div className="circularbox">
                                        <div className="percent">
                                        <svg stroke='dodgerblue'>
                                                <circle cx="70" cy="70" r="50"></circle>
                                                <circle cx="70" cy="70" r="50"></circle>  
                                            </svg> 

                                            <div className="number">
                                            {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((total, devicedata) =>  
                                            (Number(total) + Number(devicedata?.telemetaryData?.dia) / filteredReadings).toFixed(), 0
                                            )} 
                                            </div>
                                        </div>
                                        <h5 className="text">Avg. Diastolic</h5>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>

                    </> : null}
                    

                        {/* Here is a closing tag */}
                    </div>

                {/* Monthly Target Section  */}
                <div className="col-md-3">
                <div className="card monthly-target-card p-2">    
                <h5 className="text-white mt-2">Monthly Target</h5> 
                    <p>
                        <small style={{color: '#fff'}}>For the month of {new Date().toLocaleString('en-us',{month:'long', year:'numeric'})}
                        </small>
                    </p>
                

                {patient?.patientType === 'Both' ? <>
                    <select className="form-control" value={minutesCategory} onChange={e => setMinutesCategory(e.target.value)}>
                        <option value="RPM">RPM Category</option>
                        <option value="CCM">CCM Category</option>
                    </select>
                    <br />
                </> : null}                                    
            
                        
                    {patient?.patientType === 'RPM' ? <RPMMinutesProgress count={count} totalTime={timeSpentInRPM} />
                        : patient?.patientType === 'CCM' ?  <CCMMinutesProgress totalTimeinCCM={timeSpentInCCM} />
                        : patient?.patientType === 'Both' ? 
                            <>
                            {minutesCategory === 'RPM' ? <RPMMinutesProgress count={count} totalTime={timeSpentInRPM} /> 
                            : 
                            <CCMMinutesProgress totalTimeinCCM={timeSpentInCCM} />
                            }
                            </>
                        : null }
                    </div>

                    {/* Careplans && Consents*/}
                    <br/>
                    {patient?.patientType === 'CCM' || patient?.patientType === 'Both' ? <>
                    <div className="card consentCard pl-3 pr-3">
                    <Tabs
                        defaultActiveKey="home"
                        id="justify-tab-example"
                        className="mb-3 mt-3"
                        >
                        <Tab eventKey="home" title="Careplan">
                            <PatientCareplans patientId={patient?._id}/>
                        </Tab>
                        <Tab eventKey="profile" title="Consent">
                            <PatientCCMConsent patientId={patient?._id} />
                        </Tab>
                    </Tabs>
                    
                    </div> </> : <div>
                    <div className="patient-logs-card">
                    <h5 className="p-2 mt-2"><b>{patient?.firstname} {patient?.lastname}'s Logs </b></h5>
                     {logs && logs.length > 0 ? <>
                        {logs.slice(0,30).map((log, index) => (
                        <div key={index}>
                            <ul>
                                <div style={{background: '#FFF', padding: '5px', listStyle:"none", borderRadius: '10px'}}>
                                    <li><small>{log?.text} <br/> <b>{moment(log?.createdAt).tz('America/New_York').format("MM/DD/YYYY hh:mm")} </b></small></li>
                                </div>
                            </ul>
                        </div>  
                        ))}
                            </> : <div className="text-center">
                            <img src={notFound} style={{width: '40px', height: '40px'}} alt="not found" />
                                <p><small>No records found</small></p>
                            </div> } 
                        </div>
                    </div>
                    }
                    

                    {/* Patient logs section */}
                    <br/>
                     
                    </div>
                </div>
            </div>                
                    </>
)
}

export default PatientInfo