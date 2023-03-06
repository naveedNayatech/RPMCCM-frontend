import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { Badge, Form, Modal, Table, ProgressBar} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { getPatients,
         patientProfile, 
         assignRPMDeviceToPatient, 
         getDeviceDetails, 
         getDeviceSignalHistory 
        } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';

const RPMDeviceBasicInformation = (props) => {

    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    let deviceDetails = props?.deviceData;

    const { error, patients} = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { error: deviceError, isUpdated} = useSelector(state => state.device);
    const {error:commonError, message} = useSelector(state => state.common);
    const { signalHistory } = useSelector(state => state.deviceSignalHistory)

    const [patientId, setPatientId] = useState('');
    const [smShow, setSmShow] = useState(false); //RPM Consent modal
    const [RPMConsent, setRPMConsent] = useState(false); 

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        if(deviceError){
            return alert.error(error);
        }

        if(commonError) {
            return alert.error(commonError)
        }

        dispatch(getPatients());
        dispatch(getDeviceSignalHistory(deviceDetails?._id));

        if(patientId){
            dispatch(patientProfile(patientId))
        }

        if(message) {
            alert.success(message);
            history.push('/devicedetails');
            dispatch(getDeviceDetails(deviceDetails?._id));
        }
        
    }, [dispatch, alert, error, message, patientId, commonError]);

    const AssignDeviceToPatient = () => {
        dispatch(assignRPMDeviceToPatient(deviceDetails?._id, patientId));
    }

    const getPatientProfile = (patient) => {
        // e.preventDefault();
        setPatientId(patient.value)
    }

    const options = []
    patients && patients.map((patient, index) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")  })
    ))
    
    return (
        <Fragment>
            <small><b>Basic Information: </b></small>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="col-md-3">Model Number </th>
                            <td scope="col-md-3">{deviceDetails?.modelNumber ? deviceDetails?.modelNumber : 'N/A'}</td>
                            <th scope="col-md-3">IMEI</th>
                            <td scope="col-md-3">{deviceDetails?.imei ? deviceDetails?.imei : 'N/A'}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Type</th>
                            {/* {deviceDetails?.deviceType === 'bp' ? <td scope="col-md-3"><Badge bg="warning text-white">
                                cuff</Badge></td> : <td><Badge bg="info text-white">Weight</Badge></td>} */}
                                {deviceDetails?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" style={{padding: '10px', letterSpacing: '2px'}}>cuff</Badge></td>
                                        : deviceDetails.deviceType === 'spO2' ? <td><Badge bg="info text-white" style={{padding: '10px', letterSpacing: '2px'}}>Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" style={{padding: '10px', letterSpacing: '2px'}}>Weight</Badge></td>
                                        }
                            <th scope="col-md-3">Physical Status</th>
                            <td scope="col-md-3" style={{color: deviceDetails?.broken === true ? 'red': 'green'}}><b>{deviceDetails?.broken  === true ? 'broken' : 'unbroken'}</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Added Date</th>
                            <td scope="col-md-3">{moment(deviceDetails?.createdAt).format("MM/DD/YYYY")}</td>
                            <th scope="col-md-3">Firmware Version</th>
                            <td scope="col-md-3">{deviceDetails?.firmwareVersion ? deviceDetails?.firmwareVersion : 'N/A'}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">hardware Version</th>
                            <td scope="col-md-3">{deviceDetails?.hardwareVersion ? deviceDetails?.hardwareVersion : 'N/A'}</td>
                            <th scope="col-md-3">Device Status</th>
                            {deviceDetails?.assigned_patient_id ?  <td scope="col-md-3"><Badge bg="info text-white" className="male-tag"> Assigned</Badge></td> : <td><Badge bg="success text-white" className="male-tag"> In Stock</Badge></td>
                             } 
                        </tr>

                        {deviceDetails?.assigned_patient_id && <Fragment>
                            <tr> 
                            <th scope="col-md-3">Assigned To: </th>
                            <td scope="col-md-3" style={{backgroundColor: '#23408e', 
                            color: '#FFF', letterSpacing:1}}>
                                {deviceDetails?.assigned_patient_id?.firstname} {deviceDetails?.assigned_patient_id?.lastname} ( {deviceDetails?.assigned_patient_id?.gender} )</td>
                            <th scope="col-md-3">Assigned Date: </th>
                            <td scope="col-md-3" style={{backgroundColor: '#23408e', color: '#FFF', 
                            letterSpacing:1}}>{deviceDetails?.assignedTime || 'N/A'}</td>
                        </tr>
                        </Fragment> 
                        }
                        
                    </tbody>
                </table>
                <div>

                <div>
                {signalHistory && signalHistory.length > 0 && <>
                    <small><b style={{color: '#0044ad'}}>Device Signals & battery history: </b></small>

                    <Table className="table table-sm"> 
                    <thead align="center">
                        <tr>
                            <th>Device ID</th>
                            <th>Signal strength</th>
                            <th style={{width: '15%'}}>Battery %</th>
                            <th>Updated Date / Time</th>
                        </tr> 
                    </thead>
                    
                    <tbody>
                    {signalHistory && signalHistory.map((signals, index) => (
                        <tr align="center" key={index}>
                            <td>{signals?.deviceId}</td>
                            <td>{signals?.signalData?.sig >= 0 && signals?.signalData?.sig <= 10 ? 
                                <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : signals?.signalData?.sig > 10 && signals?.signalData?.sig <= 20 ? 
                                <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : signals?.signalData?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : null} 
                            </td>

                            <td>
                                {signals?.signalData?.bat ? <ProgressBar striped variant="info" now={signals?.signalData?.bat} label={`${signals?.signalData?.bat}%`} /> : null} </td>
                            <td>
                                <p>{signals ? moment(signals?.dateAdded).format("MM/DD/YYYY") : null} &nbsp;
                                    {signals ? signals?.time : null}
                                </p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    

                    <tbody>

                    </tbody>
                </Table>
                </>}
                </div>
                
                {deviceDetails && deviceDetails?.assigned_patient_id?._id == null ? <>
                <small><b>Assign Device to Patient</b></small>

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label mt-3">Select Patient</label>
                           <Select
                                options={options}
                                onChange={getPatientProfile}
                            />
                    </div>

                    {/* Patient Profile */}
                    <div className="col-md-8">

                    {patientId && patient && <Fragment>

                                    <div className="col-md-12">
                                        <div className="row">
                                    
                                        <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                    
                                        <p className="profile-name pl-3 pb-2">{patient?.title} {patient?.firstname} {patient?.lastname} </p>
                                    </div>
                                    <br />
                                <div className="row">
                                    <div className="col-md-4">    
                                        <span className="profile-label">Gender: </span>
                                        <p className="profile-value-text">{patient?.gender === 'male' ? <Badge bg="info text-white" className="male-tag">Male</Badge> : <Badge bg="danger text-white">Female</Badge>}</p>

                                        <span className="profile-label">DOB: </span>
                                        <p className="profile-value-text">{moment(patient?.DOB).format("MM/DD/YYYY")}</p>
                                    </div>

                                    <div className="col-md-4">    
                                        <span className="profile-label">Email Address: </span>
                                        <p className="profile-value-text">{patient?.email ? patient?.email : 'N/A' }</p>

                                        <span className="profile-label">SSN Number: </span>
                                        <p className="profile-value-text">{patient?.ssn ? patient?.ssn : 'N/A'}</p>                                 
                                    </div>

                                    <div className="col-md-4">    
                                        <span className="profile-label">Phone 1: </span>
                                        <p className="profile-value-text">{patient?.phone1 ? patient?.phone1 : 'N/A' }</p>
                                    </div>

                                    <br />
                                </div>

                                {/* RPM Consent */}
                                <div className="row-display">
                                        
                                        <Form>
                                            <Form.Check 
                                                type="switch"
                                                id="custom-switch"
                                                label="RPM Consent"
                                                style={{color: 'dodgerblue', fontSize: '14px'}}
                                                onClick={(event) => setRPMConsent(event.target.checked ? true : false)}
                                            />
                                        </Form>

                                        <button className="btn btn-danger btn-sm" onClick={() => setSmShow(true)}> Read RPM Consent</button>
                                    </div>
                                <br />


                                {/* RPM Consent */}
                                {RPMConsent === true ? <>
                                        <div >
                                        {patient?.block === false ? 
                                        <Fragment>
                                            <button 
                                            className="add-staff-btn" 
                                            onClick={AssignDeviceToPatient}
                                            >Assign Device</button>
                                        </Fragment>
                                        : 
                                        <Fragment>
                                            <small style={{ color: "red", marginBottom: "30px"}}>Cannot assigned device, {patient?.firstname} {patient?.lastname}'s account is de-activated.</small>
                                        </Fragment>    
                                    }
                                        
                                    </div>
                                    </> : ''}
                            </div>                             
                        </Fragment> }
                    </div>
                </div>    

                </> : <>
                <b>Device Assigned.</b> <br/>
                <small>This device is already assigned to Patient 
                <Link to={{ pathname: "/patientProfile", state: {patientid: deviceDetails?.assigned_patient_id?._id }}} className="link"> {deviceDetails?.assigned_patient_id?.firstname} {deviceDetails?.assigned_patient_id?.lastname}</Link>, 
                if you want to assign this device to other patient, first remove it from patient profile. 
                <Link to={{ pathname: "/printReceipt", state: {deviceAssigned: deviceDetails, patientDetails: patient }}} className="ml-3 mt-2">Print Receipt</Link>
                </small>
                <br />
                
                
                </>}
                 
            </div> 


            {/* RPM Consent Modal */}
            <Modal
                size="lg"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header>
                    <b>RPM <span style={{color: '#006762'}}>Consent</span></b>
                </Modal.Header>
                <Modal.Body>
                   <small>It is agreed to by both parties that reimbursement for medical billing services will be
                    paid by the client in the amount of $500 per month, or 6.0%, whichever is greater, if the 
                    number of clients the client has within a month period is less than three (3) patients. Should
                    the client’s number of patients services increase beyond three (3) patients, but less than six (6), 
                    then client shall by DULU $750 per month, or 6.0%, whichever is greater. <br/><br/>
                    Additionally, it is understood that as a part of this agreement, DULU shall provide credentialing
                    services for government and commercial health insurance. Whereas credentialing involves many parties
                     and movies parts. Provider credentialing requires organization verify the credentials of healthcare 
                     provides to ensure they have the required licenses, certifications, and skills to properly care for 
                     patients. Every health insurance company checks the credentials of a healthcare entity before it 
                     includes the entity as an in-network provider. In order to expedite the credentialing process, DULU 
                     will make all attempts to process paperless credentialing. Should DULU encounter costs that exceed the 
                     monthly agreed amount herein Exhibit A, DULU shall discuss these costs with the client to determine 
                     reimbursement. <br/><br/>
                     The agreement within his Exhibit A shall only be applicable for the duration of the first
                     three (3) months upon execution of this agreement. Where upon, the terms of Exhibit A will 
                     expire, and the Terms of this Agreement shall follow $3.2 of the medical services Agreement.
                     Should client’s patient base fail to meet at least five (5) patients within three (3) months,
                     an extension of the Exhibit A agreement may be granted on a month-to -month basis for up to 
                     six (6) months. Such execution of agreement shall be made in writing and signed by both parties
                     no later than the 10th day of each month, and the Agreement will form part of this entire Agreement.
                    </small>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default RPMDeviceBasicInformation
