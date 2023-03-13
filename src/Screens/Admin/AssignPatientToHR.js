import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile,
    getCCMPatients, 
    assignPatientToHR, 
    assignPatientToHRwithCCM, 
    assignPatientToHRwithRPMCCM 
} from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { RESET_ASSIGN_PATIENT_TO_HR } from '../../constants/adminConstants';
import Select from 'react-select'
import { Button, Form, Badge } from 'react-bootstrap';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import hrIcon from '../../assets/Images/network.png';

const AssignPatientToHr = (props) => {

    let id = props?.location?.state?.id;
    let hrId = props?.location?.state?.id?._id;
    let firstName = props?.location?.state?.id?.firstname;
    let lastName = props?.location?.state?.id?.lastname;

    const dispatch = useDispatch();
    const alert = useAlert();

    const [patientId, setPatientId] = useState('');

    const [rpmSwitch, setRpmSwitch] = useState(false);
    const [ccmSwitch, setCcmSwitch] = useState(false);
    const [patientType, setPatientType] = useState('RPM');

    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(700);


    const { error, patients } = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { isAssigned } = useSelector(state => state.hrslist);

    
    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        if(patientType === 'RPM'){
            dispatch(getPatients());
        } else {
            dispatch(getCCMPatients(resPerPage, currentPage));
        }

        if (patientId) {
            dispatch(patientProfile(patientId))
        }

        if (isAssigned === true) {
            alert.success('Nurse Assigned');
            props.history.push({ pathname: "/hrProfile", state: { hr: id } });
            dispatch({
                type: RESET_ASSIGN_PATIENT_TO_HR
            })
        }

    }, [dispatch, alert, error, patientId, isAssigned, patientType]);

    const assignPatient = () => {
        if(rpmSwitch === true && ccmSwitch === false){
            dispatch(assignPatientToHR(hrId, patientId))
            return;

        } else if (ccmSwitch === true && rpmSwitch === false){
            dispatch(assignPatientToHRwithCCM(hrId, patientId));
            return;

        } else if(rpmSwitch === true && ccmSwitch === true){
            dispatch(assignPatientToHRwithRPMCCM(hrId, patientId));
            return;
        } else 
        return
    }

    const onSwitchAction = () => {
        setRpmSwitch(!rpmSwitch);
      };

    const ccmSwitchAction = () => {
        setCcmSwitch(!ccmSwitch);
      };

    const funcSetPatientProfile = (patient) => {
        setPatientId(patient.value)
        // console.log('patient ID is ' + patient.value);
    }

    const options = []
    patients && patients.map((patient) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ") })
    ))

    // const ccmOptions = []
    // patients && patients.map((patient) => (
    //     options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ") })
    // ))


    return (
        <Fragment>
            <MetaData title="Assign Patient" />
            <Sidebar />

            <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="col-md-0 shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>
                                <i className='bx bx-user'></i> <strong>&nbsp;Assigning Pt. To <span style={{color: '#8FBB2C'}}>
                                    {firstName} {lastName} </span>
                                </strong>
                            </h5>
                            <br/>

                            
                             <strong>Consent Role</strong>
                                <div className='row-display text-center'>
                                <div className={`cardButton ${patientType === "RPM" ? "cardActive" : ""}`}
                                    onClick={() => setPatientType("RPM")}>
                                        <img src={doctorIcon} alt="rpmPt" height="60" width="60"/>
                                            <p> RPM Patients </p>
                                    </div>
                                    
                                    
                                    <div className={`cardButton ${patientType === "CCM" ? "cardActive" : ""}`}
                                    onClick={() => setPatientType("CCM")}>
                                        <img src={hrIcon} alt="ccmPt" height="60" width="60"/>
                                        <p> CCM Patient </p>
                                    </div>
                                </div>
                             <br/>   

                            {patientType === 'RPM' ? <>
                                <strong>&nbsp;Select RPM Patient </strong>
                                
                                <Select
                                    options={options}
                                    onChange={funcSetPatientProfile}
                                />
                            </> : <>
                            <strong>&nbsp;Select CCM Patient </strong>
                                
                                <Select
                                    options={options}
                                    onChange={funcSetPatientProfile}
                                />
                            </>
                            }
                            
                        </div>

                        <div className="col-md-8">
                            <div className="row-display">
                                <h5 style={{color: '#8FBB2C'}}>
                                    <i className='bx bx-plus-medical'></i> <strong>&nbsp;Patient Details </strong>
                                </h5>

                                <div className="row-display"> 
                                <Button className="btn btn-secondary" onClick={() => props.history.goBack()}><i className='bx bx-arrow-back' ></i></Button> 
                                    &nbsp;&nbsp;
                                    <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-home' ></i></Link> &nbsp;
                                </div>
                            </div>
                            <br />

                            {patientId && patient && <Fragment>
                                <div className="col-md-12">
                                    <div className="row">
                                        <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                        <p className="profile-name pl-3 pb-2">{patient?.firstname} {patient?.lastname} </p>
                                    </div>

                                    <br />

                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email Address: </span>
                                            <p className="profile-value-text">{patient?.email ? patient?.email : 'N/A'}</p>

                                            <span className="profile-label">Address: </span>
                                            <p className="profile-value-text">{patient?.address} , {patient?.state}</p>

                                            <span className="profile-label">RPM Nurse</span>
                                            {patient?.assigned_hr_id ? 
                                                <p className="profile-value-text" style={{color: '#8FBB2C'}}>{patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p> 
                                            : <p><small>No RPM Nurse</small></p>}                                            
                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">D.O.B: </span>
                                            <p className="profile-value-text">{moment(patient?.DOB).format("MM/DD/YYYY")}</p>

                                            <span className="profile-label">Role: </span>
                                            <p className="profile-value-text"><Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>{patient?.role}</Badge></p>

                                            <span className="profile-label">CCM Nurse</span>
                                            {patient?.assigned_ccm_nurse_id ? 
                                                <p className="profile-value-text" style={{color: '#8FBB2C'}}>{patient?.assigned_ccm_nurse_id?.firstname} {patient?.assigned_ccm_nurse_id?.lastname}</p> 
                                            : <p><small>No CCM Nurse</small></p>}
                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">
                                            {patient?.gender === 'male' ? <td>
                                                <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                                </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                            </td>}
                                            </p>

                                            <span className="profile-label">SSN: </span>
                                            <p className="profile-value-text">{patient?.ssn ? patient?.ssn : 'N/A'}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <hr/>
                            
                                <b>Select Consent</b>

                                <Form>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                        label="RPM"
                                        checked={rpmSwitch}
                                        onChange={onSwitchAction}

                                    />
                                    <Form.Check 
                                        type="switch"
                                        label="CCM"
                                        id="CCM"
                                        checked={ccmSwitch}
                                        onChange={ccmSwitchAction}
                                    />
                                    </Form>    
                                <br/>
                                
                                <div style={{color: 'red', fontWeight: 'bold'}}>
                                {rpmSwitch === true && ccmSwitch === false ? 
                                    <p>Do you want Nurse {firstName} {lastName} to do RPM for {patient?.firstname} {patient?.lastname} ?</p> 
                                 : ccmSwitch === true && rpmSwitch === false ? <p>
                                    <p>Do you want Nurse {firstName} {lastName} to do CCM for {patient?.firstname} {patient?.lastname} ?</p> 
                                 </p> : rpmSwitch === true && ccmSwitch === true ? <p>
                                 Do you want Nurse {firstName} {lastName} to do both RPM & CCM for {patient?.firstname} {patient?.lastname} ?
                                 </p> : null }
                                 </div>                
                                    
                                <button className="add-staff-btn mr-5" style={{ float: 'right' }} onClick={() => assignPatient()}> Assign Patient </button>
                            </Fragment>}
                        </div>
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default AssignPatientToHr;
