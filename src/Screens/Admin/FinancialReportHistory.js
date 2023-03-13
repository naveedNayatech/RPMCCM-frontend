import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getHrLists, getFinancialReportHistory } from '../../actions/adminActions';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import {FINANCIAL_REPORT_HISTORY_RESET} from '../../constants/adminConstants';

const FinancialReportHistory = () => {
  
  let totalCharges = [];
  let missedOpportunities = [];

  const dispatch = useDispatch();
  // const [reportBy, setReportBy] = useState('doctor');
  const alert = useAlert();
  const history = useHistory();

  
  const { error, doctors } = useSelector(state => state.doctor);
  const {  hrs } = useSelector(state => state.hrslist);
  const {loading, financialreportHistory} = useSelector(state => state.financialReportHistory);
  const [hrId, sethrId] = useState("");

  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2023');
//   const [category, setCategory] = useState('RPM');
  const [query, setQuery] = useState("all");



    useEffect(() => {
        if(error){
            alert.error(error);
        }
    
        dispatch(getHrLists());
        
    }, [dispatch]);

    const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: [doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ")})
  ))

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const generateFinanceReportHistory = () => {
      if(!hrId) {
        alert.error('Please select HR');
        return; 
      } else {
      dispatch(getFinancialReportHistory(hrId, month, year));
     }
    }

  const resetReport = () => {
    dispatch({
        type: FINANCIAL_REPORT_HISTORY_RESET
    })
  }

  return (
    <>
    <MetaData title="Financial Report History"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">
                <div className="row-display">
                    <div className="col-md-9">
                        <h5 style={{color: '#8FBB2C'}}>
                          <i className='bx bxs-bar-chart-alt-2'></i> <strong>&nbsp;Financial Report History of RPM </strong>
                        </h5>
                    </div>

                    <button onClick={() => history.goBack()} className="btn btn-secondary pt-2"><i className='bx bx-arrow-back' ></i></button> &nbsp;
                    <Link to="/adminDashboard" className="btn btn-secondary pt-2"><i className='bx bx-home' ></i></Link> &nbsp;
                    <Link to="/financialReport/history/CCM" className='link pt-2'>View History of CCM</Link>
                </div>
                <br/><br/>


                {/* Select entities */}

                <div>
                  <div className="row-display">
                  <div className="col-md-3">
                   
                    <label className="form-label">Select Nurse  <span style={{color: '#8FBB2C'}}> *</span>  </label>
                    <Select
                        options={hrOptions}
                        onChange={getHRProfile}
                        className="react-selectbox"
                    />
                     
                </div>

                <div className="col-md-3">
                    <label className="form-label">Month  <span style={{color: '#8FBB2C'}}> *</span>  </label>
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

                <div className="col-md-3">
                    <label className="form-label">Year <span style={{color: '#8FBB2C'}}> *</span></label>
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

                <div className="col-md-3">
                    <label className="form-label">Action</label>
                    <button className="submit-btn" onClick={generateFinanceReportHistory}>Generate</button>
                </div>
            </div>
           </div>
        </div>


        {/* Report Result */}
        {loading ? <Loader /> : <>
                {financialreportHistory && financialreportHistory?.length > 0 ? <>
                        <hr />

                        <div className='row-display'>
                            <div className='col-md-10'>
                                
                            </div>

                           <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    

                        </div>

                        <div className="col-md-12">
                          <br />
                        <Table bordered hover>
                            <thead align="center">
                                <tr>
                                  <th>Month</th>
                                  <th>Patient Name</th>
                                  <th>Total Readings </th>
                                  <th>Total Minutes</th>
                                  <th>CPT Codes</th>
                                  <th>Payment</th>
                                  <th>Total</th>
                                </tr>


                                
                                  {financialreportHistory && financialreportHistory.filter((a, i) => financialreportHistory.findIndex((s) => a?.patientId?._id === s?.patientId?._id) === i).map((summaryReport, index) => (
                                    <tr key={index}> 
                                      <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                      
                                      <td>
                                        <Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} 
                                          to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId?._id }}}>{summaryReport?.patientId?.firstname} {summaryReport?.patientId?.lastname}
                                        </Link>
                                      </td>
                                      
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
                                          <b style={{display: 'none'}}></b> <br /> $31.94 
                                          <b style={{display: 'none'}}>{totalCharges.push({charges: 31.94})} </b></p> : null
                                        }
                                      </td>  

                                      <td>
                                        {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes > 20 && summaryReport?.totalMinutes < 40 ? <b> $42.26 </b> : null}
                                        {summaryReport.totalReadings < 16 && summaryReport?.totalMinutes > 40 ? <b> $74.20 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes < 20 ? <b> $50.83 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 20 && summaryReport?.totalMinutes < 40 ? <b> $93.09 </b> : null}
                                        {summaryReport.totalReadings >= 16 && summaryReport?.totalMinutes >= 40 ? <b> $125.03 </b> : null}

                                      </td>

                                    </tr>
                                  ))}
                                
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


                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>} 
                </>}

      </div>
    </section>
    </>
  )
}

export default FinancialReportHistory