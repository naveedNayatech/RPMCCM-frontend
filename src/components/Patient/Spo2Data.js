import React, {useState, Fragment} from 'react';
import { Image, Badge } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import o2 from '../../assets/Images/o2.png';
import systolicImg from '../../assets/Images/blood-pressure.png';
import Oxygen from '../../assets/Images/Oxygen.png'
import patientProfileImg from '../../assets/Images/doctorIcon.png';
import {useDispatch, useSelector} from 'react-redux';
import { commentOnReading, commentOnReadingByStaff } from '../../actions/HRActions';

const moment = require('moment-timezone');

const Spo2Data = ({healthData, isAdmin}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let telemetaryData = healthData?.telemetaryData;
    let deviceDetails = healthData?.deviceId;
    let notes = healthData?.notes;

    const { user } = useSelector(state => state.auth);

    const [comment, setComment] = useState('');

    const commentHandler = (readingId) => {
        if(user?.role === 'HrMedical'){
            if(comment.length == 0 ){
                alert.error('You cannot add empty commment');
                return;
            }
            dispatch(commentOnReading(readingId, user?._id, comment))
        } else {
            if(comment.length == 0 ){
                alert.error('You cannot add empty commment');
                return;
            }
            dispatch(commentOnReadingByStaff(readingId, user?._id, comment));
        }
    }

  return (
    <Fragment>
        <div className="telemetary-card"> 
        {telemetaryData?.O2 && <>
            <div className="row">
        <div className="col-md-1">
            <Image src={o2} className="systolic-image" />    
        </div>

        <div className="col-md-3">
            <span className="profile-label">isO2 : true </span>
        </div>

      <div className="col-md-1">
          <Image src={systolicImg} className="systolic-image" />    
      </div>

      <div className="col-md-3">
          <span className="profile-label">BP : {telemetaryData?.Bp}</span>
      </div>

      <div className="col-md-1">
          <Image src={Oxygen} className="systolic-image" />    
      </div>

      <div className="col-md-3">
          <span className="profile-label">O2 : <span style={{fontWeight: 500}}>{telemetaryData?.O2} % </span></span>
      </div>
    </div>
    <br />
    {/* Device & Patient Info */}
        <div className="row-display telemetary-patient-row pl-2 pr-2">        
            <div>
                <span>Device ID: </span> &nbsp;&nbsp;
                <span style={{fontWeight: 500}}> {deviceDetails?._id}</span>
            </div>

            <div>    
                <span>Device Type: </span> &nbsp;&nbsp;
                <span> <Badge pill bg="info text-white">{deviceDetails?.deviceType}</Badge></span>
            </div>

            <div>
                <span>Created At: </span> &nbsp;&nbsp;
                <span style={{fontWeight: 500}}> {moment(healthData?.createdAt).tz("America/New_York").format("lll")}</span>
            </div>
        </div>

            <br />
            {/* Comment on reading */}
            {isAdmin === true ? <Fragment>
            </Fragment> : 
                <div className="row">
                    <div className="col-md-10">
                        <input type="text" 
                        className="form-control mt-1"
                        placeholder="Enter your comment here ....."
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
                <div className="bubble bubble-alt bubble-green"> <p>
                <b>{note?.conclusion_hr_id ? (<span>{note?.conclusion_hr_id?.firstname}  {note?.conclusion_hr_id?.lastname}</span>) : (<span>
                            {note?.conclusion_doctor_id?.firstname}  {note?.conclusion_doctor_id?.lastname}
                        </span>)}</b><br/>
                        <p className="mt-1 mr-3">{note?.conclusion} <br/> 
                        <p className="mt-1"><b>{moment(note?.dateTime).tz('America/New_York').format("MM-DD-YYYY")}</b></p>
                      </p>
                    </p>
                </div>
                <br/><br/><br/><br/>
            </div> 
            </div>
            ))}
      </> }
      </div>
    </Fragment>
  )
}

export default Spo2Data