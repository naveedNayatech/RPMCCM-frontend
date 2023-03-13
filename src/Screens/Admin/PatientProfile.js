import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData'; 
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import Spo2Data from '../../components/Patient/Spo2Data';
import PatientInfo from '../../components/Patient/PatientInfo';
import { patientProfile, getRemainingReadings, getPatientTelemetryData, sortTelemetartData} from '../../actions/adminActions';
// import { getPatientCarePlan } from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Tab, Row, Col, Nav, Image, Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from 'react-js-pagination';
import PatientProfileGraph from '../../components/PatientProfileGraph';
import CCMMinutesSpent from '../../components/HR/CCMMinutesSpent';



const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    let patientid = props?.location?.state?.patientid;
    let batterySignalStatus = props?.location?.state?.batterySignalStatus;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { deviceData, Count } = useSelector(state => state.deviceData);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);


    const [accordion, setAccordion] = useState(false);
    const [readingPerPage, setReadingsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, sortBy] = useState(-1);
    const [smShow, setSmShow] = useState(false); //charts modal
    const [imageToShow, setImageToShow] = useState();

    const [view, setView] = useState('consent');

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort));
        
        
        // dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        
        
        if(isUpdated) {
            alert.success('Updated Successfully'); 
        }

    }, [dispatch, alert, error, isUpdated, currentPage, sort]);

    const sortPatientTelemetaryData = () => {
        dispatch(sortTelemetartData(patientid, startDate, endDate, readingPerPage, currentPage));
    }
    
    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
        // dispatch(getPatientCarePlan(patientid));
        setStartDate('');
        setEndDate('');
        // setSort('')
    }

    
    let readingsThisMonth;
    let ReadingsperMonth; 
 
    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;
    
    function setCurrentPageNumber(currentPage) {
        setCurrentPage(currentPage);
    }

    return (
        <Fragment>
            <MetaData title={ patient?.firstname +' '+ patient?.lastname }/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />
                
                {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">    

                            {patient && <Fragment>
                                {/* Patient Info Component */}
                                <PatientInfo 
                                    patient={patient}
                                    count={count}
                                    telemetaryReadings={deviceData}
                                    patientid={patientid}
                                    batterySignal={batterySignalStatus}
                                />

                        <br/>
                        {patient?.patientType === 'Both' ? <>
                            <div className="container">        
                                <select 
                                    name="selectRole" 
                                    className="form-control" 
                                    style={{width: '250px', float: 'right'}}
                                    value={view}
                                    onChange={e => setView(e.target.value)}
                                >
                                    <option value="select">Select</option>   
                                    <option value="showTelemetary">Show Telemetary Data</option>
                                    <option value="showCCMMinutes">Show CCM Minutes</option>  
                                </select>        
                            </div>
                        </> : null}

                        {patient?.patientType === 'RPM' || view === "showTelemetary" ? <>    
                            
                            {deviceData && deviceData.length > 0 ? <Fragment>
                            <br/><br/>

                            {/* <div className="row-display">
                                <button className="btn btn-link" onClick={refreshHandler}>Refresh Telemetary Data</button>
                            </div> */}
                            
                            
                            {/* Charts for determination exit */}
                            {/* <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#8FBB2C'}}>(Total Readings: {Count}) </span></h5> */}
                            <b className="mt-3">Search Telemetary Data</b>

                            <div className="row-display mt-3"> 
                            <div style={{width: '30%'}}>
                            <b>To: </b>
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
                            <b>From: </b>
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
                                <b>Sort By: </b>
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
                                <button 
                                    className="btn btn-outline-primary mt-4"
                                    onClick={sortPatientTelemetaryData}>Search
                                </button>    
                            </div>
                            &nbsp;

                            <div> 
                                <button
                                    onClick={refreshHandler} 
                                    className="btn btn-outline-primary mt-4"
                                    >
                                    <i className='bx bx-reset'></i>
                                </button>    
                            </div>
                            </div>
                        <br /><br />
                    
                             
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={9}>
                            <Nav variant="pills" className="flex-row">
                                <Nav.Item style={{cursor: 'pointer'}}>
                                <Nav.Link eventKey="first">BP Monitor Data </Nav.Link>
                                </Nav.Item>
                                <Nav.Item style={{cursor: 'pointer'}}>
                                <Nav.Link eventKey="second">Weight Scale Monitor </Nav.Link>
                                </Nav.Item>
                                <Nav.Item style={{cursor: 'pointer'}}>
                                <Nav.Link eventKey="third">Spo2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col sm={3}>
                            {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp') ? <>
                            <div className="container graphWrapper">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => setAccordion(accordion => !accordion)}>
                                    Show Graphically &nbsp;&nbsp;&nbsp;
                                    <i className={accordion ? `bx bx-minus` : `bx bx-plus`}></i>
                                </button>
                            </div> 
                            </> : <></> }
                        </Col>

                        <Col sm={12}>
                            {accordion === true ? <div className="panel">
                                <PatientProfileGraph healthData={deviceData} />
                            </div> : ""}
                        </Col>    
                        
                        {/* Accordion for graphical representation */}
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp').map((cuffData, index) => (
                                        <div key={index}>
                                            <CuffTelemetaryData healthData={cuffData} count={Count} readingsPerPage={readingPerPage} currentPage={currentPage} isAdmin={true} />
                                        </div>
                                ))}
                                

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
                                
                                {/* Pagination */}
                                
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                   
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'weight').map((weightData, index) => (
                                    <div key={index}>
                                         <Fragment>
                                            <WeightTelemetaryData healthData={weightData} count={Count} isAdmin={true} />
                                        </Fragment>   
                                    </div>
                                ))}
                                
                                </Tab.Pane>

                                <Tab.Pane eventKey="third">
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'spO2').map((spo2data, index) => (
                                    <div key={index}>
                                         <Fragment>
                                            <Spo2Data healthData={spo2data} count={Count} isAdmin={true} />
                                        </Fragment>   
                                    </div>
                                ))}

                                
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                    </Row>

                    </Tab.Container>
                    
                    </Fragment> : <small className="text-center" style={{color: 'gray', marginLeft: '350px'}}>
                        No telemetary data found 
                    <button className="btn btn-link" onClick={refreshHandler}>Refresh List</button>
                    </small>}
                    </> : <>
                        <br />
                        <CCMMinutesSpent
                            patientId={patientid}
                        />
                    </> }
                    </Fragment> }
                    
                       
                </div>
                
                <br /><br />
            </div>                           
        </div>
    </Fragment> 
    }         
    </section>
    
    <Modal
        size="md"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
    >
        <Modal.Body>
            <Image src={imageToShow} className="determinationChartsImages" /> 
        </Modal.Body>
    </Modal>

    </Fragment>
    )
}

export default PatientProfile
