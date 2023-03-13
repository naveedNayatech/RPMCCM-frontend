import React from 'react';
import logo from '../assets/Images/official_logo.png';
// import systolicImg from '../assets/Images/blood-pressure.png';
// import diastolicImg from '../assets/Images/diastolic.png';
// import pulseImg from '../assets/Images/pulse.png';
// import { Image } from 'react-bootstrap';
import moment from 'moment';
import patientProfileImg from '../assets/Images/doctorIcon.png';




export default class MyDocument extends React.PureComponent {
    render() {
         const { healthData } = this.props;
         const {startDate} = this.props;
         const {endDate} = this.props;
         const {withNotes} = this.props;

         let color;
         let filteredReadings = calcTotalReadings();

        function calcTotalReadings() {
            return healthData && healthData.filter(data => data?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
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
          <div>
          
            <div>
            <div className="container row-display">
                <img src={logo} width="270" height="110" alt="logo" />

                <div>
                    <p className="mt-4"><b>Date Printed: </b>  {moment().tz("America/New_York").format("MM/DD/YYYY")} </p>
                    <i>Generated By Admin</i> 
                </div>
            </div>
            <hr />

            <b>
                Telemetary Data Reports
                <p>{startDate} to {endDate}</p>
            </b>
            <br />

            <div style={{marginLeft: '60px', marginRight: '60px'}}>

            <h5 className="text-center" style={{color: '#8FBB2C'}}><b>Telemetary Result</b></h5>
            <br />


            <div className="row-display">
                <div>
                    <b> Patient Name : </b> {healthData[0]?.assigned_patient_id?.lastname}, {healthData[0]?.assigned_patient_id?.firstname}
                    <br />
                    <p><b> Patient Gender : </b> {healthData[0]?.assigned_patient_id?.gender} </p>
                </div>

                <div>
                    <div className="row-display">                        
                        <div className="circularbox">
                            <div className="percent">
                            <svg>
                                <circle cx="70" cy="70" r="50"></circle>
                                <circle cx="70" cy="70" r="50"></circle>  
                            </svg> 

                                <div className="number">
                                    {healthData && healthData.filter(data => data?.deviceId?.deviceType === "bp").reduce((total, devicedata) =>  
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
                        {healthData && healthData.filter(data => data?.deviceId?.deviceType === "bp").reduce((total, devicedata) =>  
                            (Number(total) + Number(devicedata?.telemetaryData?.dia) / filteredReadings).toFixed(), 0
                            )}
                        </div>
                    </div>
                    <p className="text-center">Avg. Diastolic</p>
                            </div>
                        </div>
                    </div>
                </div>

            
                    {healthData && healthData.map((data, index) => (
                        <>
                        <div className="telemetary-card" key={index}>
                        <p>
                            Patient Name: <b>{data?.assigned_patient_id?.firstname} {data?.assigned_patient_id?.lastname}</b>
                        </p>
                        
                        <div className="row-display">
                            {/* <div>
                                <Image src={systolicImg} className="systolic-image" />    
                            </div> */}

                            {calcSysBpCategory(data?.telemetaryData?.sys)} 
                                
                            <div>
                            <span className="profile-label">Systolic : {data?.telemetaryData?.sys} mmHG</span>
                                <br/>
                                <small><b>{sysBPCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>  
                            </div>

                            {/* <div>
                                <Image src={diastolicImg} className="systolic-image" />    
                            </div> */}

                            {calcDiaBpCategory(data?.telemetaryData?.dia)}

                            <div>
                            <span className="profile-label">Diastolic : {data?.telemetaryData?.dia} mmHG</span>
                                <br/>
                                <small><b>{diaBpCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>
                            </div>

                            {/* <div>
                                <Image src={pulseImg} className="systolic-image" />    
                            </div> */}

                            <div>
                                <span className="profile-label">Pulse : {data?.telemetaryData?.pul}</span>
                            </div>
                        </div> {/* First row ends here*/}

                         {/* Device & Patient Info */}
                        <br />
                        <div className="row-display telemetary-patient-row pl-2 pr-2">
                            <div>
                                <span className="telemetary-patient-row">Device ID: </span>
                                <span className="ml-2"> {data?.deviceId?._id}</span>
                            </div>

                            <div>
                                <span className="telemetary-patient-row ml-2">Device Type: </span>
                                <span className="ml-2">{data?.deviceId?.deviceType}</span>
                            </div>

                            <div>
                                <span className="telemetary-patient-row ml-2">Reading Date: </span>
                                <span className="ml-2"> {data?.dateAdded}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        {withNotes === true && <>
                            {data?.notes.map((note, index) => ( <div key={index}>
                            <div className="row-display-secondary">
                                <div className="mt-3 mr-3">
                                    <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                </div>
                                <div>  
                                    
                                    <b>{note?.conclusion_hr_id ? (<span>{note?.conclusion_hr_id?.firstname}  {note?.conclusion_hr_id?.lastname}</span>) : (<span>
                                        {note?.conclusion_doctor_id?.firstname}  {note?.conclusion_doctor_id?.lastname}
                                    </span>)}</b><br/>
                                                        
                                    <p className="mt-1 mr-3">{note?.conclusion} <br/> 
                                    <p className="mt-1" style={{letterSpacing: '1px'}}>{moment(note?.dateTime).tz("America/New_York").format("MM/DD/YYYY hh:mm")}</p>
                                    </p>
                                </div>
                            </div>
                        </div> 
                        ))}
                        </>}                         
                    </div>


                    <hr />
                    <div style={{float: "right"}}>
                        <small><b>Record {index + 1} of {healthData?.length}</b></small>
                    </div>
                    </>
                ))}
           </div>            
         </div>
        </div>
      )
    }
  }