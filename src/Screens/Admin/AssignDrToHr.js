import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getDoctors, doctorProfile, assignDoctorToHR } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { RESET_ASSIGN_PATIENT_TO_HR } from '../../constants/adminConstants';
import { Badge } from 'react-bootstrap';
import Select from 'react-select';


const AssignDrToHr = (props) => {

    let id = props?.location?.state?.id;
    let hrId = props?.location?.state?.id?._id;
    let firstName = props?.location?.state?.id?.firstname;
    let lastName = props?.location?.state?.id?.lastname;


    const dispatch = useDispatch();
    const alert = useAlert();    
    
    const [doctorId, setDoctorId] = useState('')


    const { error, doctors} = useSelector(state => state.doctor);
    const { doctor } = useSelector(state => state.doctorProfile);
    const { isAssigned } = useSelector(state => state.hrslist);


    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getDoctors());

        if(doctorId){
            dispatch(doctorProfile(doctorId))
        }

        if(isAssigned === true){
            alert.success('Doctor Assigned');
            props.history.push({pathname: '/hrlist'});
            dispatch({
                type: RESET_ASSIGN_PATIENT_TO_HR
            })
        }
        
    }, [dispatch, alert, error, doctorId, isAssigned]);

    const assignDoctor = () => {
        dispatch(assignDoctorToHR(hrId, doctorId))
    }

    const funcSetDrId = (dr) =>{
        setDoctorId(dr.value)
        console.log('Dr ID is ' + dr.value);
    }

    const options = []
    doctors && doctors.map((doc, index) => (
       options.push({value:doc?._id , label:[doc?.firstname, doc?.lastname, doc?.npinumber].join(" ") })
    ))

    return (
        <Fragment>
        <MetaData title="Assign Patient"/>
            <Sidebar />    

            <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="col-md-0 shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">
                
                <h5 style={{color: '#8FBB2C'}} className="mt-2">
                    <i className='bx bx-plus-medical'></i> <strong>&nbsp;Assign Doctor </strong>
                </h5>
                <hr />

                <span className="notes-header"><b>Note: </b> Doctor with no HR, will be showing in the list below. Only one HR allowed per doctor.</span>
                
                <div className="row">
                    <div className="col-md-4">
                        <h5 style={{color: '#8FBB2C'}} className="mt-4">
                            <i className='bx bx-search-alt-2' ></i> <strong>&nbsp;Select Doctor </strong>
                        </h5>
                            <Select
                                options={options}
                                onChange={funcSetDrId}
                            />
                    </div>

                    <div className="col-md-8">
                        

                        {doctorId && doctor && <Fragment>
                            <h5 style={{color: '#8FBB2C'}} className="mt-4">
                                 <strong>&nbsp;Doctor Details </strong>
                            </h5>
                            <br />
                                    <div className="col-md-12">
                                        <div className="row">
                                            <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                            <p className="profile-name pl-3 pb-2">Dr. {doctor?.firstname} {doctor?.lastname} </p>
                                        </div>

                                        <br />

                                    <div className="row">
                                        <div className="col-md-4">    
                                            <span className="profile-label">Email Address: </span>
                                            <p className="profile-value-text" style={{wordWrap: 'break-word'}}>{doctor?.email ? doctor?.email : 'N/A'}</p>

                                            <span className="profile-label">License #: </span>
                                            <p className="profile-value-text">{doctor?.licensenumber || 'N/A'}</p>    
                                        </div>

                                        <div className="col-md-4">    
                                            <span className="profile-label">D.O.B: </span>
                                        <p className="profile-value-text">{moment(doctor?.DOB).format("ll")}</p>

                                        <br/>
                                        <span className="profile-label">Role: </span>
                                            <p className="profile-value-text">{doctor?.role}</p>                                 
                                        </div>
                                        

                                        <div className="col-md-4">    
                                            <span className="profile-label">Gender: </span>
                                            <p><Badge bg="info text-white" className="male-tag">{doctor?.gender}</Badge></p>

                                        <br/>
                                        <span className="profile-label">NPI: </span>
                                            <p className="profile-value-text">{doctor?.npinumber ? doctor?.npinumber : 'N/A'}</p>                                
                                        </div>
                                    </div>
                            </div>
                            <button className="add-staff-btn mr-5" style={{ float: 'right' }} onClick={() => assignDoctor()}> Assign {doctor?.firstname} {doctor?.lastname} to HR. {firstName && firstName} {lastName && lastName} </button>             
                        </Fragment>}
                    </div>
                </div>
            </div>

            </section>
        </Fragment>
    )
}

export default AssignDrToHr;
