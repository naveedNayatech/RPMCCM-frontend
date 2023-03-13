import React, {Fragment, useEffect, useState, useRef} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import patientProfileImg from '../../assets/Images/doctorIcon.png';
import { Link, useHistory } from 'react-router-dom';
import { getHrLists, getDoctors } from '../../actions/adminActions';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeReportCCMByHR, getTimeReportCCMByDR } from '../../actions/HRActions';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import TimeReportPDF from '../../components/TimeReportPDF';
import Loader from '../../layouts/Loader';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';


const TimeReportCCM = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [reportBy, setReportBy] = useState('hr');
  const [startDate, setStartDate] = useState(moment().clone().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().clone().endOf('month').format('YYYY-MM-DD'));
  const [hrId, setHRId] = useState('');
  const [drId, setDRId] = useState('');

  const { hrs } = useSelector(state => state.hrslist);
  const { doctors } = useSelector(state => state.doctor);
  const { loading, targets, totalTime, totalInteractiveMinutes, totalNonInteractiveMinutes} = useSelector(state => state.target);
  const [reportCategory, setReportCategory] = useState('CCM');
  

  useEffect(() =>{

    dispatch(getHrLists());
    dispatch(getDoctors(10, 1));

    dispatch({ type: RESET_TIME_REPORT_DATA });
  }, [dispatch])

  const componentRef = useRef();
        const handlePrint = useReactToPrint({
            pageStyle:"A5",
            documentTitle:  "Time Report",
            content: () => componentRef.current,
    });



  const submitHandler = () => {
    if(reportBy === 'hr'){
        if(!hrId && !startDate && !endDate){
            alert.error('Please full out all required fields');
            return;
        } 
        else {
             dispatch(getTimeReportCCMByHR(hrId, startDate, endDate)); 
        }
    }
    else {
        if(reportBy === 'doctor'){
        if(!drId && !startDate && !endDate){
            alert.error('Please fill out all required fields');
            return;
        } else {
        dispatch(getTimeReportCCMByDR(drId, startDate, endDate)); 
        return;
        }
       }
     }
    }


    const resetData = () => {
        dispatch({ type: RESET_TIME_REPORT_DATA });
    }

    const downloadFile = (fileName) => {
        window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
    }

  return (
    <>
        <MetaData title="Time Report | CCM"/>
            <Sidebar />    

            <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="shadow-lg rounded-card m-3" style={{backgroundColor: '#FAFAFA'}}>
            <div className='searchArea p-3'>
                <div className="home-content">

                <div className="row-display">
                    <h5 style={{color: '#8FBB2C'}}>
                        <i className='bx bx-filter'></i> 
                        <strong>&nbsp;Time Report for CCM </strong>
                    </h5>

                    <div className="row-display">
                        <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}>
                            <i className='bx bx-arrow-back'></i>
                        </button>
                        &nbsp;&nbsp;
                        <Link to="/adminDashboard" className="btn btn-secondary btn-sm">
                            <i className='bx bxs-home'></i>
                        </Link>
                        <Link to="/Admin/Report/RPM" className="link m-2">
                            RPM Time Report
                        </Link>
                    </div>   
                </div>
                <hr />

                <span className="notes-header"><b>Note: </b> You can generate CCM time report by doctor and by Nurse.</span>

                <div className="row cardWrapper">
                    <div className={`cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                    onClick={() => setReportBy("doctor")}>
                        <i className="fas fa-user-md" style={{color: '#FFF', fontSize: '66px'}}></i>
                        <p> By Doctor </p>
                    </div>
                    
                    
                    <div className={`cardButton ${reportBy === "hr" ? "cardActive" : ""}`}
                    onClick={() => setReportBy("hr")}>
                        <i className="fas fa-users" style={{color: '#FFF', fontSize: '66px'}}></i>
                        <p> By Nurse </p>
                    </div>
                </div>
                <br />

                {/* first row */}
                <div className="row">
                    <div className="col-md-3">
                    
                    {reportBy === 'hr' ? <>    
                    <label className="form-label" htmlFor="from">Select Nurse <span style={{color: 'red'}}>*</span></label>
                    <select 
                        className="form-control"
                        value={hrId}
                        onChange={(e) => setHRId(e.target.value)}
                        >

                        <option>Select Nurse</option>
                        {hrs && hrs.map((hr, index) => (
                                <option value={hr?._id} key={index}> HR. {hr?.firstname} {hr?.lastname} {hr?.npinumber} </option>
                            ))} 
                    </select>                        
                    </>
                    : <>
                    <label className="form-label" htmlFor="from">Select Doctor <span style={{color: 'red'}}>*</span></label>
                    <select 
                        className="form-control"
                        value={drId}
                        onChange={(e) => setDRId(e.target.value)}
                        >
                        <option>Select Doctor</option>
                        {doctors && doctors.map((doctor, index) => (
                                <option value={doctor?._id} key={index}> Dr. {doctor?.firstname} {doctor?.lastname} {doctor?.npinumber} </option>
                            ))} 
                    </select>                        
                    </>}
                </div>


                    <div className="col-md-3">
                    <label className="form-label" htmlFor="from">Start Date <span style={{color: 'red'}}>*</span></label>
                        <input 
                            label="From" 
                            name="from" 
                            type="date" 
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}

                        />
                    </div>

                    <div className="col-md-3">     
                    <label className="form-label" htmlFor="to">End Date <span style={{color: 'red'}}>*</span></label>
                    <input  
                        name="to" 
                        type="date" 
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    </div>

                    <div className="col-md-3 mt-2">     
                    <label>&nbsp;&nbsp;&nbsp;</label>
                    <button  
                        name="submit" 
                        type="submit" 
                        className="btn add-staff-btn mt-4"
                        onClick={submitHandler}
                    >
                        Generate Report
                    </button>
                      </div>
                     </div>

               </div>
              </div>

               {/* First Row Ends Here */}
               {loading ? <Loader /> : <>
                    {targets && targets.length > 0 ? <Fragment>
                                    
                        <br />
                        <div className="container row-display">
                            <div className="col-md-12">
                            <div className="row-display">
                                <h5 style={{color: '#8FBB2C'}}>
                                    <i className='bx bxs-watch'></i> <strong>&nbsp;RPM Minutes Added </strong>
                                </h5>

                                <div style={{float: 'right', marginRight: '40px'}}>
                                    <div className="row">
                                    <div
                                        style={{ display: "none" }} // This make ComponentToPrint show   only while printing
                                    > 
                                    <TimeReportPDF ref={componentRef} 
                                        targets={targets}
                                        timeSpent={totalTime}
                                        from= {startDate}
                                        to= {endDate}
                                        category={reportCategory}
                                    />
                                    </div>
                                    
                                    <button onClick={handlePrint} 
                                        className="btn btn-outline-primary btn-sm">
                                            <i className='bx bxs-file-pdf' style={{color:'#F40F02'}}></i> Download Report .PDF</button>
                                            <button className="btn btn-danger btn-sm ml-2" onClick={resetData}>Reset</button>
                                        </div>
                                    </div>


                            </div>     
                            
                            <div className="row-display-secondary">
                                <div className="col-md-4 card p-4 m-2 text-center">
                                    <h2>{totalTime} mins</h2>
                                    <p><b>Total Time Spent</b></p>
                                </div>

                                <div className="col-md-4 card p-4 m-2 text-center">
                                    <h2>{totalInteractiveMinutes} mins</h2>
                                    <p style={{color: 'green'}}><b>Interactive Minutes</b></p>
                                </div>

                                <div className="col-md-4 card p-4 m-2 text-center">
                                    <h2>{totalNonInteractiveMinutes} mins</h2>
                                    <p style={{color: 'red'}}><b>Non-Interactive Minutes</b></p>
                                </div> 
                                </div>
                              </div>        
                            </div>
                            <br />

                                    {targets && targets.map((trgt, index) => ( 
                                    <div className="m-2" key={index}>
                                        
                                        <div className="row-display">
                                        <div className="col-lg-3">
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient Name: </label> 
                                                <label className="report-label ml-2"> {trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient DOB: </label> 
                                                <label className="report-label ml-2">{moment(trgt?.assigned_patient_id?.DOB).format("YYYY-MM-DD")}</label>
                                            </div>
                                        </div>

                                        {/* Time added details */}
                                        <div className="col-lg-3">
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Start Date: </label> 
                                                <label className="report-label ml-2"> {trgt?.startDate || 'N/A' }</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">End Date: </label> 
                                                <label className="report-label ml-2">{trgt?.endDate || 'N/A' }</label>
                                            </div> 
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className="row-display pl-4 pr-4">
                                                    <label className="profile-label">Start Time: </label> 
                                                    <label className="report-label ml-2">{trgt?.startTime || 'N/A'}</label>
                                                </div>
        
                                                <div className="row-display pl-4 pr-4">
                                                    <label className="profile-label">End Time: </label> 
                                                    <label className="report-label ml-2">{trgt?.endTime || 'N/A'}</label>
                                            </div>
                                        </div>

                                        <div className='col-lg-1'>
                                            <h5 className="display-4"> {trgt?.timeSpentInMinutes < 10 ? '0'+trgt?.timeSpentInMinutes : trgt?.timeSpentInMinutes}</h5>    
                                        </div>

                                        {/* Notes added */}
                                        <div className="col-lg-3">
                                            <div className="pl-4 pr-4">
                                              
                                            {trgt?.interactiveMinutes === true ?
                                                <b style={{color: 'green'}}>Interactive Minutes</b> 
                                                : 
                                                <b style={{color: 'red'}}>Non-Interactive Minutes</b>
                                            }
                                                
                                            <label className="report-label">added in <span style={{fontWeight: 'bold'}}>
                                                {reportCategory} category</span>
                                            </label>
                                                
                                            {trgt?.fileName ? <>
                                            <label className="profile-label">Attachment: </label> 
                                                <p><button className="btn btn-link" onClick={() => downloadFile(trgt?.fileName)}>{trgt?.fileName} </button>   
                                                </p></> : null}
                                            </div>
                                        </div>
                                        </div>
    
                                        <div className="row-display-secondary">
                                                <div className="mt-3 mr-3">
                                                    <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                                </div>
                                                <div className="bubble bubble-alt">  
                                                    
                                                    <b className='text-white' 
                                                        style={{letterSpacing: '1px'}}> 
                                                        {trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname}
                                                    </b>
                                                    <br/>
                                                                        
                                                    <p className="mt-1 mr-3">{trgt?.conclusion} <br/> 
                                                    <p className="mt-1"><b>{moment(trgt?.createdAt).tz("America/New_York").format("MM-DD-YYYY")}</b></p>
                                                    </p>
                                                </div>
                                            </div>
                                        <hr />
                                    </div>

                                ))}
                            </Fragment> : ''}
                            </>}
            </div>
            </section>
    </>
  )
}

export default TimeReportCCM