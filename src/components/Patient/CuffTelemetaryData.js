import React, { useState, Fragment } from 'react';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Image, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { commentOnReading, commentOnReadingByStaff } from '../../actions/HRActions';
import { useAlert } from 'react-alert';
import patientProfileImg from '../../assets/Images/doctorIcon.png';
import { Link } from 'react-router-dom';

const moment = require('moment-timezone');

const CuffTelemetaryData = ({ healthData, isAdmin}) => {
    let color;
    const  dispatch = useDispatch();
    const alert = useAlert();

    const { user} = useSelector(state => state.auth);

    let telemetaryData = healthData?.telemetaryData;
    let deviceDetails = healthData?.deviceId;
    let notes = healthData?.notes;

    const [comment, setComment] = useState('');



    const commentHandler = (readingId) => {
        if(user?.role === 'HrMedical'){
            if(comment.length === 0 ){
                alert.error('You cannot add empty commment');
                return;
            }
            dispatch(commentOnReading(readingId, user?._id, comment))
        } else {
            if(comment.length === 0 ){
                alert.error('You cannot add empty commment');
                return;
            }

            dispatch(commentOnReadingByStaff(readingId, user?._id, comment));
        }
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
    
    return <Fragment> 
      <>
      <div className="card p-3 m-2">
        <br />
          <div className="row">
            <div className="col-md-1">
                <Image src={systolicImg} className="systolic-image" />    
            </div>

            {calcSysBpCategory(telemetaryData?.sys)} 
                
            <div className="col-md-3">
            <span className="profile-label">Systolic : {telemetaryData?.sys} <small><b>mmHG </b></small></span>
                <br/>
                <small><b>{sysBPCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>  
            </div>

            <div className="col-md-1">
                <Image src={diastolicImg} className="systolic-image" />    
            </div>

            {calcDiaBpCategory(telemetaryData?.dia)}

            <div className="col-md-3">
            <span className="profile-label">Diastolic : {telemetaryData?.dia} <small><b>mmHG </b></small></span>
                <br/>
                <small><b>{diaBpCategory}</b> &nbsp;&nbsp;&nbsp;<i className='bx bxs-circle' style={{color: color, fontSize: '22px'}}></i></small>
            </div>

            <div className="col-md-1">
                <Image src={pulseImg} className="systolic-image" />    
            </div>

            <div className="col-md-2">
                <span className="profile-label">Pulse : {telemetaryData?.pul}</span>
            </div>

            {isAdmin ===true ? <>
                <div className="col-md-1">
                    <Link to={{ pathname: "/edit/telemetarydata", state: {telemetaryData: healthData}}} className="btn btn-link">Edit</Link>
                </div>
            </> : null }

        </div> {/* First Row Ends here */}

        {/* Device & Patient Info */}
        <br />
        <div className="row-display telemetary-patient-row pl-2 pr-2">
                {/* <div className="col-md-7"> */}
                    <span className="telemetary-patient-row">Device ID: &nbsp;&nbsp;{deviceDetails?._id}</span>

                    <span className="telemetary-patient-row ml-2">Device Type: &nbsp;&nbsp;<Badge bg="info text-white">{deviceDetails?.deviceType}</Badge></span>

                    <span className="telemetary-patient-row ml-2">Reading Date: &nbsp;&nbsp; {moment(healthData?.dateAdded).format('MM/DD/YYYY')} {healthData?.time}</span>

                {/* </div> */}
            </div>


            
            {isAdmin ===true ? <Fragment>
            </Fragment> : 
                <div className="row mt-4">
                    <div className="col-md-10">
                        <input type="text" 
                        className="form-control"
                        placeholder="Type your comment here ....."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        key={telemetaryData?._id}
                        />
                    </div>
    
                    <div className="col-md-2">
                        <button className="submit-btn" type="submit" onClick={() => commentHandler(healthData?._id)}>Submit</button>
                    </div>
                </div>
            } 
            

            {/* Comment */}
            {notes.length > 0 && notes.map((note, index) => ( <div key={index}>
                <div className="row-display-secondary">
                    <div className="mt-3 mr-3">
                        <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                    </div>
                    <div className="bubble bubble-alt">  
                        
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
        </div>
      </>
      
    </Fragment>;   
};


export default CuffTelemetaryData;
