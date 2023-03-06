    import React, {Fragment, useEffect, useState} from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Modal, Button, Image, Badge, Tabs, Tab } from 'react-bootstrap';
    import { Formik, Form } from 'formik';
    import TextField from '../../components/Form/TextField';
    import { carePlanOfPatient, hrTimeSpentOfCurrentMonth, hrTimeSpentOfCurrentMonthinCCMCategory, getTimeReport } from '../../actions/HRActions';
    import { getRemainingReadings} from '../../actions/adminActions';
    import moment from 'moment';
    import { ADDING_CARE_PLAN_RESET, ADDING_TIME_SPENT_RESET } from '../../constants/HRConstants';
    import patientProfileImg from '../../assets/Images/add-user.png';
    import systolicImg from '../../assets/Images/blood-pressure.png';
    import { useAlert } from 'react-alert';
    import { Link } from 'react-router-dom';
    import doctorIcon from '../../assets/Images/doctorIcon.png';
    import AddTimeManually from '../../components/HR/AddTimeManually';
    import RPMMinutesProgress from '../../components/HR/RPMMinutesProgress';
    import CCMMinutesProgress from '../../components/HR/CCMMinutesProgress';
    import notFound from '../../assets/Images/notFound.png';
    import PatientCCMConsent from '../../components/Patient/PatientCCMConsent';
    import PatientCareplans from '../../components/Patient/PatientCareplans';

    const HRPatientInfo = ({patient, telemetaryReadings}) => {
    let nurseRole = '';

    const dispatch = useDispatch();   
    const alert = useAlert();


    var check = moment(new Date(), 'YYYY/MM/DD');

    let month = check.format('M');
    month = Number(month)
    var year = check.format('YYYY');

    //  Careplan Fields
    const [carePlanShow ,setCarePlanShow] = useState(false);
    const [description, setDescription] = useState('');
    const [readingsInDay, setReadingsInDay] = useState('');
    const [readingsInNight, setReadingsInNight] = useState('');
    const [readingsPerMonth, setReadingsPerMonth] = useState('');
    const [fileName, setFileName] = useState({});
    const [minutesCategory, setMinutesCategory] = useState('RPM');

    const handleClose = () => setAddTimeShow(false);
    const handleShow = () => setAddTimeShow(true);
    const handleCarePlanModalClose = () => setCarePlanShow(false);
    const handleCarePlanModalShow = () => setCarePlanShow(true);
    const [addTimeShow, setAddTimeShow] = useState(false);

    const { careplan } = useSelector(state => state.careplan);
    const { totalTime } = useSelector(state => state.totalTimeSpent);
    const { totalTimeinCCM } = useSelector(state => state.totalTimeSpentInCCM);
    const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent);
    const { count } = useSelector(state => state.readingsCount);
    const {user} = useSelector(state => state.auth); 
    const {  targets} = useSelector(state => state.target);

    let hrId = user?._id;
    let patientid = patient?._id;
    let patientCCMNurse = patient?.assigned_ccm_nurse_id?._id;
    let patientRPMNurse = patient?.assigned_hr_id?._id;
    let IsCCM = patient?.isCCM;

    let startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().clone().endOf('month').format('YYYY-MM-DD');

        useEffect(() => {
        if(careplanerror){
            return alert.error(careplanerror);
        }

        
        if(isSuccessful) {
            setAddTimeShow(false);
            alert.success('Time added');
            dispatch({ type: ADDING_TIME_SPENT_RESET})
        }

        if(carePlanAdded){
        setCarePlanShow(false);
        alert.success('Care plan added');
        dispatch({ type: ADDING_CARE_PLAN_RESET });
        setDescription(''); 
        }

        // dispatch(getPatientCarePlan(patientid));
        dispatch(hrTimeSpentOfCurrentMonth(patientid, hrId, startDate, endDate));
        dispatch(hrTimeSpentOfCurrentMonthinCCMCategory(patientid, hrId, startDate, endDate));
        dispatch(getRemainingReadings(patientid));
        dispatch(getTimeReport(patientid, startDate, endDate));

        },[dispatch, careplanerror, isSuccessful, carePlanAdded]);



    let currMonthName  = moment().format('MMMM');
    let readingsThisMonth;
    let ReadingsperMonth; 

    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;

    const handleFileChange = e => {
        setFileName(e.target.files[0]);
    }



    const calculateNurseRole = () => {
        switch(true){
            case (patient?.assigned_hr_id?._id === hrId && patient?.assigned_ccm_nurse_id?._id !== hrId):
                nurseRole = 'RPM'
                break;
            
            case (patient?.assigned_ccm_nurse_id?._id === hrId && patient?.assigned_hr_id?._id !== hrId):
                nurseRole = 'CCM'
                break;
                
            case (patient?.assigned_hr_id?._id === hrId && patient?.assigned_ccm_nurse_id?._id === hrId):
                nurseRole = 'Both';
                break;
            
            default:
            break;
            } 
            // console.log('Nurse Role is ' + nurseRole);
        }

    const submitCarePlan = () => {
        if(description === '') {
            setCarePlanShow(false);
            alert.error('Description is required');
            return
        }

    dispatch(carePlanOfPatient(patientid, hrId, 
            description, 
            readingsPerMonth, 
            readingsInDay,
            readingsInNight, 
            fileName))
        }


        
        const sendEmail = (email) => {
            window.open(`mailto:${email}`)
        }

        let filteredReadings = calcTotalReadings();

        function calcTotalReadings() {
        return telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
            sum + 1, 0
        )
        }

    return (
        <>
        {calculateNurseRole()}
        <div className="row-display p-1">      
        <h5 style={{color: '#02C39A'}} className="mt-3">
             <strong>&nbsp;{patient?.firstname + ' ' + patient?.lastname}'s Profile </strong>
        </h5>
            

        <div className="row-display">    
            {careplan ? <Fragment>
                <div>
                    <button disabled className="btn btn-outline-danger mt-2"><small>Careplan Added</small></button>
                </div>
            </Fragment> : <Fragment>
                <div>
                    <button className="btn btn-outline-primary mt-2" onClick={handleCarePlanModalShow}>
                        <i className='bx bxs-paper-plane pr-2' ></i> 
                        Add RPM Careplan
                    </button>
                </div>    
            </Fragment>}

            <button className="btn btn-outline-primary ml-3 mt-2" onClick={handleShow}>
                 <i className='bx bx-time pr-2'> </i>
                 Add Time Manually</button>
            </div>
        </div>
        <hr />        

                {/* New Profile look starts from here */}
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card text-center">
                                <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />
                                <b className="mt-3">{patient?.firstname} {patient?.lastname}  </b>
                                <span><small>{patient?._id}</small></span>
                                <Link to="/Nurse/Patient/Profile" className="link" style={{marginLeft: "10%", fontSize: "14px", marginTop: "7px"}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>
                                <span style={{padding: '5px', color: "#222"}}><small>Age: {moment().diff(moment(patient?.DOB).format("ll"), 'years')} yrs</small></span>
                                <br/>
                            </div>

                            {/* Consent Program */}
                            <br/>
                            <div className="card text-center p-1">
                                <b>You are authorize to do</b>  
                                <h3 style={{color: '#02C39A'}}>
                                {patient?.assigned_hr_id?._id === hrId && patient?.assigned_ccm_nurse_id?._id !== hrId ? <b>RPM</b> : 
                                    patient?.assigned_ccm_nurse_id?._id === hrId && patient?.assigned_hr_id?._id !== hrId ? <b>CCM</b> : 
                                    patient?.assigned_hr_id?._id === hrId && patient?.assigned_ccm_nurse_id?._id === hrId ? <b>RPM, CCM</b> : 
                                null }
                                </h3>
                                <b>for this patient</b>
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
                                        <small>{moment(patient?.DOB).format('LL')}</small>
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

                        {/* second column starts from here */}

                        <div className="col-md-6">
                            <div className="row-display">
                                {nurseRole === 'RPM' || nurseRole === 'Both' ? <>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-3 text-center" style={{backgroundColor: '#02C39A'}}>
                                            <h3 className="text-white pt-2"> {totalTime} </h3>
                                        </div>
                                        <div className="col-7 text-center mt-2">
                                            <small>Minutes added in <b>{currMonthName}</b>   in RPM</small>
                                        </div>
                                    </div>
                                </div>
                                </> : null}


                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
                              {nurseRole === 'CCM' || nurseRole === 'Both' ? <>
                              <div className="card">
                                <div className="row">
                                        <div className="col-3 text-center" style={{backgroundColor: '#02C39A'}}>
                                            <h3 className="text-white pt-2"> {totalTimeinCCM} </h3>
                                        </div>
                                        <div className="col-7 text-center mt-2">
                                            <small>Minutes added in <b>{currMonthName}</b> in CCM </small>
                                        </div>
                                    </div>
                                </div>       
                              </> : null }

                            </div>    
                            <br />        

                            <div className="card">
                                <span className="text-center mt-3"> <small>{patient?.address}, {patient?.city} - {patient?.line2} - {patient?.city}, {patient?.state} - {patient?.zipCode} </small></span>
                                <hr />

                                <div className="row">
                                {/* Devices Details */}

                            {nurseRole === 'RPM' || nurseRole === 'Both' ? <>
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
                                    </div>
                                ))}
                            </div>            
                            </> : <div className="col-6 text-center" style={{borderRightWidth: '2px', borderRightStyle: 'solid', borderRightColor: '#F1F1FA'}}>
                                </div>
                            }            
                            
                            <div className="col-6">
                                {/* Assigned Doctor Nurse */}
                                <div className="text-center">
                                            <span className="text-center"><b>Assigned Doctor</b>
                                            {patient?.assigned_doctor_id ? <>
                                            <div>
                                                <img src={doctorIcon} alt="patientProfile" style={{width:'60px', height:'60px'}}/>    
                                                    <p className="pt-2 m-1">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                                    <small><b>Role: </b> Doctor</small>
                                            </div>
                                            </> : <p>
                                                <small className="tect-center mt-2"> No Doctor Assigned Yet</small>
                                            </p> }
                                            </span>
                                        
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <br/>
                    {/* Avg B.P and reent readings section */}
                    {nurseRole === 'RPM' || nurseRole === 'Both' ? <>
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
                        </div>


                        {/* third column */}
                        <div className="col-md-3">
                        <div>
                            <div className="card monthly-target-card p-2">
                            <span style={{color: '#FFF'}}>Monthly Target ( {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} )</span>
                       <hr className="white-hr"/>
                       
                       {nurseRole === 'Both' ? <>
                           <select className="form-control" value={minutesCategory} onChange={e => setMinutesCategory(e.target.value)}>
                           <option value="RPM">RPM Category</option>
                           <option value="CCM">CCM Category</option>
                       </select> 
                       <hr className="white-hr"/>
                       
                       </> : null }
                      
                       {nurseRole === 'RPM' ? <RPMMinutesProgress count={count} totalTime={totalTime} />
                        : nurseRole === 'CCM' ?  <CCMMinutesProgress totalTimeinCCM={totalTimeinCCM} />
                        : nurseRole === 'Both' ? 
                            <>
                            {minutesCategory === 'RPM' ? <RPMMinutesProgress count={count} totalTime={totalTime} /> 
                            : 
                            <CCMMinutesProgress totalTimeinCCM={totalTimeinCCM} />
                            }
                            </>
                        : null 
                        }
                        </div>
                        </div>

                        {/* Careplans && Consents*/}
                        
                        <br/>
                        {nurseRole === 'CCM' || nurseRole === 'Both' ? <>
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
                                <PatientCCMConsent patientId={patient?._id} isNurse={true} />
                            </Tab>
                        </Tabs>
                        </div>
                        </> : null }
                    </div>
                </div>
            </div>



            {/* Careplan Modal */}
            <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
            <Modal.Header >
                <Modal.Title>Add Careplan</Modal.Title> 
                <Button variant="danger" onClick={handleCarePlanModalClose}><i className='bx bx-x'></i></Button>
            </Modal.Header>

                <Modal.Body>
                    <Formik initialValues={{
                        description: '', 
                        readingsPerMonth:'',
                        readingsPerDay: '',
                        fileName: ''

                    }}
                    onSubmit={values => {
                        submitCarePlan(values)
                    }}
                    >
                    { formik => (
                        <div>
                            <Form>                            
                                <TextField 
                                    label="Readings / mo" 
                                    name="readingsPerMonth" 
                                    type="number" 
                                    placeholder="Readings / mo"
                                    value={readingsPerMonth} 
                                    onChange={(e) => setReadingsPerMonth(e.target.value)}
                                />

                                <TextField 
                                    label="Reading in Morning" 
                                    name="readingsInSlot1" 
                                    type="number" 
                                    placeholder="Readings / day"
                                    value={readingsInDay} 
                                    onChange={(e) => setReadingsInDay(e.target.value)}
                                />

                                <TextField 
                                    label="Reading in Night" 
                                    name="readingsInSlot2" 
                                    type="number" 
                                    placeholder="Readings / day"
                                    value={readingsInNight} 
                                    onChange={(e) => setReadingsInNight(e.target.value)}
                                />

                            <label htmlFor="description" className="form-label mt-3">Description</label>
                                <textarea 
                                    label="Description" 
                                    name="description"
                                    className="form-control"
                                    rows="4"	
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type description here .... "
                            />

                                <input 
                                    label="File" 
                                    name="fileName" 
                                    type="file"
                                    accept=".doc, .docx, .pdf"
                                    className="form-control"
                                    style={{border: 'none'}} 
                                    onChange={handleFileChange}
                                />
                            <br/>
                            <div className="row-class" style={{justifyContent: 'space-between'}}>
                                <button className="reset-btn ml-3" type="submit"> Submit</button>
                            </div>
                            </Form>
                        </div>
                    )}   
                    </Formik>   
                </Modal.Body>
            </Modal>
            {/* Careplan Modal ends here*/}

            {/* Time spent Modal */}
            <Modal size="md" show={addTimeShow} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Add Time Manually</Modal.Title> 
                <Button variant="danger" onClick={handleClose}><i className='bx bx-x'></i></Button>
            </Modal.Header>

                <Modal.Body>
                    <AddTimeManually 
                        totalTime={totalTime} 
                        hrId={hrId} 
                        patientId={patientid} 
                        patientCCM={IsCCM} 
                        patientCCMNurse={patientCCMNurse}
                        patientRPMNurse={patientRPMNurse}
                        />   
                </Modal.Body>
            </Modal>
            {/* Time spent Modal ended here */}
        </>
    )
    }

    export default HRPatientInfo