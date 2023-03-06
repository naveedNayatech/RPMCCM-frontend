import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/Staff/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorPatients, doctorProfile, getDoctorStats } from '../../actions/adminActions';
import folderImg from '../../assets/Images/folder.png';
import { Link } from 'react-router-dom';
import { Badge, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import patientIcon from '../../assets/Images/patientIcon.png';
import networkImg from '../../assets/Images/network.png';
import activePatientImg from '../../assets/Images/patient.png';
import PatientsWithCriticalDataDoctor from '../../components/Staff/PatientsWithCriticalDataDoctor';
    


const StaffDashboard = (props) => {
    let compliantStatus; // variable to store compliant status of patient

    const { user, isAuthenticated} = useSelector(state => state.auth);
    const { loading: patientsLoading, doctorpatients } = useSelector(state => state.docPatients);
    const { doctor } = useSelector(state => state.doctorProfile);
    
    const {totalPatients, RpmPatients, CcmPatients} = useSelector(state => state.doctorStats);

    let id = user._id;

    const dispatch = useDispatch();

    useEffect(() => {	
		if(isAuthenticated === false) {
			props?.history?.push("/login");
		}

        dispatch(getDoctorPatients(id));
        dispatch(doctorProfile(id));
        dispatch(getDoctorStats(id));

	}, [isAuthenticated])

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
            <MetaData title="Staff Dashboard" />
            <Sidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <TopBar />

                {/* Doctor's Analytics Starts  */}
                   <div className="home-content">
                            <div className="overview-boxes">
                                <div className="box box0">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Total Patients <br /></span>
                                        <div className="number text-white">
                                            {totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients}
                                        </div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated Just now</span>
                                        </div>
                                    </div>
                                    <Image src={networkImg} className="cart" />
                                </div>

                                {/* box 2 */}
                                <div className="box box1">
                                    <div className="left-side">
                                        <span className="box_topic text-white">RPM Patients <br /></span>
                                        <div className="number text-white">
                                            {RpmPatients && RpmPatients < 10 ? '0'+RpmPatients : RpmPatients}
                                        </div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated just now</span>
                                        </div>
                                    </div>
                                    <Image src={activePatientImg} className="cart" />
                                </div>

                                {/* box 3 */}
                                <div className="box box2">
                                    <div className="left-side">
                                        <span className="box_topic text-white">CCM Patients <br /></span>
                                        <div className="number text-white">
                                        {CcmPatients && CcmPatients < 10 ? '0'+CcmPatients : CcmPatients}
                                        </div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated just now</span>
                                        </div>
                                    </div>
                                    <Image src={patientIcon} className="cart" />
                                </div>

                                {/* box 4 */}
                                <div className="box box3">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Assigned Nurse <br /></span>
                                        <div className="number text-white">{doctor?.assigned_hr_id?.firstname}</div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated just now</span>
                                        </div>
                                    </div>
                                    <Image src={patientIcon} className="cart" />
                                </div>
                                <br />
                            </div>
                          </div>
                        {/* Doctor's Analytics Ends */}
                        <br/>
                    <div>
                <br />


            {patientsLoading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4">        
                        <div className="home-content">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="title pt-2 mt-2">RPM Patients <p style={{color: '#02C39A'}}> 
                                            <small> Total RPM Patients are {doctorpatients && doctorpatients?.length < 10 ? '0'+doctorpatients?.length : doctorpatients?.length} 
                                            </small>
                                        </p>
                                        </h5> 
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
                                        {doctorpatients && doctorpatients.slice(0,10).map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            
                                            <td><Link className="link" to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id}}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
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
                                    </div>
                                </div>
                            </div>
                         </Fragment> }


                        {/* List of Patients with Critical Data */}
                        <PatientsWithCriticalDataDoctor isDr={true} userId={id}/>
                    </div>
                </section>
        </Fragment>
    )
}

export default StaffDashboard;
