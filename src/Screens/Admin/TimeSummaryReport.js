import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Select from 'react-select';
import { useAlert } from 'react-alert';
import { getDoctors, getHrLists, getTimeSummaryReportByDoctor, getTimeSummaryReportByHR, changeBilledStatus } from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../../layouts/Loader';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import ExportSummaryReportToCSV from '../../components/ExportSummaryReportToCSV';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import hrIcon from '../../assets/Images/network.png';


const TimeSummaryReport = () => {
  let totalCharges = [];
  let missedOpportunities = [];

  const history = useHistory();

  const dispatch = useDispatch();
  const [reportBy, setReportBy] = useState('doctor');
  const alert = useAlert();

  const { error, doctors } = useSelector(state => state.doctor);
  const {  hrs } = useSelector(state => state.hrslist);
  const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);
  const [doctorId, setDoctorId] = useState("");
  const [hrId, sethrId] = useState("");

  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2023');
  const [category, setCategory] = useState('RPM');
  const [query, setQuery] = useState("all");


  useEffect(() => {
    if(error){
        alert.error(error);
    }

    dispatch(getDoctors(10, 1));
    dispatch(getHrLists());
    
    dispatch({
      type: TIME_SUMMARY_REPORT_RESET
    })

}, [dispatch]);


  const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: [doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ")})
  ))

  const getDoctorProfile = (doctor) => {
    setDoctorId(doctor.value);
  }

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const generateFinanceReport = () => {
    if(reportBy === 'hr') {
      if(!hrId) {
        alert.error('Please select HR');
        return; 
      } else {
        dispatch(getTimeSummaryReportByHR(hrId, month, year, category));    
      } 
    } else {
      dispatch(getTimeSummaryReportByDoctor(doctorId, month, year, category));
    }
  }

  const resetReport = () => {
    dispatch({
        type: TIME_SUMMARY_REPORT_RESET
    })
  } 

  const billedStatus = (patientId) => {
    var confirmation = window.confirm(`Are you sure you want to change status to billed ?`);
        if(confirmation){
        dispatch(changeBilledStatus(patientId, month, category));
        generateFinanceReport();
      }
    }

  return (
    <>
    <MetaData title="Financial Report RPM"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg mb-5 mr-4 ml-4 rounded-card">
            <div className='searchArea p-3'>
            <div className="row-display">
                  <div className="col-md-8">
                    <h5 style={{color: '#0044ad'}}>
                      <i className='bx bxs-bar-chart-alt-2'></i> <b>&nbsp;Financial Report For RPM </b>
                    </h5>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></button> &nbsp;
                  <Link to="/financialReport/CCM" className="link pt-2">CCM Financial Report</Link> &nbsp;
                  <Link to="/financialReport/history" className="link pt-2">View History</Link> &nbsp;
            </div>

            <hr />
                <div className="row cardWrapper">
                    <div className={`cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                        onClick={() => setReportBy("doctor")}>
                        <img src={doctorIcon} alt="" height="60" width="60"/>
                        <p>By Doctor</p>
                    </div>

                    <div className={`cardButton ${reportBy === "hr" ? "cardActive" : ""}`} 
                        onClick={() => setReportBy("hr")}>
                        <img src={hrIcon} alt="" height="60" width="60"/>
                          <p>By Nurse</p>
                    </div>
                </div>


                <div>
                  <div className="row-display">
                  <div className="col-md-3">
                  {reportBy === "doctor" ?                  
                    <>
                    <b>Select Doctor  <span style={{color: 'red'}}> *</span>  </b>
                    <Select
                        options={doctorOptions}
                        onChange={getDoctorProfile}
                        className="react-selectbox"
                    /> </> : <>
                    <b>Select Nurse  <span style={{color: 'red'}}> *</span>  </b>
                    <Select
                        options={hrOptions}
                        onChange={getHRProfile}
                        className="react-selectbox"
                    />
                    </>
                    } 
                </div>

                <div className="col-md-3 mt-4">
                    <select 
                      name="month" 
                      className="form-control"
                      value={month} 
                      onChange={e => setMonth(e.target.value)}
                      >
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                    <select 
                      name="month" 
                      className="form-control"
                      value={year} 
                      onChange={e => setYear(e.target.value)}
                      >
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                    <button className="submit-btn" onClick={generateFinanceReport}>Generate</button>
                </div>
                </div>
                </div>
            </div>

            {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                    <div className="row-display p-4">
                      <div style={{ 
                          fontSize: '14px',
                          backgroundColor: '#F95800',
                          color: '#FFF',
                          padding: '5px',
                          width: '180px',
                          borderRadius: '5px', 
                          textAlign: 'center',
                          height: '30px',
                      }}>Financial Report Preview
                      </div>

                    <div className="row-display">  
                    <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    
                        <div
                            style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                        > 
                        </div>
                        
                        <div>
                            <ExportSummaryReportToCSV csvData={timeSummaryReport} fileName={'FinancialReport'+ moment().format('YYYY-MM-DD')+'.csv'} />
                        </div>
                    </div>
                  </div>
              </> : null }

              <br/>             
            
              {loading ? <Loader /> : <>
                {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                  <div className="row-display pl-4" style={{width: '480px'}}>
                    <select 
                      className="form-control" 
                      style={{width: '350px'}}
                      defaultValue="all"
                      onChange={e => setQuery(e.target.value)}
                      >
                      <option value="all">Select Filteration</option>
                      <option value="readingsCompleted">Patients with readings {'>'} 16</option>
                      <option value="minutesCompleted">Patients with minutes {'>'} 20</option>
                       <option value="readingsORMinutesNotCompleted">Patients either readings or minutes completed </option>
                    </select>
                  </div>

                        <div className="row-display p-4">
                          <span>
                            <b style={{color: 'green'}}>{timeSummaryReport && timeSummaryReport.filter(obj => obj.totalReadings >=16).length} Readings Completed. </b>
                          </span>

                          <span>
                            <b style={{color: '#e3404f'}}>{timeSummaryReport && timeSummaryReport.filter(obj => obj.totalReadings < 16).length} Readings not completed. </b>
                          </span>
                          
                          <span>
                            <b style={{color: 'green'}}>{timeSummaryReport && timeSummaryReport.filter(obj => obj.totalMinutes >= 20).length} Minutes completed ( Minimum 20 ). </b>
                          </span>

                          <span>
                            <b style={{color: '#e3404f'}}>{timeSummaryReport && timeSummaryReport.filter(obj => obj.totalMinutes < 20).length} Minutes not completed. </b>
                          </span>

                        </div>
                        <div className="col-md-12">
                          <br />
                        <Table bordered hover>
                            <thead align="center">
                                <tr>
                                  <th>Sr.No</th>
                                  <th>Month</th>
                                  <th>Patient Name</th>
                                  <th>Total Readings </th>
                                  <th>Total Minutes</th>
                                  <th>CPT</th>
                                  <th>Payment</th>
                                  <th>Total</th>
                                  <th>Category</th>
                                  <th>Billed Status</th>
                                  <th>Action</th>
                                </tr>


                                {query === 'all' ? <>
                                  {timeSummaryReport && timeSummaryReport.sort((a, b) => (a.patientName > b.patientName) ? 1 : -1).map((summaryReport, index) => (
                                    <tr key={index}> 
                                      <td>{index + 1}</td>
                                      <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                      
                                      <td><Link className="link" style={{textDecoration: 'none', 
                                        color: "dodgerblue", 
                                        fontWeight: 'bold'}} 
                                        to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId 
                                        }}}>
                                          {summaryReport?.patientName}</Link></td>
                                      
                                      {/* Total Readings */}
                                      {summaryReport.totalReadings >= 16 ? <td style={{color: 'green', wordWrap: 'break-word',  fontWeight: 'bold'}}>{summaryReport?.totalReadings}</td> : <td style={{color: 'red', fontWeight: 'bold', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                      
                                      {/* Total Minutes */}
                                      {summaryReport?.totalMinutes < 20 ? <td style={{color: '#e3404f', fontWeight: 'bold'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{color: 'green', fontWeight: 'bold'}}>{summaryReport?.totalMinutes} mins</td>}

                                      {/* CPT Codes */}
                                      <td>
                                        {summaryReport.totalReadings >= 16 ? <text style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}> 99454</text> : <text style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99454</text>}
                                        {summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457</p> : summaryReport.totalMinutes >= 40 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457 <br /> 99458</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99457</p>}
                                      </td>

                                      {/* CPT Codes Payment*/}
                                      <td>
                                        {summaryReport.totalReadings >= 16 ? 
                                          <text style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$50.83 
                                          <b style={{display: 'none'}}>{totalCharges.push({charges: 50.83})}</b>
                                          </text> : <text style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$50.83 
                                          <b style={{display: 'none'}}>{missedOpportunities.push({charges: 50.83})}</b>
                                          </text>
                                        }

                                        {summaryReport?.totalMinutes < 20 ? <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$42.26 
                                          <b style={{display: 'none'}}>{missedOpportunities.push({ charges: 42.26})}</b> 
                                          </p> : summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  
                                          <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                          <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> 
                                          </p> : summaryReport.totalMinutes >= 40 ? 
                                          <p style={{fontSize: '16px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                          <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> <br /> $31.94 
                                          <b style={{display: 'none'}}>{totalCharges.push({charges: 31.94})} </b></p> : null
                                        }
                                      </td>  

                                      <td>
                                        {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $42.26 </b> : null}
                                        {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 40 ? <b> $74.20 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes < 20 ? <b> $50.83 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $93.09 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 40 ? <b> $125.03 </b> : null}
                                      </td>

                                      <td style={{fontWeight: 'bold'}}>RPM</td>

                                      {summaryReport?.totalMinutes >= 20 || summaryReport?.totalReadings >= 16 ? <>
                                        <td>{summaryReport?.billedStatus === true ? 
                                        <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'green'}}>Billed</p> : 
                                          <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'red'}}>Not Billed</p>}
                                        <p className="m-0 p-0"><small>Month of: {summaryReport?.Month}</small></p>
                                        </td>
                                      </> : <td>
                                      </td>}    
                                        

                                      {summaryReport?.totalReadings >= 16 || summaryReport?.totalMinutes >= 20 ? <>
                                      <td>
                                      {summaryReport?.billedStatus === true ? <> <i className='bx bx-check' style={{fontSize: '25px', color: 'green'}}></i> </>  
                                          : <> <button className="btn btn-outline-primary btn-sm"
                                          onClick={() => billedStatus(summaryReport?.patientId)}
                                          >Billed </button> </> }
                                      </td> </>: <td>
                                        </td>
                                      }     
                                    </tr>
                                  ))}
                                </> : query === 'readingsCompleted' ? <>
                                {timeSummaryReport && timeSummaryReport.sort((a, b) => (a.patientName > b.patientName) ? 1 : -1).filter(item => item?.totalReadings >= 16).map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>
                                    
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                    
                                    <td><Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId }}}>{summaryReport?.patientName}</Link></td>
                                    
                                    {/* Total Readings */}
                                    {summaryReport.totalReadings >= 16 ? <td style={{backgroundColor: '#58edaa', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td> : <td style={{backgroundColor: '#e3404f', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                    
                                    {/* Total Minutes */}
                                    {summaryReport?.totalMinutes < 20 ? <td style={{backgroundColor: '#e3404f', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{backgroundColor: '#58edaa', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td>}

                                    {/* CPT Codes */}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}> 99454</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99454</p>}
                                      {summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457</p> : summaryReport.totalMinutes >= 40 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457 <br /> 99458</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99457</p>}
                                    </td>

                                    {/* CPT Codes Payment*/}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? 
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 50.83})}</b>
                                        </p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({charges: 50.83})}</b>
                                        </p>
                                      }

                                      {summaryReport?.totalMinutes < 20 ? <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({ charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 40 ? 
                                        <p style={{fontSize: '16px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> <br /> $31.94 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 31.94})} </b></p> : null
                                      }
                                    </td>  

                                    <td>
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $42.26 </b> : null}
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 40 ? <b> $74.20 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes < 20 ? <b> $50.83 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $93.09 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 40 ? <b> $125.03 </b> : null}
                                    </td>

                                    <td style={{fontWeight: 'bold'}}>RPM</td>

                                    <td>{summaryReport?.billedStatus === true ? 
                                      <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'green'}}>Billed</p> : 
                                        <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'red'}}>Not Billed</p>}
                                      <p className="m-0 p-0"><small>Month of: {summaryReport?.Month}</small></p>
                                      </td>  

                                      <td>
                                      {summaryReport?.billedStatus === true ? <> <i className='bx bx-check' style={{fontSize: '25px', color: 'green'}}></i> </>  
                                          : <> <button className="btn btn-outline-primary btn-sm"
                                          onClick={() => billedStatus(summaryReport?.patientId)}
                                          >Billed </button> </> }
                                      </td>     

                                  </tr>
                                ))}
                                </> : query === 'minutesCompleted' ? <>
                                {timeSummaryReport && timeSummaryReport.sort((a, b) => (a.patientName > b.patientName) ? 1 : -1).filter(item => item?.totalMinutes >= 20).map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>

                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                    
                                    <td><Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId }}}>{summaryReport?.patientName}</Link></td>
                                    
                                    {/* Total Readings */}
                                    {summaryReport.totalReadings >= 16 ? <td style={{backgroundColor: '#58edaa', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td> : <td style={{backgroundColor: '#e3404f', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                    
                                    {/* Total Minutes */}
                                    {summaryReport?.totalMinutes < 20 ? <td style={{backgroundColor: '#e3404f', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{backgroundColor: '#58edaa', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td>}

                                    {/* CPT Codes */}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}> 99454</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99454</p>}
                                      {summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457</p> : summaryReport.totalMinutes >= 40 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457 <br /> 99458</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99457</p>}
                                    </td>

                                    {/* CPT Codes Payment*/}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? 
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 50.83})}</b>
                                        </p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({charges: 50.83})}</b>
                                        </p>
                                      }

                                      {summaryReport?.totalMinutes < 20 ? <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({ charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 40 ? 
                                        <p style={{fontSize: '16px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> <br /> $31.94 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 31.94})} </b></p> : null
                                      }
                                    </td>  

                                    <td>
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $42.26 </b> : null}
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 40 ? <b> $74.20 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes < 20 ? <b> $50.83 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $93.09 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 40 ? <b> $125.03 </b> : null}

                                    </td>

                                    <td style={{fontWeight: 'bold'}}>RPM</td>

                                    <td>{summaryReport?.billedStatus === true ? 
                                      <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'green'}}>Billed</p> : 
                                        <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'red'}}>Not Billed</p>}
                                      <p className="m-0 p-0"><small>Month of: {summaryReport?.Month}</small></p>
                                      </td>  

                                      <td>
                                      {summaryReport?.billedStatus === true ? <> <i className='bx bx-check' style={{fontSize: '25px', color: 'green'}}></i> </>  
                                          : <> <button className="btn btn-outline-primary btn-sm"
                                          onClick={() => billedStatus(summaryReport?.patientId)}
                                          >Billed </button> </> }
                                      </td>     

                                  </tr>
                                ))}
                                </> : query === 'readingsORMinutesNotCompleted' ? <> 
                                
                                {timeSummaryReport && timeSummaryReport.sort((a, b) => (a.patientName > b.patientName) ? 1 : -1).filter(item => item?.totalMinutes >= 20 || item?.totalReadings >= 16).map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>
                                    
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                    
                                    <td><Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId }}}>{summaryReport?.patientName}</Link></td>
                                    
                                    {/* Total Readings */}
                                    {summaryReport.totalReadings >= 16 ? <td style={{backgroundColor: '#58edaa', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td> : <td style={{backgroundColor: '#e3404f', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                    
                                    {/* Total Minutes */}
                                    {summaryReport?.totalMinutes < 20 ? <td style={{backgroundColor: '#e3404f', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{backgroundColor: '#58edaa', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td>}

                                    {/* CPT Codes */}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}> 99454</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99454</p>}
                                      {summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457</p> : summaryReport.totalMinutes >= 40 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457 <br /> 99458</p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}> 99457</p>}
                                    </td>

                                    {/* CPT Codes Payment*/}
                                    <td>
                                      {summaryReport.totalReadings >= 16 ? 
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 50.83})}</b>
                                        </p> : <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$50.83 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({charges: 50.83})}</b>
                                        </p>
                                      }

                                      {summaryReport?.totalMinutes < 20 ? <p style={{fontSize: '14px', color: 'red', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{missedOpportunities.push({ charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ?  
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> 
                                        </p> : summaryReport.totalMinutes >= 40 ? 
                                        <p style={{fontSize: '16px', color: 'green', fontWeight: 'bold'}}>$42.26 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 42.26})}</b> <br /> $31.94 
                                        <b style={{display: 'none'}}>{totalCharges.push({charges: 31.94})} </b></p> : null
                                      }
                                    </td>  

                                    <td>
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $42.26 </b> : null}
                                       {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes >= 40 ? <b> $74.20 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes < 20 ? <b> $50.83 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $93.09 </b> : null}
                                       {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 40 ? <b> $125.03 </b> : null}
                                    </td>

                                    <td style={{fontWeight: 'bold'}}>RPM</td>

                                    <td>{summaryReport?.billedStatus === true ? 
                                      <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'green'}}>Billed</p> : 
                                        <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'red'}}>Not Billed</p>}
                                      <p className="m-0 p-0"><small>Month of: {summaryReport?.Month}</small></p>
                                      </td>  

                                      <td>
                                      {summaryReport?.billedStatus === true ? <> <i className='bx bx-check' style={{fontSize: '25px', color: 'green'}}></i> </>  
                                          : <> <button className="btn btn-outline-primary btn-sm"
                                          onClick={() => billedStatus(summaryReport?.patientId)}
                                          >Billed </button> </> }
                                      </td>     

                                  </tr>
                                ))}
                                </> :null}
                                
                            </thead>
                            <tbody>
                                  
                            </tbody>
                          </Table>
                        
                    
                          <div style={{float: 'right'}}>
                            <b>Total Payment : </b> <h5>  <b style={{color: 'green'}}> $ {totalCharges.reduce((total, currentValue) => total = total + currentValue.charges,0).toFixed(2)} </b></h5>
                            <hr/>
                            <b style={{color: 'red'}}>Total Missed Opportunites : </b> <h5>  <b style={{color: 'red'}}> $ {missedOpportunities.reduce((total, currentValue) => total = total + currentValue.charges,0).toFixed(2)} </b></h5>
                            
                          </div>
                          <br/><br/><br/><br/><br/><br/><br/>
                        </div>


                   </> : null } 
                </>}
        </div>

        </section>
    </>
  )
}

export default TimeSummaryReport;