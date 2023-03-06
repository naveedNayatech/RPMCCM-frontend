import React, {useState, useEffect} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { Link } from 'react-router-dom';
import { Image, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import patientImg from '../../assets/Images/892781.png';
import { patientProfile } from '../../actions/adminActions';
import {hrTimeSpentOfCurrentMonthinCCMCategory, getTimeReportCCM} from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import CCMMinutesSpent from '../../components/HR/CCMMinutesSpent';
import CCMMinutesProgress from '../../components/HR/CCMMinutesProgress';
import PatientCCMConsent from '../../components/Patient/PatientCCMConsent';
import PatientCareplans from '../../components/Patient/PatientCareplans';
import { ADDING_TIME_SPENT_RESET } from '../../constants/HRConstants';
import AddTimeManually from '../../components/HR/AddTimeManually';



const CCMPatientProfile = (props) => {

  const alert = useAlert();
  const dispatch = useDispatch();
  let patientid = props?.location?.state?.patientid;
  
  const { totalTime : timeSpentInCCM} = useSelector(state => state.target);
  const { loading, error, patient} = useSelector(state => state.patientProfile);
  const { totalTimeinCCM } = useSelector(state => state.totalTimeSpentInCCM);
  const {user} = useSelector(state => state.auth); 
  const { error: commonError, message: commonMessage} = useSelector(state => state.common);
  const {isSuccessful, error: timeAddedError } = useSelector(state => state.timeSpent);
    
  
  const [addTimeShow, setAddTimeShow] = useState(false);

  
  let startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
  let endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
  let hrId = user?._id;
  
  const handleShow = () => setAddTimeShow(true);
  const handleClose = () => setAddTimeShow(false);


  useEffect(() => {
    if(error){
        return alert.error(error);
    }

    if(commonError){
        alert.error(error);
    }

    if(commonMessage){
        alert.success(commonMessage);
    }

    if(timeAddedError){
        alert.error(error)
    }

    if(isSuccessful) {
        setAddTimeShow(false);
        alert.success('Time successfully added');
        dispatch({ type: ADDING_TIME_SPENT_RESET})
        dispatch(hrTimeSpentOfCurrentMonthinCCMCategory(patientid, hrId, startDate, endDate));
    }

    dispatch(patientProfile(patientid));
    dispatch(getTimeReportCCM(patientid, startDate, endDate));


}, [dispatch, alert, error, isSuccessful, commonError, commonMessage, timeAddedError]);

    
  return (
    <>
    <MetaData title={patient?.firstname + ' ' + patient?.lastname +' '+ 'profile'} />
          <HRSidebar />
          
          <section className="home-section">
              {/* TopBar */}  
              <HRTopBar />

              {loading ? <Loader /> : <>  
              <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                        <div className="row-display">
                            <h5 style={{color: '#02C39A'}}>
                                <i className='bx bx-plus-medical'></i> <strong>&nbsp;Patient Profile </strong>
                            </h5>

                            <div>
                                <Link to="/Nurse/Dashboard" className="btn btn-secondary btn-sm pt-2"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                <button className="btn btn-outline-primary btn-sm ml-3 mt-2" onClick={handleShow}>
                                    <i className='bx bx-time pr-2'> </i>
                                    Add Time Manually
                                </button>
                            </div>
                        </div>
                        <hr />

                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    <Image src={patientImg} width="140" height="140" alt="patientpicture" />
                                </div>

                                <div className="col-md-3">
                                    <strong>{patient?.lastname}, {patient?.firstname}</strong>
                                    <p className="text-muted mt-1">
                                    {patient?.address} {patient?.line2} {patient?.city}
                                    <br/> {patient?.state} {patient?.zipCode}</p>
                                    <b>Consent Role: </b> <p className="mt-1" style={{color: '#02C39A', fontWeight: 'bold'}}>CCM</p>
                                    <b>Assigned Physician: </b> <p className="mt-1" style={{color: '#02C39A', fontWeight: 'bold'}}>Dr. Pier Frank</p>
                                </div>

                                <div className="col-md-2">
                                    <b>Gender: </b> <p className="mt-1">{patient?.gender}</p>
                                    <b>D.O.B: </b> <p className="mt-1">{moment(patient?.DOB).format("MM/DD/YYYY")}</p>
                                    <b>Age: </b> <p className="mt-1">{moment().diff(moment(patient?.DOB).format("ll"), 'years')} yrs</p>
                                </div>

                                <div className="col-md-2">
                                    <b>Phone: </b> <p className="mt-1">{patient?.phone1}</p>
                                    <b>Account Status: </b> <p className="mt-1">{patient?.block === false ? 'Active' : 'Inactive'}</p>
                                    <b>Created At: </b> <p className="mt-1">{moment(patient?.createdAt).format("MM/DD/YYYY")}</p>
                                </div>

                                <div className="col-md-3">
                                    <div className="card p-3" style={{backgroundColor: '#FEFFBC'}}>
                                        <b>Diseases: </b>
                                        <p>{patient?.diseases ? patient?.diseases : <p>No disease added</p>}</p>
                                        <br/>    
                                        <b>Insurance Company: </b> <p className="mt-1">{patient?.insurancecompany}</p>

                                    </div>
                                    <br/>

                                </div>
                            </div>
                            <hr />

                            <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-5">
                                    <b className="text-muted">Careplan</b>

                                    <div className="card p-3" style={{backgroundColor: '#FEFFBC'}}>
                                        <PatientCareplans patientId={patient?._id} isNurse={true} />
                                    </div>
                                  </div>

                                   <div className="col-md-4">
                                   <b className="text-muted">Consent (Attachment)</b>
                                   <div className="card p-3" style={{backgroundColor: '#FEFFBC'}}>
                                        <PatientCCMConsent patientId={patient?._id} isNurse={true} />
                                    </div>
                                   <div>
                                        
                                    </div>
                                  </div>

                                   <div className="col-md-3">
                                   <div className="card monthly-target-card p-2">
                                        <span style={{color: '#FFF'}}>Monthly Target ( {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} )</span>
                                        <hr className="white-hr"/>
                                        <CCMMinutesProgress totalTimeinCCM={timeSpentInCCM} />
                                    </div>
                                  </div>  

                                </div>    
                            </div>    
                            <br/><br/>
                            
                            <CCMMinutesSpent
                                patientId={patientid}
                            />    

                        </div>
                </div>
            </div>
            </div>
            </> }

            {/* Time spent Modal */}
            <Modal size="md" show={addTimeShow} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Add Time Manually</Modal.Title> 
                <Button variant="danger" onClick={handleClose}><i className='bx bx-x'></i></Button>
            </Modal.Header>

                <Modal.Body>
                    <AddTimeManually 
                        hrId={hrId} 
                        patientId={patientid} 
                        patientCCMNurse={hrId}
                        />   
                </Modal.Body>
            </Modal>
          </section>    
    </>
  )
}

export default CCMPatientProfile