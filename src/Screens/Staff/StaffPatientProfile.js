import React, {Fragment, useEffect, useState} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import {useSelector, useDispatch} from 'react-redux';
import { patientProfile, getPatientTelemetryData, getRemainingReadings, sortTelemetartData} from '../../actions/adminActions';
import { getPatientCarePlan } from '../../actions/HRActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData';
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import moment from 'moment';
import { COMMENT_RESET } from '../../constants/HRConstants';
import { Badge, Tab, Row, Col, Nav, Image } from 'react-bootstrap';
import systolicImg from '../../assets/Images/blood-pressure.png';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import PatientProfileGraph from '../../components/PatientProfileGraph';
import { Link } from 'react-router-dom';

const StaffPatientProfile = (props) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    let patientid = props?.location?.state?.patientid;
    let readingmonth;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { commentSuccess} = useSelector(state => state.comments);
    const { deviceData, Count } = useSelector(state => state.deviceData);
    const { isAuthenticated} = useSelector(state => state.auth);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);

    const [readingPerPage, setReadingsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, sortBy] = useState(-1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [accordion, setAccordion] = useState(false);

    useEffect(() => {
        if(isAuthenticated === false) {
			props?.history?.push("/login");
		}

        if(error){
            return alert.error(error);
        }


        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort));
        dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        
        if(commentSuccess) {
            alert.success('Comment added');
            dispatch({ type: COMMENT_RESET });
            dispatch(patientProfile(patientid));
            dispatch(getPatientTelemetryData(patientid))
        }

        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated, commentSuccess, currentPage, sort]);


    function setCurrentPageNumber(currentPage) {
        setCurrentPage(currentPage);
    }

    let readingsThisMonth;
    let ReadingsperMonth; 
 
    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;

    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort));
        dispatch(getPatientCarePlan(patientid));
        setStartDate('');
        setEndDate('');
        // setSort('')
    }

    const sortPatientTelemetaryData = () => {
        dispatch(sortTelemetartData(patientid, startDate, endDate, readingPerPage, currentPage));
    }

    const sendEmail = (email) => {
        window.open(`mailto:${email}`)
    }

    return (
        <Fragment>
           <MetaData title="Patient Profile"/>

                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />
                
                {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">    

                            {patient && <Fragment>
                            <div className="row">
                                <div className="col-md-10">
                                    <h5 className="pt-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#8FBB2C'}}> Details </span></h5>
                                </div>
                                </div>
                            <hr />

                                <div className="row">
                                <div className="col-md-3">
                                        <div>
                                            <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                                            
                                                <p className="patient-profile-name" style={{fontWeight: 'bold'}}>{patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                <Link className="link" style={{marginLeft: "10%"}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>
                                                    <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>
                                                </Fragment>
                                        </div>   
                                    </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Address</span>                                 
                                             <hr />

                                             <span className="profile-label">Address: </span>
                                             <p className="patient-profile-card-text">{patient?.address}, {patient?.city}</p>

                                             <span className="profile-label">Line 2: </span>
                                             <p className="patient-profile-card-text">{patient?.line2}</p>

                                             <span className="profile-label">City, State & Zipcode: </span>
                                             <p className="patient-profile-card-text">{patient?.city}, {patient?.state} - {patient?.zipCode}</p>
                                    </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Contact Information</span>                                 
                                             <hr />

                                             <span className="profile-label">Primary Phone </span>
                                             <p className="patient-profile-card-text">{patient?.phone1 ? patient?.phone1 : 'N/A'}</p>

                                             <span className="profile-label">Mobile No </span>
                                             <p className="patient-profile-card-text">{patient?.mobileNo ? patient?.mobileNo : 'N/A' } </p>
                                    </div>

                                    <div className="col-md-3 ">
                                            <span className="patient-profile-col-heading">Patient Analytics</span>                                 
                                             <hr />

                                             <div className="patient-profile-data-div">
                                                 <p style={{fontSize: 14}} className="text-center mt-2">RPM Consent : </p>
                                                <span className="check-icon mt-2">{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</span>
                                            </div>

                                            {careplan ? <>
                                                        <div className="patient-profile-data-div mt-2">
                                                    <p style={{fontSize: 14}} className="text-center mt-2">Readings /mo : </p>
                                                    <span className="check-icon mt-2">{careplan?.data?.readingsPerMonth}</span>
                                                    </div>
                                                    </> : ''}
                                                    
                                            {careplan ? <>
                                                        <div className="patient-profile-data-div mt-2">
                                                            <p style={{fontSize: 14}} className="text-center mt-2">Remaining : </p>
                                                            
                                                            <span className="check-icon mt-2">{ReadingsperMonth - readingsThisMonth}</span>
                                                        </div>
                                                    </> : ''}


                                            <div className="patient-profile-data-div mt-2">
                                                <p style={{fontSize: 14}} className="text-center mt-2">Initial Month : </p>
                                                <span className="check-icon mt-2">{patient?.initialsetup ? patient?.initialsetup : 'N/A'}</span>
                                            </div>   
                                                
                                    </div>
                                </div>

                                 <br />   
                                <div className="row">
                                <div className="col-md-3">
                                <span className="patient-profile-col-heading">Physician Information</span>
                                <hr />
                                {patient?.assigned_doctor_id ? <>
                                    <span className="profile-label">Dr Name</span>
                                    <p className="patient-profile-card-text">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                </> : <>
                                    <span className="profile-label">Doctor Not Assigned Yet</span>
                                </>}
                    
                                <br />
                                    {patient?.assigned_hr_id ? <>
                                        <span className="profile-label">HR Name</span>
                                        <p className="patient-profile-card-text">Hr. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                                    </> : <>
                                        <span className="profile-label">HR Not Assigned Yet</span>
                                    </>}
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Devices Assigned</span>                                 
                                        <hr />
                                        {patient?.assigned_devices && patient?.assigned_devices.length === 0 ? <Fragment>
                                            <b>No Device Assigned Yet</b>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <div key={index}>
                                                <p><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge></p>
                                                </div>
                                            ))}           
                                        </Fragment>}             
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Assign Device</span>                                 
                                    <hr />
                                    {/* Assign a device */}
                                    <span className="profile-label">Not Authorized</span> 
                                    
                                </div>

                                    <div className="col-md-3">
                                        <span className="patient-profile-col-heading">Telemetary Readings (Last 5)</span>                                 
                                        <hr /> 
                                        {deviceData && deviceData.length > 0 ? <>
                                            {deviceData && deviceData.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,5).map((devicedata, index) => (
                                                <div key={index} className="row-display mt-2" >
                                                    {devicedata.telemetaryData?.sys && devicedata.telemetaryData?.dia !== undefined ? <>
                                                    <Image src={systolicImg} style={{width: '20px', height: '20px'}} /> 
                                                        {devicedata?.telemetaryData?.sys} / {devicedata?.telemetaryData?.dia} 
                                                    <small> {moment(devicedata?.createdAt).tz("America/New_York").format("lll")}</small>
                                                    </> : " "}
                                                </div>
                                            ))}
                                        </> : 'N/A' }
                                        
                                    </div>

                                  </div> {/* row ends here */}

                        {/* Patient Telemetary Data */}
                        {deviceData && deviceData.length > 0 ? <Fragment>
                        <br/><br/>
                        <div className="col-md-3">
                            <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#8FBB2C'}}> ( {Count} ) </span></h5>
                        </div>

                        <div className="row-display patient-profile-col-heading" style={{ 
                                padding: 10,
                                borderRadius: '10px'
                                }}> 
                            
                            <div style={{width: '30%'}}>
                            <label>To: </label>
                              <input 
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                                />
                            </div>
                            
                            &nbsp;&nbsp;
                            <div style={{width: '30%'}}>                            
                            <label>From: </label>
                              <input 
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                             />
                             </div>
                            
                             &nbsp;&nbsp;
                             <div style={{width: '30%'}}>                            
                                <label>Sort By: </label>
                                    <select 
                                    value={sort}
                                    onChange={e => sortBy(e.target.value)}
                                    className="form-control">
                                        <option value="-1">Descending (last to first)</option>
                                        <option value="1">Ascending (first to last)</option>
                                    </select>
                             </div>
                            
                            &nbsp;&nbsp;
                             <div> 
                                 <label>Search</label>
                                    <button 
                                        className="btn add-staff-btn"
                                        onClick={sortPatientTelemetaryData}>Search
                                    </button>    
                            </div>

                            <div> 
                                 <label>Reset</label>
                                    <button
                                        onClick={refreshHandler} 
                                        className="btn add-staff-btn">Reset
                                    </button>    
                            </div>
                            </div>

                        <br /><br />


                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={12}>
                                    <Nav variant="pills" className="flex-row">
                                        <Nav.Item style={{cursor: 'pointer'}}>
                                        <Nav.Link eventKey="first">BP Monitor Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item style={{cursor: 'pointer'}}>
                                        <Nav.Link eventKey="second">Weight Scale Monitor</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>

                        {/* Accordion for graphical representation */}
                        <div className="container graphWrapper">
                            <button className="accordion" onClick={() => setAccordion(accordion => !accordion)}>
                                Show Graphically
                                <i className={accordion ? `bx bx-minus` : `bx bx-plus`}></i>
                            </button>

                            {accordion === true ? <div className="panel">
                                <PatientProfileGraph healthData={deviceData} />
                            </div> : ""}
                        </div>
                        {/* Accordion for graphical representation ends here */}
                        

                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp').map((devicedata, index) => (
                                    <div key={index}>
                                        <CuffTelemetaryData healthData={devicedata} count={Count} readingsPerPage={readingPerPage} currentPage={currentPage} isAdmin={false} />
                                    </div>
                                ))}

                                    {/* Pagination */}
                                    {readingPerPage <= Count && (
                                        <div className="d-flex justify-content-center mt-5"> 
                                        <Pagination activePage={currentPage} 
                                        itemsCountPerPage={readingPerPage} 
                                        totalItemsCount = {Count}
                                        onChange={setCurrentPageNumber} 
                                        nextPageText = {'⟩'}
                                        prevPageText = {'⟨'}
                                        firstPageText = {'«'}
                                        lastPageText = {'»'}
                                        itemClass='page-item'
                                        linkClass="page-link"
                                        />           
                                    </div>
                                    )} 
                                    </Tab.Pane>
        

                                        <Tab.Pane eventKey="second">
                                        {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'weight').map((devicedata, index) => (
                                            <div key={index}>
                                                <WeightTelemetaryData healthData={devicedata} count={Count} isAdmin={false} />
                                            </div>
                                        ))}
                                        </Tab.Pane>
                                    </Tab.Content>
                                    </Col>
                                  </Row>
                                </Tab.Container>
                                </Fragment> : <small className="text-center" style={{color: 'gray', marginLeft: '350px'}}>No telemetary data found <button className="btn btn-link" onClick={refreshHandler}>Refresh List</button></small>}
                                </Fragment> }
                            </div>

                            </div>
                           </div>
                         </Fragment> 
                         }
                </section>
        </Fragment>
    )
}

export default StaffPatientProfile
