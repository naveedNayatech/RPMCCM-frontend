import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import hrIcon from '../../assets/Images/network.png';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import patientIcon from '../../assets/Images/patientIcon.png';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector} from 'react-redux';
import { getDoctors, getHrLists, getPatients, searchAdminLogs, searchAdminLogsByHR, searchAdminLogsByPatient} from '../../actions/adminActions';
import Select from 'react-select';
import Loader from '../../layouts/Loader';
import { SEARCH_LOG_RESET } from '../../constants/adminConstants';
import LoginLogoutLogType from '../../components/AdminDashboard/LoginLogoutLogType';
import ViewPatientProfileLogType from '../../components/AdminDashboard/ViewPatientProfileLogType';
import TargetsLogType from '../../components/AdminDashboard/TargetsLogType';
import GenerateReportLogType from '../../components/AdminDashboard/GenerateReportLogType';
import AccountCreatedLogType from '../../components/AdminDashboard/AccountCreatedLogType';
import PatientLogType from '../../components/AdminDashboard/PatientLogType';

const ManageLogs = () => {
const dispatch = useDispatch();
const [reportBy, setReportBy] = useState("doctor");
const alert = useAlert();
const [logType, setLogType] = useState("logs");

const [doctorId, setDoctorId] = useState("");
const [hrId, sethrId] = useState("");
const [patientId, setPatientId] = useState("");

const { patients} = useSelector(state => state.admin);
const { error, doctors } = useSelector(state => state.doctor);
const {  hrs } = useSelector(state => state.hrslist);
const { loading, logs } = useSelector(state => state.searchLogResult);

useEffect(() => {
    if(error){
        alert.error(error);
    }

    dispatch({
        type: SEARCH_LOG_RESET
    })
    
    dispatch(getPatients());
    dispatch(getDoctors(10, 1));
    dispatch(getHrLists());
}, [dispatch]);


const options = []
    patients && patients.map((patient) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")})
    ))

const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: ["Dr. " + doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: ["Hr. " + hr?.firstname, hr?.lastname].join(" ")})
  ))

  const getDoctorProfile = (doctor) => {
    setDoctorId(doctor.value);
}

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const getPatientProfile = (patient) => {    
    setPatientId(patient.value);
}

  const searchLogs = () => {
    if(reportBy === 'doctor' && logType){
        if(!doctorId){
            alert.error('Please select doctor');
            return;
        }
        dispatch(searchAdminLogs(doctorId, logType))

    } else if(reportBy === 'nurse' && logType){
        if(!hrId){
            alert.error('Please select hr');
            return;
        }
        dispatch(searchAdminLogsByHR(hrId, logType))

    } else if(reportBy === 'patient'){
        if(!patientId){
            alert.error('Please select patient');
            return;
        }  
        setLogType('patientlog');
        dispatch(searchAdminLogsByPatient(patientId, logType))
    }
  }

  const resetLogs = () => {
    dispatch({
        type: SEARCH_LOG_RESET
    })
} 

  return (
    <>
       <MetaData title="Manage Logs"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        <h5>
                            <i className='bx bxs-cog'></i> <b>&nbsp;Manage Logs </b>
                        </h5>
                        <hr />

                
                       <div className="row cardWrapper">
                        <div className={`cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                            onClick={() => setReportBy("doctor")}>
                        <img src={doctorIcon} alt="" height="80" width="80"/>
                            Doctor
                        </div>

                        <div className={`cardButton ${reportBy === "nurse" ? "cardActive" : ""}`} 
                            onClick={() => setReportBy("nurse")}>
                        <img src={hrIcon} alt="" height="80" width="80"/>
                            Nurse
                        </div>

                        <div className={`cardButton ${reportBy === "patient" ? "cardActive" : ""}`}
                            onClick={() => setReportBy("patient")}>
                        <img src={patientIcon} alt="" height="80" width="80"/>
                            Patient
                        </div>
                    </div>

                    {/* See List */}
                <div>
                {reportBy === "doctor" ?  <>
                <div className="row-display">
                <div className="col-md-3 mt-4">
                <label className="profile-label">Select Doctor  <span style={{color: 'red'}}> *</span>  </label>
                <Select
                    options={doctorOptions}
                    onChange={getDoctorProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-4 mt-4">
                    <label className="profile-label">Select Type </label>
                    <select
                        className="form-control"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                    >
                    <option value="default">Select Type</option>
                    <option value="logs">login/logout</option>
                    <option value="patient">View Patient Profile</option>
                    <option value="accountCreated">Account Created</option>
                    <option value="report">Generated a Report</option>
                    <option value="docUpload">Uploaded a document</option>
                    </select>
                </div>

                <div className="col-md-3 mt-3">
                    <label className="profile-label">Action</label>
                    <button className="submit-btn" onClick={searchLogs}>Search</button>
                </div>
                </div>
                </> : reportBy === "nurse" ? <>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label className="profile-label">Select Nurse  <span style={{color: 'red'}}> *</span>  </label>
                <Select
                    options={hrOptions}
                    onChange={getHRProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-4 mt-4">
                    <label className="profile-label">Select Type </label>
                    <select
                        className="form-control"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                    >
                    <option value="default">Select Type</option>
                    <option value="logs">login/logout</option>
                    <option value="patient">View Patient Profile</option>
                    <option value="accountCreated">Account Created</option>
                    <option value="targets">Add Time</option>
                    <option value="report">Generated a Report</option>
                    <option value="report">Uploaded a document</option>
                    </select>
                </div>

                <div className="col-md-4 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={searchLogs}>Search</button>
                </div>
                </div>
                </> : <>  {/*Select patient */}
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select Patient  <span style={{color: '#8FBB2C'}}> *</span>  </label>
                <Select
                    options={options}
                    onChange={getPatientProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-4 mt-4">
                    <label>Select Type </label>
                    <select
                        className="form-control"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                    >
                    <option value="patientlog">Complete logs</option>
                    </select>
                </div>

                <div className="col-md-4 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={searchLogs}>Search</button>
                </div>
                </div>
                
                
                </>
                }
                </div>
                {/* List ends here */}    
                </div>
              
                <hr />
                {loading ? <Loader /> : <>
                {logs && logs.length > 0 ? <>
                    <div className="row-display">
                        <small className="pt-2 mt-2"><b>Results Found <span style={{color: '#8FBB2C'}}>( {logs && logs.length} )</span></b></small>
                        <span className="manage_logs_btn" onClick={resetLogs}><i className='bx bx-slider-alt'></i> Reset Logs</span>
                    </div>

                    {logType === 'logs' ? <>
                        <LoginLogoutLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'patient' ? <>
                        <ViewPatientProfileLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'targets' ? <>
                        <TargetsLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'report' ? <>
                        <GenerateReportLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'accountCreated' ? <>
                        <AccountCreatedLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'patientlog' ? <>
                        <PatientLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""} 
                </> : <>
                    <p className="text-center" style={{color: 'red'}}><small>No Result Found.</small></p>
                </>}
                </>}

                </div>
        </section>
    </>
  )
}

export default ManageLogs