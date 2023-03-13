import React, {Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {  
    getTimeReportCCM, 
} from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
// import {ProgressBar, Badge} from 'react-bootstrap';
import patientProfileImg from '../../assets/Images/doctorIcon.png';


const CCMMinutesSpent = ({patientId}) => {

  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  let startDate = '2023/03/01';
  let endDate = '2023/03/31'

  const { loading, targets, totalTime, totalInteractiveMinutes, totalNonInteractiveMinutes} = useSelector(state => state.target);

    useEffect(() => {
        setCount((count) => count + 1);
            dispatch(getTimeReportCCM(patientId, startDate, endDate));
        return
    }, []);

    const refreshHandler = () => {
        dispatch(getTimeReportCCM(patientId, startDate, endDate)); 
    }

    const downloadFile = (fileName) => {
        window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
      }

  return (
    <div>
         {loading ? <Loader /> : <>
                    {targets && targets.length > 0 ? <Fragment>
                        <br />
                        <div className="container row-display">
                            <div className="col-md-12">
                            <h5 style={{color: '#8FBB2C'}}>
                                <i className='bx bxs-watch'></i> <strong>&nbsp;CCM Minutes Added </strong>
                            </h5>
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
                                    
                                    <hr />
                                    {targets && targets.map((trgt, index) => ( 
                                    <div className="m-5" key={index}>
                                        
                                        <div className="row-display">
                                        <div className="col-lg-3">
                                            <div className="row-display">
                                                <label className="profile-label">Start Date: </label> 
                                                <label className="report-label ml-2"> {moment(trgt?.startDate).format('MM/DD/YYYY') || 'N/A' }</label>
                                            </div>
    
                                            <div className="row-display">
                                                <label className="profile-label">End Date: </label> 
                                                <label className="report-label ml-2">{moment(trgt?.endDate).format('MM/DD/YYYY') || 'N/A' }</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="row-display">
                                                    <label className="profile-label">Start Time: </label> 
                                                    <label className="report-label ml-2">{moment(trgt?.startTime, ["HH.mm"]).format("hh:mm a") || 'N/A'}</label>
                                                </div>

                                                <div className="row-display">
                                                    <label className="profile-label">End Time: </label> 
                                                    <label className="report-label ml-2">{moment(trgt?.endTime, ["HH.mm"]).format("hh:mm a") || 'N/A'}</label>
                                            </div>
                                        </div>

                                        <div className="col-md-01">
                                        </div>
                                            
                                        <div className="col-md-01">
                                            <h5 className="display-4"> {trgt?.timeSpentInMinutes < 10 ? '0'+trgt?.timeSpentInMinutes : trgt?.timeSpentInMinutes}</h5>
                                        </div>
                                        {/* Time added details */}
                                        <div className="col-lg-2">
                                                <div className="row-display">
                                                {trgt?.interactiveMinutes === true ? <> 
                                                     <strong style={{color: 'green'}}>Interactive Minutes added</strong>
                                                </> : <> 
                                                    <strong style={{color: 'red'}}>Non-interactive Minutes added</strong>
                                                </> }    
                                            </div>
                                        </div>
                                        
                                        {/* Notes added */}
                                            
                                        </div>
    
                                        <div className="row-display-secondary">
                                                <div className="mt-3 mr-3">
                                                    <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                                </div>
                                                <div className="bubble bubble-alt">  
                                                    
                                                    <p className="text-white p-1" style={{fontWeight: 600}}>{trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname}</p>
                                                                        
                                                    <p>{trgt?.conclusion} <br/><br/> 
                                                    
                                                    {trgt?.fileName ? <> 
                                                        <button className="btn btn-sm btn-outline-warning" onClick={() => downloadFile(trgt?.fileName)}>{trgt?.fileName} </button>   
                                                    </> : null}
                                                    

                                                    <p className="mt-3"> Added date : {moment(trgt?.createdAt).tz("America/New_York").format("MM-DD-YYYY")}</p>
                                                    </p>
                                                </div>
                                            </div>
                                        <hr />
                                    </div>

                                ))}
                            </Fragment> : <div className="text-center mt-3 pb-2">
                               <p>CCM minutes not found</p>
                               <button className="btn btn-outline-primary btn-sm" onClick={() => refreshHandler()}>Refresh Minutes</button>
                            </div>}
                            </>}
                    </div>
                )
            }

export default CCMMinutesSpent;