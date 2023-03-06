    import React, {Fragment, useState, useEffect} from 'react'
    import MetaData from '../../layouts/MetaData';
    import  HRSidebar from '../../components/HR/HRSidebar';
    import patientIcon from '../../assets/Images/patientIcon.png';
    import HRTopBar from '../../components/HR/HRTopbar';
    import { useDispatch, useSelector } from 'react-redux';
    import { getHRPatients, getHRStats } from '../../actions/HRActions';
    import { getHrProfile, getTimeSummaryReportByHR } from '../../actions/adminActions';
    import folderImg from '../../assets/Images/folder.png';
    import { Link } from 'react-router-dom';
    import { Badge, Table, DropdownButton, Dropdown, Image, ProgressBar } from 'react-bootstrap';
    import Loader from '../../layouts/Loader';
    import { useAlert } from 'react-alert';
    import moment from 'moment';
    import doctorIcon from '../../assets/Images/doctorIcon.png';
    import networkImg from '../../assets/Images/network.png';
    import activePatientImg from '../../assets/Images/patient.png';
    import verifiedImg from '../../assets/Images/verified-user.png';
    import systolicImg from '../../assets/Images/blood-pressure.png';
    import PatientsWithCriticalDataDoctor from '../../components/Staff/PatientsWithCriticalDataDoctor';




    const HRDashboard = () => {
        let compliantStatus; // variable to store compliant status of patient
        const [month, setMonth] = useState('03'); //moment().month()
        const [year, setYear] = useState(moment().year());
        const [category, setCategory] = useState('RPM');

        const { loading, user, isAuthenticated} = useSelector(state => state.auth);
        const {  error, hrpatients} = useSelector(state => state.hrPatients);
        const { hrProfile } = useSelector(state => state.hrprofile);
        const { totalPatients, activePatients, compliantPatients, nonCompliantPatients, InactivePatients } = useSelector(state => state.hrStats)
        const {timeSummaryReport} = useSelector(state => state.summaryReport);


        const [sort, setSort] = useState(true);
        const [query, setQuery] = useState("");
        const keys = ["firstname", "lastname", "DOB", "email", "phone1"];

        const dispatch = useDispatch();
        const alert = useAlert();
        let id = user._id;

        
        useEffect(() => {
            if(error) {
                alert.error("/hr/login");
            }

            dispatch(getHRPatients(id));
            dispatch(getHrProfile(id))
            dispatch(getHRStats(id));
            dispatch(getTimeSummaryReportByHR(id, month, year,category));
        }, [dispatch, isAuthenticated])

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
                <MetaData title="Nurse Dashboard" />
                <HRSidebar />
                
                <section className="home-section">
                    <HRTopBar />
                        <div className="container-fluid">
                        <div className="home-content">
                            <div className="overview-boxes">
                                <div className="box box0">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Assigned Patients <br /></span>
                                        <div className="number text-white">{totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients }</div>
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
                                        <span className="box_topic text-white">Active Patients <br /></span>
                                        <div className="number text-white">{activePatients && activePatients < 10 ? '0'+activePatients : activePatients }</div>
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
                                        <span className="box_topic text-white">Inactive Patients <br /></span>
                                        <div className="number text-white">{InactivePatients && InactivePatients < 10 ? '0'+InactivePatients : InactivePatients}</div>
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
                                        <span className="box_topic text-white">Compliant Pts <br /></span>
                                        <div className="number text-white">{compliantPatients && compliantPatients < 10 ? '0'+compliantPatients : compliantPatients}</div>
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
                        
                        <br />
                          {/* Next Row */}
                          <div className="home-content">
                          <div className="overview-boxes">
                                <div className="box box3">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Pts. with no device assigned <br /></span>
                                        <div className="number text-white">{nonCompliantPatients && nonCompliantPatients < 10 ? '0'+nonCompliantPatients : nonCompliantPatients}</div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated just now</span>
                                        </div>
                                    </div>
                                    <Image src={patientIcon} className="cart" />
                                </div>

                                <div className="box box2">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Patients Minutes Completed <br /></span>
                                        <div className="number">                                            
                                            {timeSummaryReport && timeSummaryReport.filter(completedReadings => completedReadings.totalMinutes >= 20).length}
                                        </div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Minutes {'>='} 20 this month</span>
                                        </div>
                                    </div>
                                    <Image src={verifiedImg} className="cart" />
                                </div>

                                <div className="box box1">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Patients Readings Completed <br /></span>
                                        <div className="number text-white">
                                            {timeSummaryReport && timeSummaryReport.filter(completedReadings => completedReadings.totalReadings >= 16).length}
                                        </div>
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Readings {'>='} 16 this month</span>
                                        </div>
                                    </div>
                                    <Image src={systolicImg} className="cart" />
                                </div>


                                <div className="box box0">
                                    <div className="left-side">
                                        <span className="box_topic text-white">Assigned Doctor <br /></span>
                                        {hrProfile?.assigned_doctor_id ? <>
                                            <div className="number text-white">Dr. {hrProfile?.assigned_doctor_id?.firstname}</div>
                                            </> : <div className="number text-white"> <small>Not Assigned</small> </div>  
                                        }
                                        <div className="indicator">
                                            <i className="bx bx-up-arrow-alt down"></i>
                                            <span className="text text-white">Updated just now</span>
                                        </div>
                                    </div>
                                    <Image src={doctorIcon} className="cart" />
                                </div>
                            </div>
                          </div>
                        <div>
                    </div>
                    <br />

                    <div className="chatButton">
                         <Link to="/Nurse/Chat" 
                               className="roundedChatButton text-center" 
                               style={{fontSize: '40px', paddingTop: '12px'}}>
                            <i className='bx bx-conversation'></i>
                          </Link>               
                    </div>

                {loading ? <Loader /> : <Fragment>
                        <div className="shadow-lg pb-3 bg-white">        
                            <div className="home-content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                        <div className="row-display">
                                        <h5 style={{color: '#02C39A'}} className="mt-4">
                                            <i className='bx bx-user'></i> <strong>&nbsp;My Patients </strong>
                                        </h5>

                                            <div className="row-display"> 
                                                <input 
                                                    type="text" 
                                                    className="form-control mt-2"
                                                    onChange={e => setQuery(e.target.value)}
                                                    placeholder="Search"
                                                    style={{width: '180px', height: '40px'}}
                                                /> 

                                                &nbsp;&nbsp;&nbsp;
                                                <button className="btn add-staff-btn mt-2" 
                                                onClick={() => setSort(sort => !sort)}
                                                style={{height: '40px'}}
                                                >
                                                {sort ? <i className="bx bx-down-arrow-alt"></i> : <i className="bx bx-up-arrow-alt"></i>}
                                                    </button>
                                            </div>
                                        
                                        </div>
                                            <br />
                                        </div>
                                    </div> 
                                    
                                    {hrpatients?.length > 0 ? (<Fragment>
                                    <div className="col-md-12">
                                        <Fragment>
                                        <Table className="table table-sm table-striped">
                                            <thead align="center">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>DOB </th>
                                                    <th>Device Status</th>
                                                    <th>Acc Status</th>
                                                    <th>Physician</th>
                                                    <th>Compliancy Status</th>
                                                    <th>Last Reading </th>
                                                    <th>Consent Program</th>
                                                    <th>Actions</th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {sort ? <>
                                                {hrpatients && hrpatients.slice(0,10).filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => (  
                                            <tr key={index}>
                                            
                                            {patient?.block === false ? <td>
                                                <Link style={{textDecoration: 'none', color: 'dodgerblue', fontWeight: 'bold'}} 
                                                to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id }}}>
                                                    {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p>
                                            </Link></td> : <td> {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p> 
                                            </td> }
                                            
                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                                        
                                            <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                                    <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                                    <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                                {patient?.batterySignals?.sig ? <ProgressBar striped variant="info" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                            </td>
                                    
                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td style={{color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
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

                                            <td><span style={{fontWeight: 'bold'}}>{patient?.lastReading ? moment(patient?.lastReading).format("LL") : '--'}</span>
                                            {/* <p>{patient?.lastReading ?  moment(patient?.lastReading).fromNow() : null}</p> */}
                                            </td>

                                            <td>{patient?.assigned_hr_id === id && patient?.assigned_ccm_nurse_id !== id ? <b>RPM</b> : 
                                                    patient?.assigned_ccm_nurse_id === id && patient?.assigned_hr_id !== id ? <b>CCM</b> : 
                                                    patient?.assigned_hr_id === id && patient?.assigned_ccm_nurse_id === id ? <b>RPM, CCM</b> : 
                                                null }
                                            </td>        

                                            <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                    <Dropdown.Item>
                                                        <Link className="link" to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                            </tr> 
                                            ))}
                                            </> : <>
                                            
                                            {hrpatients && hrpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                                <tr key={index}>
                                                
                                            {patient?.block === false ? <td>
                                                    <Link style={{textDecoration: 'none', color: 'dodgerblue', fontWeight: 'bold'}} 
                                                     to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id }}}>
                                                        {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link>
                                                </td> : <td>
                                                {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p>
                                                </td> }
                                                
                                                <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                                
                                                <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                                    <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                                    <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                                    {patient?.batterySignals?.sig ? <ProgressBar striped variant="info" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                                </td>

                                                {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}


                                                {patient?.assigned_doctor_id ? <>
                                                    <td style={{color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
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

                                                <td><span style={{fontWeight: 'bold'}}>{patient?.lastReading ? moment(patient?.lastReading).format("LL") : '--'}</span>
                                                    {/* <p>{patient?.lastReading ?  moment(patient?.lastReading).fromNow() : null}</p> */}
                                                </td>

                                                <td>{patient?.assigned_hr_id === id ? <b>RPM</b> : 
                                                    patient?.assigned_ccm_nurse_id === id ? <b>CCM</b> : 
                                                    patient?.assigned_hr_id === id && patient?.assigned_ccm_nurse_id === id ? <b>RPM, CCM</b> : 
                                                    null }  
                                                </td>

                                                <td>
                                                <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                    <Dropdown.Item>
                                                        <Link className="link" to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                                </td>
                                            </tr> 
                                            ))}

                                            </> }
                                            
                                            </tbody>
                                            </Table>    
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
                    </Fragment>
                }

                {/* List of Patients with Critical Data */}
                {user.consentRole === 'RPM' || user.consentRole === 'Both' ? <>
                    <PatientsWithCriticalDataDoctor isNurse={true} userId={id}/>
                </> : null}
                
                
                </div>                
            </section>
        </Fragment>
        )
    }

    export default HRDashboard;
