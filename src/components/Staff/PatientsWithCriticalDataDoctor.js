import React, {useEffect} from 'react';
import moment from 'moment';
import patientProfileImg from '../../assets/Images/add-user.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {getPatientsWithCriticalRPMDataHrDr} from '../../actions/adminActions';



const PatientsWithCriticalDataDoctor = ({isDr, isNurse, userId}) => {
    
    const dispatch = useDispatch();

    const {criticalPts} = useSelector(state => state.criticalPatients);

    useEffect(() => {
        dispatch(getPatientsWithCriticalRPMDataHrDr(isDr, isNurse, userId));
      }, [dispatch]);
    
 
 
    return (
    <>
         <div className="container-fluid mt-3 mb-5">
           <h5 className="title">Patients with critical readings</h5>   
            <p><small>List of RPM patients with critical readings during the last seven days.</small></p>

            <div className="row">
            {criticalPts && criticalPts.filter((a, i) => criticalPts.findIndex((s) => a?.assigned_patient_id?._id === s?.assigned_patient_id?._id) === i).map((pts, index) => (
                <div className="col-md-3 mb-4">
                <div className="card">
                    <div className={`ribbon ribbon-top-left`}> 
                    <span style={{backgroundColor: '#FC359B'}}>{index + 1}</span>
                    </div>

                    <div className="container text-center">
                     <div className="text-center">
                         <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />
                     </div>    
                     <label className="profile-label mt-3">Patient Name : </label>
                        &nbsp;
                        {isDr === true ? <>
                            <Link to={{ pathname: "/doctor/patient/profile", state: {patientid: pts?.assigned_patient_id?._id}}} className="link">{pts?.assigned_patient_id?.firstname + " "+ pts?.assigned_patient_id?.lastname } </Link>   
                        </> : <>
                        <Link to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: pts?.assigned_patient_id?._id}}} className="link">{pts?.assigned_patient_id?.firstname + " "+ pts?.assigned_patient_id?.lastname } </Link>   
                        </>}
                    <br/>
                
                     <label className="profile-label mt-3">Reading Details </label>

                     <div className="row-display">
                        <div>
                            <span><b>Sys</b></span>
                            <p style={{color: '#FC359B'}}>{pts?.telemetaryData?.sys}</p>
                        </div>

                        <div>
                            <i className='bx bxs-circle' style={{color: '#FC359B', fontSize: '36px'}}></i>    
                        </div>

                        <div>
                            <span><b>Dia</b></span>
                            <p>{pts?.telemetaryData?.dia}</p>
                        </div>

                        <div>
                            <span><b>Pulse</b></span>
                            <p>{pts?.telemetaryData?.pul}</p>
                        </div>
                     </div>

                    <label className="profile-label mt-3">Data Received Date : </label>
                    <p>{moment(pts?.dateAdded).tz("America/New_York").format("MM-DD-YYYY")}</p>

                    </div>
                </div>  
                </div>
            ))}
            </div>
        
        </div>
    </>
  )
}

export default PatientsWithCriticalDataDoctor