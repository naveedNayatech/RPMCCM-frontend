import React, {Fragment, useEffect, useState} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { useHistory, Link } from 'react-router-dom';
import { getTimeReportByHR, getTimeReportCCMByHR } from '../../actions/HRActions';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';
import moment from 'moment';
import patientProfileImg from '../../assets/Images/doctorIcon.png';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';

const MinutesHistory = () => {
  const dispatch = useDispatch();  
  const history = useHistory();
  const { user } = useSelector(state => state.auth);
  const { loading, targets, totalTime, totalInteractiveMinutes, totalNonInteractiveMinutes} = useSelector(state => state.target);
  
  const [reportCategory, setReportCategory] = useState('RPM');

  const [startDate, setStartDate] = useState(moment().clone().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().clone().endOf('month').format('YYYY-MM-DD'))
  let hrId = user._id;
  
  useEffect(() => {
    // if(error) {
    //     alert.error(error);
    // }

    dispatch({ type: RESET_TIME_REPORT_DATA });

    if(reportCategory === 'RPM'){
        dispatch(getTimeReportByHR(hrId, startDate, endDate)); 
    } else {
        dispatch(getTimeReportCCMByHR(hrId, startDate, endDate));  
    }

}, [dispatch, reportCategory, startDate, endDate]);


    const downloadFile = (fileName) => {
        window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
    }

    
  return (
    <>
    <MetaData title="Minutes History" />
        <HRSidebar />
        
        <section className="home-section">
            {/* TopBar */}  
            <HRTopBar />

            <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                        <div className="row-display">        
                        <h5 style={{color: '#8FBB2C'}}>
                            <i className='bx bx-filter'></i> <strong>&nbsp;Minutes History </strong>
                        </h5>

                            <div className="row-display">
                                <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}>
                                    <i className='bx bx-arrow-back'></i>
                                </button>

                                &nbsp;&nbsp;
                                <Link to="/Nurse/Dashboard">
                                    <button className="btn btn-secondary btn-sm">
                                    <i className='bx bxs-home'></i>
                                    </button>
                                </Link>
                            </div>  
                        </div>
                        <hr />

                        <div className="row-display">
                                <h5 style={{color: '#8FBB2C'}}>
                                    <i className='bx bxs-watch'></i> 
                                    <strong>&nbsp;{reportCategory} Minutes Added </strong>
                                    <p><small>For the month of {moment().format('MMMM')} 2023</small></p>
                                </h5>

                                <div style={{float: 'right', width: '190px'}}>
                                    <label className="profile-label">Start Date</label>
                                    <input type="date" class="form-control" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                                </div>

                                <div style={{float: 'right', width: '190px'}}>
                                    <label className="profile-label">End Date</label>
                                    <input type="date" class="form-control" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                                </div>

                                <div style={{float: 'right', width: '190px'}}>
                                <label className="profile-label">Category</label>
                                    <select 
                                        className="form-control" 
                                        name="category"
                                        value={reportCategory}
                                        onChange={e => setReportCategory(e.target.value)}
                                    >
                                        <option value="RPM">RPM Category</option>
                                        <option value="CCM">CCM Category</option>
                                    </select>
                                </div>
                            </div>

                    {/* First Row Ends Here */}
                    {loading ? <Loader /> : <>
                    {targets && targets.length > 0 ? <Fragment>
                                    
                        <br />
                        <div className="row-display">
                            <div className="col-md-12">
                                 
                            <br />

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
                                                <label className="profile-label">Name: </label> 
                                                <label className="profile-label ml-2"> {trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">D.O.B: </label> 
                                                <label className="report-label ">{moment(trgt?.assigned_patient_id?.DOB).format("YYYY-MM-DD")}</label>
                                            </div>
                                        </div>

                                        {/* Time added details */}
                                        <div className="col-lg-3">
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">S / D: </label> 
                                                <label className="report-label ml-2"> {trgt?.startDate || 'N/A' }</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">E / D: </label> 
                                                <label className="report-label ml-2">{trgt?.endDate || 'N/A' }</label>
                                            </div> 
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className="row-display pl-4 pr-4">
                                                    <label className="profile-label">S / T: </label> 
                                                    <label className="report-label ml-2">{moment(trgt?.startTime, ["HH.mm"]).format("hh:mm a") || 'N/A'}</label>
                                                </div>
        
                                                <div className="row-display pl-4 pr-4">
                                                    <label className="profile-label">E / T: </label> 
                                                    <label className="report-label ml-2">{moment(trgt?.endTime, ["HH.mm"]).format("hh:mm a") || 'N/A'}</label>
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
                                                <button className="btn btn-link" onClick={() => downloadFile(trgt?.fileName)}>{trgt?.fileName} </button>   
                                            </> : null}
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
                            </Fragment> : <div className="text-center" style={{marginTop: '70px'}}>
                                <i className="fas fa-search-minus" style={{fontSize: '60px', color: '#8FBB2C'}}></i>
                                <p className="mt-2">No Minutes added in <span style={{ fontWeight: 'bold' }}>
                                    {moment().format('MMMM')}</span> 
                                    &nbsp; in  <span style={{fontWeight: 'bold'}}>{reportCategory}</span> category.</p>
                                </div>}
                            </>}

                        {/* Result of targets ends here */}
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}

export default MinutesHistory