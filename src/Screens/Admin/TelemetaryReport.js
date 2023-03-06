import React, {useState, useEffect, useRef} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { Image, Badge, Form } from 'react-bootstrap';
import MetaData from '../../layouts/MetaData';
import { getPatients, getPatientTelemetaryReport  } from '../../actions/adminActions';
import Select from 'react-select';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import MyDocument from '../../components/MyDocument';
import { GET_DOCTOR_TELEMETARY_REPORT_RESET } from '../../constants/adminConstants';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import PatientProfileGraph from '../../components/PatientProfileGraph';
import patientProfileImg from '../../assets/Images/doctorIcon.png';


const TelemetaryReport = () => {
    let color;
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        pageStyle:"A5",
        documentTitle:`Telemetary_Report ` + moment().tz("America/New_York").format("MM/DD/YYYY"),
        content: () => componentRef.current,
    });

    const alert = useAlert();
    const [patientId, setPatientId] = useState("");
    const [startDate, setStartDate] = useState(moment().clone().startOf('month').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().clone().endOf('month').format('YYYY-MM-DD'));
    const [withNotes, setWithNotes] = useState(true);

    const { error, patients} = useSelector(state => state.admin);
    const {loading, telemetaryReport} = useSelector(state => state.telemetaryReport);


    const dispatch = useDispatch();

    useEffect(() => {
        if(error){
            alert.error(error);
        }
        
        dispatch(getPatients());
        
    }, [dispatch]);

    const options = []
    patients && patients.map((patient) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")})
    ))


    const getPatientProfile = (patient) => {    
        setPatientId(patient.value);
    }

    const resetReport = () => {
        dispatch({
            type: GET_DOCTOR_TELEMETARY_REPORT_RESET
        })
    } 

    const generateReportByPatient = () => {
        if(!patientId) {
            alert.error('Please select patient');
            return;
        } else if(!startDate) {
            alert.error('Please select start Date');
            return;
        } else if(!endDate) {
            alert.error('Please select end Date');
            return;
        } else {
            dispatch(getPatientTelemetaryReport(patientId, startDate, endDate));
        }
    }

    let filteredReadings = calcTotalReadings();

    function calcTotalReadings() {
       return telemetaryReport && telemetaryReport.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
        sum + 1, 0
      )
    }

    let sysBPCategory; //variable to store category of BP

    function calcSysBpCategory(sys) {
        switch(true){
            case (sys > 210):
                sysBPCategory = "Hypertension- stage 4"
                color = '#FE0004'
                break;
            case (sys >= 180 && sys <= 210):
                sysBPCategory = "Hypertension-Stage 3"
                color = '#FE504F'
                break;
            case (sys >= 160 && sys <= 179):
                sysBPCategory = "Hypertension-Stage 2"
               color = '#FE504F'
            break;
            case (sys >= 140 && sys <= 159):
                sysBPCategory = "Hypertension-Stage 1"
                color = '#FF32CB'
            break;
            case (sys >= 130 && sys <= 139):
                sysBPCategory = "Pre-hypertension"
                color = '#FFFF00'
            break;
            case (sys >= 121 && sys <= 129):
                sysBPCategory = "High Normal B.P"
                color = '#CBFE33'
            break;
            case (sys >= 100 && sys <= 120):
                sysBPCategory = "Normal Blood Pressure"
                color = '#00FF99'
            break;
            case (sys >= 90 && sys <= 99):
                sysBPCategory = "Low Normal B.P"
                color = '#CDFFCC'
            break;
            case (sys >= 70 && sys <= 89):
                sysBPCategory = "Low Blood Pressure"
                color = '#DEEAF6'
            break;
            case (sys >= 50 && sys <= 69):
                sysBPCategory = "Too Low Blood Pressure"
                color = '#9CC3E4'
            break;
            case (sys < 50):
                sysBPCategory = "Extremely Low B.P"
                color = '#2E73B4'
            break;
            default:
                sysBPCategory = "Invalid B.P"
                color = '000'
            } 
        }

    let diaBpCategory;

    function calcDiaBpCategory(dia) {
        switch(true){
            case (dia > 120):
                diaBpCategory = "Hypertension- stage 4"
                color = '#FE0004'
                break;

            case (dia >= 110 && dia <= 120):
                diaBpCategory = "Hypertension-Stage 3"
                color = '#FE504F'
                break;

            case (dia >= 100 && dia <= 109):
                diaBpCategory = "Hypertension-Stage 2"
                color = '#FE504F'
                break;

            case (dia >= 90 && dia <= 99):
                diaBpCategory = "Hypertension-Stage 1"
                color = '#FF32CB'
                break;
                
            case (dia >= 130 && dia <= 139):
                diaBpCategory = "Pre-hypertension"
                color = '#FFFF00'
                break;

            case (dia >= 85 && dia <= 89):
                diaBpCategory = "High Normal B.P"
                color = '#CBFE33'
                break;

            case (dia >= 81 && dia <= 84):
                diaBpCategory = "High Normal Blood Pressure"
                color = '#00FF99'
                break;

            case (dia >= 65 && dia <= 80):
                diaBpCategory = "Normal Blood Pressure"
                color = '#00FF99'
                break;
            
            case (dia >= 60 && dia <= 64):
                diaBpCategory = "Low Normal B.P"
                color = '#CDFFCC'
                break;

            case (dia >= 40 && dia <= 59):
                diaBpCategory = "Low Blood Pressure"
                color = '#DEEAF6'
            break;
            case (dia >= 35 && dia <= 39):
                diaBpCategory = "Too Low Blood Pressure"
                color = '#9CC3E4'
            break;
            case (dia < 35):
                diaBpCategory = "Extremely Low B.P"
                color = '#2E73B4'
            break;
            default:
                diaBpCategory = "Invalid B.P"
                color = '#000'
            } 
        }

  return (
    <>
        <MetaData title="Telemetary Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

                <h5 className="pt-2 mt-2">Telemetary Data<span style={{color: '#02C39A'}}> Report </span></h5>
                <hr />

                <div>
                <span className="notes-header"><b>Note: </b> Please select patient, start date and end date to generate report.</span>

                <div className="row-display mt-4">    
                    <div className="col-md-3">
                        <b>Select Patient <span style={{color: 'red'}}> *</span> </b>
                        <Select
                            options={options}
                            onChange={getPatientProfile}
                            className="react-selectbox"
                        />
                    </div>

                    <div className="col-md-3">
                        <b>From  <span style={{color: 'red'}}> *</span>  </b>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                            max={moment().format("YYYY-MM-DD")}
                            className="form-control" placeholder="From"/>
                    </div>

                    <div className="col-md-3">
                        <b>To <span style={{color: 'red'}}> *</span></b>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                            max={moment().format("YYYY-MM-DD")} 
                            className="form-control" placeholder="To"/> 
                    </div>

                    <div className="col-md-3 mt-4">
                        <button className="btn btn-outline-primary btn-sm" onClick={generateReportByPatient}>Generate Report</button>
                    </div>
                </div>
                
                </div>

                <hr />
                {telemetaryReport && telemetaryReport?.length > 0 ? <>
                    <div className="row-display">
                        <div>
                            <b> Generated Report Result: </b> 
                            <p>&nbsp;&nbsp;Total Results: {telemetaryReport?.length}</p> 
                        </div>

                        
                    <div className='row-display'>    
                        <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    

                        &nbsp;&nbsp;
                        <div>
                            <Form.Check 
                              checked={withNotes ? true : false}
                              onChange={() => setWithNotes(!withNotes)}
                              type="checkbox"
                              id="filterPts"
                              label="With Notes ?"
                              style={{fontWeight: 'bold'}}
                            />
                        </div>

                        &nbsp;&nbsp;
                        <div>    
                            <div style={{ display: "none" }}> 
                            <MyDocument healthData={telemetaryReport} startDate={startDate} endDate={endDate} ref={componentRef} withNotes={withNotes}/>
                            </div>

                            <button onClick={handlePrint} className="btn btn-outline-primary btn-sm"><i className='bx bxs-file-pdf ' style={{color:'#F40F02'}}></i> Download PDF {withNotes === true ? 'with notes' : 'without notes'}</button>
                        </div>
                    </div>
                </div>
                </> : null }
                

                {/* Report Result */}
                <br />
                {loading ? <Loader /> : <>
                   {telemetaryReport && telemetaryReport?.length > 0 ? <>

                    <div className="row">
                        <div className="col-md-8">
                            <PatientProfileGraph healthData={telemetaryReport} />
                        </div>

                        <div className="col-md-4">
                            <div className="row-display">
                                <div className="circularbox">
                                    <div className="percent">
                                    <svg>
                                            <circle cx="70" cy="70" r="50"></circle>
                                            <circle cx="70" cy="70" r="50"></circle>  
                                        </svg> 

                                        <div className="number">
                                    

                                        {telemetaryReport && telemetaryReport.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((total, devicedata) =>  
                                        (Number(total) + Number(devicedata?.telemetaryData?.sys) / filteredReadings).toFixed(), 0
                                        )}
                                        
                                        </div>
                                    </div>
                                    <p className="text-center">Avg. Systolic</p>
                                </div>

                        <div className="circularbox">
                            <div className="percent">
                               <svg>
                                    <circle cx="70" cy="70" r="50"></circle>
                                    <circle cx="70" cy="70" r="50"></circle>  
                                </svg> 

                                <div className="number">
                                {telemetaryReport && telemetaryReport.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((total, devicedata) =>  
                                   (Number(total) + Number(devicedata?.telemetaryData?.dia) / filteredReadings).toFixed(), 0
                                 )}
                                </div>
                            </div>
                            <p className="text-center">Avg. Diastolic</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    {telemetaryReport.filter(healthData => healthData?.deviceId?.deviceType === "bp").map((healthData, index) => ( <>
                        <div className="telemetary-card" key={index}>
                        <br />
                        <p>
                            Patient Name: <b>{healthData?.assigned_patient_id?.firstname} {healthData?.assigned_patient_id?.lastname}</b>
                        </p>
                        
                        <div className="row">
                            <div className="col-md-1">
                                <Image src={systolicImg} className="systolic-image" />    
                            </div>

                            {calcSysBpCategory(healthData?.telemetaryData?.sys)} 
                                
                            <div className="col-md-3">
                            <span className="profile-label">Systolic : {healthData?.telemetaryData?.sys} mmHG</span>
                                <br/>
                                <small><b>{sysBPCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>  
                            </div>

                            <div className="col-md-1">
                                <Image src={diastolicImg} className="systolic-image" />    
                            </div>

                            {calcDiaBpCategory(healthData?.telemetaryData?.dia)}

                            <div className="col-md-3">
                            <span className="profile-label">Diastolic : {healthData?.telemetaryData?.dia} mmHG</span>
                                <br/>
                                <small><b>{diaBpCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>
                            </div>

                            <div className="col-md-1">
                                <Image src={pulseImg} className="systolic-image" />    
                            </div>

                            <div className="col-md-2">
                                <span className="profile-label">Pulse : {healthData?.telemetaryData?.pul}</span>
                            </div>
                        </div> {/* First row ends here*/}    

                         {/* Device & Patient Info */}
                        <br />
                        <div className="row-display telemetary-patient-row pl-2 pr-2">
                                {/* <div className="col-md-7"> */}
                                    <span className="telemetary-patient-row">Device ID: </span>
                                    <span className="telemetary-patient-row"> {healthData?.deviceId?._id}</span>

                                    <span className="vl"></span>

                                    <span className="telemetary-patient-row ml-2">Device Type: </span>
                                    <span className="telemetary-patient-row"> <Badge bg="info text-white">{healthData?.deviceId?.deviceType}</Badge></span>

                                    <span className="vl"></span>

                                    <span className="telemetary-patient-row ml-2">Reading Date: </span>
                                    {/* <span className="telemetary-patient-row"> {moment(healthData?.createdAt).tz("America/New_York").format("lll")}</span> */}
                                    <span className="telemetary-patient-row"> {healthData?.dateAdded}</span>
                            </div>

                            <div>
                                {healthData?.notes.map((note, index) => ( <div key={index}>
                                    <div className="row-display-secondary">
                                        <div className="mt-3 mr-3">
                                            <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                        </div>
                                        <div className="bubble bubble-alt">  
                                            
                                            <b className='text-white'>{note?.conclusion_hr_id ? (<span>{note?.conclusion_hr_id?.firstname}  {note?.conclusion_hr_id?.lastname}</span>) : (<span>
                                                {note?.conclusion_doctor_id?.firstname}  {note?.conclusion_doctor_id?.lastname}
                                            </span>)}</b><br/>
                                                                
                                            <p className="mt-1 mr-3">{note?.conclusion} <br/> 
                                            <p className="mt-1" style={{letterSpacing: '1px'}}>{moment(note?.dateTime).tz("America/New_York").format("MM/DD/YYYY hh:mm")}</p>
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                                ))}                         
                            </div>
                        </div>
                    </>))} 
                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>} 
                </>}
            </div>
        </div>
        </section>
    </>
  )
}

export default TelemetaryReport