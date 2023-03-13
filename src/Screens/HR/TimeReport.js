    import React, { useEffect, useState, Fragment, useRef } from 'react';
    import MetaData from '../../layouts/MetaData';
    import  HRSidebar from '../../components/HR/HRSidebar';
    import HRTopBar from '../../components/HR/HRTopbar';
    import { getHRPatients, getTimeReport, getTimeReportCCM } from '../../actions/HRActions';
    import {useSelector, useDispatch} from 'react-redux';
    import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';
    import moment from 'moment';
    import { Link, useHistory } from 'react-router-dom';
    import { useAlert } from 'react-alert';
    import Loader from '../../layouts/Loader';
    import {Badge} from 'react-bootstrap';
    import TimeReportPDF from '../../components/TimeReportPDF';
    import { useReactToPrint } from 'react-to-print';
    import patientProfileImg from '../../assets/Images/doctorIcon.png';

    const TimeReport = () => {
        const dispatch = useDispatch();
        const alert = useAlert();
        const history = useHistory();

        const componentRef = useRef();

        const handlePrint = useReactToPrint({
            pageStyle:"A5",
            documentTitle:  "Time Report",
            content: () => componentRef.current,
        });

        const [patientId, setPatientId] = useState('');
        const [startDate, setStartDate] = useState(moment().clone().startOf('month').format('YYYY-MM-DD'));
        const [endDate, setEndDate] = useState(moment().clone().endOf('month').format('YYYY-MM-DD'));
        const [reportCategory, setReportCategory] = useState('RPM');
        
        const { user} = useSelector(state => state.auth);
        const {  error, hrpatients} = useSelector(state => state.hrPatients);
        const {  loading, targets, totalTime, totalInteractiveMinutes, totalNonInteractiveMinutes} = useSelector(state => state.target);


        let id = user._id;

        useEffect(() => {
            if(error) {
                alert.error(error);
            }

            dispatch({ type: RESET_TIME_REPORT_DATA });

            dispatch(getHRPatients(id));
        }, [dispatch])

        const submitHandler = () => {
            // var check = moment(new Date(), 'YYYY/MM/DD');

            // let month = check.format('M');
            // month = Number(month)
            // var year = check.format('YYYY');

            if(!patientId) {
                alert.error('Please select patient');
                return;
            } else if (!startDate) {
                alert.error('Please select start date');
                return;
            } else if(!endDate) {
                alert.error('Please select end date');
                return;
            } else {
                if(reportCategory === 'RPM'){
                    dispatch(getTimeReport(patientId, startDate, endDate));
                } else {
                    dispatch(getTimeReportCCM(patientId, startDate, endDate)); 
                }
            }    
        }

        const resetData = () => {
            dispatch({ type: RESET_TIME_REPORT_DATA });
            setPatientId("");
            setStartDate("");
            setEndDate("");
        }
    return <Fragment>
        <MetaData title="Time Report" />
                <HRSidebar />
                
                <section className="home-section">
                    {/* TopBar */}  
                    <HRTopBar />


                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                            <div className="home-content">
                                <div className="container">
                                    <div className="row-display">
                                        
                                    <h5 style={{color: '#8FBB2C'}}>
                                        <i className='bx bx-filter'></i> <strong>&nbsp;Time Report for RPM </strong>
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

                                    
                                    <div className="row">
                                    <div className="col-md-4">
                                    <label className="form-label" htmlFor="from">Select Patient </label>
                                        <select 
                                            label="From" 
                                            name="from" 
                                            className="form-control"
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                        >
                                        <option value="SelectPatient">Select Patient</option>
                                        {hrpatients && hrpatients.filter(item => item?.block === false).map((patient, index) => (
                                            <option key={index} value={patient._id}> {patient.firstname} {patient.lastname} -  {moment(patient.DOB).format("ll")} </option>
                                        ))}
                                        </select>
                                    </div>


                                    <div className="col-md-4">
                                    <label className="form-label" htmlFor="from">From </label>
                                        <input 
                                            label="From" 
                                            name="from" 
                                            type="date" 
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}

                                        />
                                    </div>

                                <div className="col-md-4">     
                                    <label className="form-label" htmlFor="to">To </label>
                                        <input  
                                            name="to" 
                                            type="date" 
                                            className="form-control"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                </div>

                                </div>  {/* First Row Ends Here */}

                                <div className="mt-1" style={{float: 'right'}}>     
                                    <button  
                                        name="submit" 
                                        type="submit" 
                                        className="btn btn-outline-primary btn-sm mt-3"
                                        onClick={submitHandler}
                                    >
                                    <i className='bx bx-paper-plane'></i> Submit
                                    </button>
                                </div>

                                <br/><br/><br/>
                                

                                {/* Targets Display */}
                                {loading ? <Loader /> : <>
                                
                                {targets && targets.length > 0 ? <Fragment>
                                    <hr />
                                    <div className="container">
                                        <div className="row-display">
                                            <h5 style={{color: '#8FBB2C'}}>
                                                <i className='bx bxs-watch'></i> <strong>&nbsp;Time Tracking </strong>
                                            </h5>

                                            <div>
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
                                                        <i className='bx bxs-file-pdf' style={{color:'#F40F02'}}></i> Download PDF
                                                </button> &nbsp;&nbsp;
                                                
                                                <button className="btn btn-outline-danger btn-sm" onClick={resetData}>Reset</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                            <div className="row-display">
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
                                    <br />
                    
                                    {targets.map((trgt, index) => ( 
                                    <div key={index}>
                                        <div className="row-display">
                                        <div className="col-lg-5">
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient Name: </label> 
                                                <label className="report-label ml-2"> <b>{trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname} </b></label>

                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient Gender: </label> 
                                                <label className="report-label ml-2">{trgt?.assigned_patient_id?.gender}</label>
                                            </div>
    
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient Email: </label> 
                                                <label className="report-label ml-2">{trgt?.assigned_patient_id?.email}</label>
                                            </div>
    
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Patient DOB: </label> 
                                                <label className="report-label ml-2">{moment(trgt?.assigned_patient_id?.DOB).format("ll")}</label>
                                            </div>
                                        </div>

                                        {/* Time added details */}
                                        <div className="col-lg-4">
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Start Date: </label> 
                                                <label className="report-label ml-2"> {trgt?.startDate || 'N/A' }</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">End Date: </label> 
                                                <label className="report-label ml-2">{trgt?.endDate || 'N/A' }</label>
                                            </div>
    
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Start Time: </label> 
                                                <label className="report-label ml-2">{trgt?.startTime || 'N/A'}</label>
                                            </div>
    
                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">End Time: </label> 
                                                <label className="report-label ml-2">{trgt?.endTime || 'N/A'}</label>
                                            </div>

                                            <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Category: </label> 
                                                <label className="report-label ml-2" style={{fontWeight: 'bold'}}>{reportCategory}</label>
                                            </div>
                                            
                                            {trgt?.interactiveMinutes === true ? <>
                                                <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Minutes Type: </label> 
                                                <label className="report-label ml-2"> <span>
                                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Interactive Minutes</Badge>
                                                </span>
                                                </label> 
                                            </div>
                                            </> : null}

                                            {trgt?.interactiveMinutes === false ? <>
                                                <div className="row-display pl-4 pr-4">
                                                <label className="profile-label">Minutes Type: </label> 
                                                <label className="report-label ml-2"> <span>
                                                    <Badge pill bg="danger text-white" style={{fontSize: '12px', fontWeight: 300}}>Non-interactive Minutes</Badge>
                                                </span>
                                                </label> 
                                            </div>
                                            </> : null}
                                        </div>
                                        
                                        {/* Notes added */}
                                        <div className="col-lg-3">
                                            <div className="pl-4 pr-4">
                                                <label className="profile-label">Time Calculated : </label> 
                                                <p className="report-label" style={{color: 'green', fontWeight: 'bold'}}> {trgt?.timeSpentInMinutes} mins</p>
                                                
                                                <label className="profile-label">Date Added : </label> 
                                                <p className="report-label"> {moment(trgt?.createdAt).format("ll")}</p>
                                            </div>
                                        </div>
                
                                        </div>
    
                                        <div className="row-display-secondary">
                                                <div className="mt-3 mr-3">
                                                    <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                                </div>
                                                <div className="bubble bubble-alt">  
                                                    
                                                    <b className="text-white" style={{letterSpacing: '1px'}}> {trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname}</b><br/>
                                                                        
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
                        </div>
                    </div>
                </section>
    </Fragment>
    };

    export default TimeReport;
