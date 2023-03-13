import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import { getDoctorPatients } from '../../actions/adminActions';
import { Link, useHistory } from 'react-router-dom';
import { Badge, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';


const StaffPatients = () => {
    let compliantStatus;

    const history = useHistory();
    
    const dispatch = useDispatch();
    
    const { user} = useSelector(state => state.auth);
    const { loading, doctorpatients } = useSelector(state => state.docPatients);
    
    let id = user._id;

    useEffect(() => {
        dispatch(getDoctorPatients(id));
	}, [dispatch])

    function calculateCompliancyStatus(date) {  
        var m = moment(date);
        var today = moment().startOf('day');
        var days = moment.duration(today - m).asDays();

        switch(true){
            case (days >= 0 && days < 3):
                compliantStatus = 'compliant'
                break;

            case (days >= 3 && days <= 7):
                compliantStatus = "mostLikelyCompliant"
                break;

            case (days >= 8 && days <= 20):
                compliantStatus = "notLikelyCompliant"
                break;

            case (days >= 8 && days <= 31):
                compliantStatus = "nonCompliant"
                break;
            
            default:
                compliantStatus = 'nonCompliant'
                break;
        }
    }

    return (
        <Fragment>
           <MetaData title="My Patients"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div>
                                <div className="row-display">
                                        <h5 className="title">RPM Patients 
                                            <p style={{color: '#8FBB2C'}}>
                                                <small> Total RPM patients are: {doctorpatients && doctorpatients?.length < 10 ? '0'+doctorpatients?.length : doctorpatients?.length} </small> 
                                            </p>
                                        </h5>
                                    
                                    <div>
                                        <button 
                                        onClick={() => history.goBack()}
                                        className="btn btn-secondary btn-sm">
                                          <i className="bx bx-arrow-back"></i>  
                                        </button>
                                        &nbsp;&nbsp;
                                        <Link to="/doctor/Addpatient" className="btn btn-outline-primary btn-sm mt-4 mb-3">Enroll New Patient</Link>
                                    </div>
                                </div>
                                
                                {doctorpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                        <tr>  
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Compliancy Status</th>
                                            <th>Last Reading </th>
                                            <th>Consent Program</th>
                                            <th>Actions</th> 
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link className="link" to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="success text-white">{patient?.gender}</Badge></p></td>
                                            
                                            
                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td style={{fontWeight: 'bold', color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Not Assigned</Badge></td>
                                            </>}
                                            
                                            {calculateCompliancyStatus(moment(patient?.lastReading))}    
                            
                                            <td>
                                                {patient?.lastReading ? 
                                                    compliantStatus === 'compliant' ? <p style={{color: 'green', fontWeight: 'bold'}}>
                                                        Compliant</p> : compliantStatus === 'mostLikelyCompliant' ? <p style={{color: '#F95800', fontWeight: 'bold'}}>
                                                            Most Likely Compliant</p> : compliantStatus === 'notLikelyCompliant' ? <p style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                                                                Not Likely Compliant</p> : compliantStatus === 'nonCompliant' ? <p style={{color: 'red', fontWeight: 'bold'}}>
                                                                Non Compliant</p> : null : '--'}
                                            </td>

                                            <td>
                                                <span style={{fontWeight: 'bold'}}>{patient?.lastReading ? moment(patient?.lastReading).format("LL") : '--'}</span>
                                            </td>
                                            
                                            <td>{patient?.patientType}</td>

                                            <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                    <Dropdown.Item>
                                                        <Link className="link" to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        
                                        </tbody>
                                        </table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>

                        <div>   
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>         
                        </div>
                        </Fragment> }
                                <hr />
                            </div>
                        </div>
                    </div>
                         </Fragment> } 
                </section>     
        </Fragment>
    )
}

export default StaffPatients
