import React, {useEffect} from 'react';
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { patientProfile } from '../../actions/adminActions';
import {getTimeReportCCM} from '../../actions/HRActions';
import {useAlert} from 'react-alert';
import patientImg from '../../assets/Images/892781.png';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import CCMMinutesSpent from '../../components/HR/CCMMinutesSpent';
import CCMMinutesProgress from '../../components/HR/CCMMinutesProgress';
import PatientCCMConsent from '../../components/Patient/PatientCCMConsent';
import PatientCareplans from '../../components/Patient/PatientCareplans';


const DoctorPatientProfileCCM = (props) => {
  
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    let patientid = props?.location?.state?.patientid;
    const { loading, error, patient} = useSelector(state => state.patientProfile);
    const { totalTime : timeSpentInCCM} = useSelector(state => state.target);


    let startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().clone().endOf('month').format('YYYY-MM-DD');

    console.log('time spent is ' + timeSpentInCCM);

    useEffect(() => {
        if(error){
            return alert.error(error);
        }
    
        dispatch(patientProfile(patientid));
        dispatch(getTimeReportCCM(patientid, startDate, endDate));

        // dispatch(hrTimeSpentOfCurrentMonthinCCMCategory(patientid, hrId, startDate, endDate));
        // dispatch(getTimeReportCCM(patientid, startDate, endDate));

    }, [dispatch, alert, error]);
    



    return (
    <>
    <MetaData title="CCM Patient Profile"/>
        <Sidebar />    

    <section className="home-section">
        {/* TopBar */}
        <TopBar />

        {loading ? <Loader /> : <>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                    <div className="home-content">
                        <div className="row-display">
                            <h5 className="title">CCM Patient Profile</h5>

                            <button 
                            onClick={() => history.goBack()}
                            className="btn btn-secondary btn-sm">
                                <i className="bx bx-arrow-back"></i>
                            </button>
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
                                        <PatientCareplans patientId={patient?._id} />
                                    </div>
                                  </div>

                                   <div className="col-md-4">
                                   <b className="text-muted">Consent (Attachment)</b>
                                   <div className="card p-3" style={{backgroundColor: '#FEFFBC'}}>
                                        <PatientCCMConsent patientId={patient?._id} />
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

                                <br/><br/>
                                <CCMMinutesSpent
                                    patientId={patientid}
                                />

                            </div>
                            </div>
                    </div>
                </div>
                </>
            }

    </section>
    </>
  )
}

export default DoctorPatientProfileCCM