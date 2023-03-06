import React, {useState, useEffect, Fragment} from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getInitialMonthReport } from '../../actions/HRActions';
import {  
    getDoctors,
    getHrLists
} from '../../actions/adminActions';
import { RESET_INITIAL_MONTH_DATA } from '../../constants/HRConstants';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import moment from 'moment';
import ExportReactCSV from '../../components/ExportReactCSV';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Loader from '../../layouts/Loader';

const InitialMonthReport = () => {
    const alert = useAlert();

    const [month, setMonth] = useState('June');
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(20);
    const [year, setYear] = useState("2022");

    const {loading, error, initialMonthPatients} = useSelector(state => state.initialMonthReport);
    const { doctors } = useSelector(state => state.doctor);
    const { hrs} = useSelector(state => state.hrslist);

    const [doctorId, setDoctorId] = useState('');
    const [hrId, setHrId] = useState('');

    useEffect(() => {
        if(error){
            alert.error(error);
            return 
        }
        dispatch(getDoctors(resPerPage, currentPage));
        dispatch(getHrLists(resPerPage, currentPage));
    }, [error]);

    const resetHandler = () => {
        dispatch({
            type: RESET_INITIAL_MONTH_DATA
        })
        setMonth('');
        setDoctorId('');
        setHrId('');
    }

    const generateInitialReport = () => {
        dispatch(getInitialMonthReport(hrId, doctorId, month))
    }

  return (
    <Fragment>
        <MetaData title="Initial Month Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

                <div className="row-display">
                    <h5 className="pt-2 mt-2">Initial Month<span style={{color: '#02C39A'}}> Report </span></h5>
                
                    <div className="row-display">
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                                <i className='bx bx-arrow-back'></i>
                            </button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                            <i className='bx bxs-home'></i>
                            </button>
                        </Link>
                    </div>   
                </div>
                <hr />
                
                <div className="row-display">
                <div className="col-md-2">
                <label htmlFor="from">Select Month </label>
                        <select 
                            label="From" 
                            name="from" 
                            className="form-control"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="SelectMonth">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="year">Select Year</label>
                        <select 
                            label="From" 
                            name="from" 
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="SelectYear">Select Year</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="doctor">Select Doctor </label>
                            <select 
                            label="doctor" 
                            name="doctor" 
                            className="form-control"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            >
                            <option value="undefined">Select Doctor</option>
                            {doctors && doctors.map((doc, index) => (
                                <option value={doc?._id} key={index}> {doc?.firstname} {doc?.lastname}</option>
                            ))}    
                    </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="doctor">Select HR </label>
                            <select 
                            label="hr" 
                            name="hr" 
                            className="form-control"
                            value={hrId}
                            onChange={(e) => setHrId(e.target.value)}
                            >
                            <option value="undefined">Select HR</option>  
                            {hrs && hrs.map((hr, index) => (
                                <option key={index} value={hr?._id}> {hr?.firstname} {hr?.lastname}</option>
                            ))}  
                    </select>
                    </div>

                    <div>
                        <label>&nbsp;</label>
                        <button className="btn submit-btn shadow-none" onClick={generateInitialReport}>Search</button>
                    </div>
                
                </div>

                 {/* Heading */}
                     {loading ? <Loader /> : <>
                     {initialMonthPatients && initialMonthPatients?.data?.length > 0 && (<Fragment>
                    <hr />
                    <div className="row">
                     <div className="col-md-8 col-lg-8">
                         <p style={{color: 'gray', fontWeight: 'bold'}}>Results Found: <span style={{color: '#02C39A'}}>{initialMonthPatients && initialMonthPatients.length} </span></p>
                     </div>

                    <div className="col-md-2 col-lg-2">
                        <ExportReactCSV csvData={initialMonthPatients?.data} fileName="InitialMonthPatients.csv" />
                    </div>

                        <div className="col-md-2">
                        <button className="reset-btn" onClick={resetHandler}>Reset</button>
                    </div>
                    </div>
                    <br/>
                    </Fragment>)}                     
                
                {/* Heading */}


                {initialMonthPatients && initialMonthPatients?.data?.map((initialreport, index) => (
                    <Fragment>
                        <div className="row" key={index}>
                           <div className="col-md-1">
                               <span>{index + 1}</span>
                           </div>
                            <div className="col-md-3">
                                <b>Patient Details</b>
                                <hr/>
                                <span className="profile-label">Name: {initialreport?.firstname} {initialreport?.lastname}</span><br/>
                                <span className="profile-label">DOB: {moment(initialreport?.DOB).format("ll")}</span><br/>
                                <span className="profile-label">Gender: <Badge bg="info text-white">{initialreport?.gender}</Badge></span><br/>
                                <span className="profile-label">Email: {initialreport?.email}</span><br/>
                                <span className="profile-label">Phone 1: {initialreport?.phone1}</span> <br/>
                                <span className="profile-label">Diseases: {initialreport?.diseases}</span> <br/>
                                <span className="profile-label">Initial Month: <Badge bg="danger text-white"> {month} </Badge></span>
                            </div>

                            <div className="col-md-3">
                                <b>Doctor Details</b>
                                <hr />
                                <span className="profile-label">Name: {initialreport?.assigned_doctor_id?.firstname} {initialreport?.assigned_doctor_id?.lastname}</span><br/>
                                <span className="profile-label">Gender: <Badge bg="danger text-white">{initialreport?.assigned_doctor_id?.gender}</Badge></span><br/>
                            </div>

                            <div className="col-md-2">
                                <b>HR Details</b>
                                <hr/>
                                <span className="profile-label">Name: {initialreport?.assigned_hr_id?.firstname} {initialreport?.assigned_hr_id?.lastname}</span><br/>
                                <span className="profile-label">Gender: <Badge bg="danger text-white">{initialreport?.assigned_hr_id?.gender}</Badge></span><br/>
                            </div>

                            <div className="col-md-3">
                                <b>Device Details</b>
                                <hr/>
                                {initialreport?.assigned_devices && initialreport?.assigned_devices.map((device, index) => (
                                    <div key={index}>
                                        <span className="profile-label">Device ID: {device?.deviceObjectId?._id}</span><br/>
                                        <span className="profile-label">Type: <Badge bg="info text-white" className="male-tag">{device?.deviceObjectId?.deviceType}</Badge></span><br/>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                        <hr />
                    </Fragment>
                ))}
                </>}
            </div>
        </div>


        </section>
    </Fragment>
  )
}

export default InitialMonthReport