import React, { useEffect,  Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getAllLogs, getAdminStats } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import {Table, Badge, Image, Spinner, ProgressBar} from 'react-bootstrap';
import hrIcon from '../../assets/Images/network.png';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import patientIcon from '../../assets/Images/patientIcon.png';
import heartIcon from '../../assets/Images/heart.png';
import AdminPatientStats from '../../components/AdminDashboard/AdminPatientStats';
import PatientsWithCriticalReadingsAdmin from '../../components/AdminDashboard/PatientsWithCriticalReadingsAdmin';


const moment = require('moment-timezone');

const Home = () => {
    const dispatch = useDispatch();
    let compliantStatus; // variable to store compliant status of patient

    const { patients} = useSelector(state => state.admin);
    const { loading, logs} = useSelector(state => state.log);
    const { totalPatients, totalHrs, totalDrs, totalDevices, activePts, blockPts, malePts, femalePts, rpmPts, ccmPts } = useSelector(state => state.adminStat)

    const todayDate = moment().format("ll");

    useEffect(() => {
          dispatch(getPatients());
          dispatch(getAllLogs(todayDate));
          dispatch(getAdminStats())
    }, [dispatch, todayDate]);

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

        <section className="home-section">
            <TopBar />

                        
            {/*  Home content  */}
            <div className="home-content">
                <div className="overview-boxes">
                        <div className="box analytics-card">
                                <div className="left-side">
                                    <Link to="/patients" className="box_topic">Total Patients <br /></Link>
                                    <div className="number">{totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients }</div>
                                    <div className="indicator">
                                        <i className="bx bx-up-arrow-alt down"></i>
                                        <span className="text">Updated just now</span>
                                    </div>
                                </div>
                                <Image src={patientIcon} className="cart" />
                        </div>

                    <div className="box analytics-card">
                        <div className="left-side">
                            <Link to="/devices" className="box_topic">RPM Devices <br /></Link>
                            <div className="number">{totalDevices && totalDevices < 10 ? '0'+totalDevices : totalDevices }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        <Image src={heartIcon} className="cart"/>
                        {/* <i className="bx bx-devices cart two"></i> */}
                    </div>

                    <div className="box analytics-card">
                        <div className="left-side">
                            <Link to="/doctors" className="box_topic">Total Doctors<br /></Link>
                            <div className="number">{totalDrs && totalDrs < 10 ? '0'+totalDrs : totalDrs}</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        <Image src={doctorIcon} className="cart three" />
                    </div>

                    <div className="box analytics-card">
                        <div className="left-side">
                            <Link to="/hrs" className="box_topic">Nurses <br/></Link>
                            <div className="number">{totalHrs && totalHrs < 10 ? '0'+totalHrs : totalHrs}</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        {/* <i className="bx bxs-cart-download cart four"></i> */}
                        <Image src={hrIcon} className="cart" />

                    </div>
                </div>
                <br />
        
                {/* Patient Stats */}
                <AdminPatientStats
                    totalPatients={totalPatients} 
                    activePatients={activePts} 
                    InactivePatients={blockPts} 
                    malePts={malePts}
                    femalePts={femalePts}
                    rpmPts={rpmPts}
                    ccmPts={ccmPts}
                    />

                
                <PatientsWithCriticalReadingsAdmin />



                {/* Sales Content */}
                <div className="sales-boxes mt-2">
                    <div className="recent-sale box">
                        <div className="container-fluid row">
                            <div className="col-lg-8 col-md-8">
                            <h5 className="title">Recently Added Patients</h5>
                                <div className="sales-details">
                                {patients && <Fragment>
                                    <Table striped bordered className="text-center">
                                        <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>DOB </th>
                                        <th>Battery Signals</th>
                                        <th>Phone #</th>
                                        <th>Compliancy Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {patients && patients.filter(item => item?.block === false).slice(0,10).map((patient, index) => (
                                        <tr key={index}>
                                           <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, batterySignalStatus: patient?.batterySignals?.sig}}}>
                                                {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p>
                                               </Link>
                                            </td>
                                    
                                            <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="success text-white">
                                                {patient?.gender}</Badge></p>
                                            </td> 
                                    
                                            <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                                    <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                                    <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                                {patient?.batterySignals?.sig ? <ProgressBar striped variant="info" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                            </td>
                                          
                                            <td>{patient?.phone1}</td>

                                            {calculateCompliancyStatus(moment(patient?.lastReading))}

                                             <td>
                                                {patient?.lastReading ? 
                                                    compliantStatus === 'compliant' ? <p style={{color: 'green', fontWeight: 'bold'}}>
                                                        Compliant</p> : compliantStatus === 'mostLikelyCompliant' ? <p style={{color: '#F95800', fontWeight: 'bold'}}>
                                                            Most Likely Compliant</p> : compliantStatus === 'notLikelyCompliant' ? <p style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                                                                Not Likely Compliant</p> : compliantStatus === 'nonCompliant' ? <p style={{color: 'red', fontWeight: 'bold'}}>
                                                                Non Compliant</p> : null : '--'}
                                            </td>
                                        </tr>
                                        ))}
                                        </tbody>
                                      </Table>
                                      </Fragment> }
                                </div>
                            </div>

                            
                                <div className="col-md-4 col-lg-4 logs-card">
                                    <div className="row-display">
                                     <h5 className="text-white">Activity Logs <p><small>as of {todayDate}</small></p></h5>
                                     <Link to="/logs" className="link">
                                        <span className="btn btn-outline-warning btn-sm"><i className='bx bx-slider-alt'></i> Manage Logs</span>
                                     </Link>
                                    </div>
                                    <br />
                                    {logs && logs.slice(0,50).map((log, index) => (     
                                             <ul key={index}>
                                                {loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : <>
                                                    <ol><small>{index +1 +" )"} {log?.text}.</small> 
                                                    &nbsp;&nbsp;&nbsp;<span><small>
                                                    {moment(log.createdAt).tz("America/New_York").format("MM/DD/YYYY")}
                                                    </small></span></ol>
                                                </>}
                                             </ul>
                                    ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <br/><br/><br/>
                </section>

        </Fragment>
    )
}

export default Home
