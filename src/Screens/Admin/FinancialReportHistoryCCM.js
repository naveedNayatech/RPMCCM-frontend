import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getHrLists, getFinancialReportHistoryOfCCM } from '../../actions/adminActions';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import {FINANCIAL_REPORT_HISTORY_RESET} from '../../constants/adminConstants';

const FinancialReportHistory = () => {
  
  let totalCharges = [];
  let missedOpportunities = [];

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  
  const { error, doctors } = useSelector(state => state.doctor);
  const {  hrs } = useSelector(state => state.hrslist);
  const {loading, financialreportHistory} = useSelector(state => state.financialReportHistory);
  const [hrId, sethrId] = useState("");

  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2023');


    useEffect(() => {
        if(error){
            alert.error(error);
        }
    
        dispatch(getHrLists());
        
        dispatch({
            type: FINANCIAL_REPORT_HISTORY_RESET
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

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const generateFinanceReportHistory = () => {
      if(!hrId) {
        alert.error('Please select HR');
        return; 
      } else {
      dispatch(getFinancialReportHistoryOfCCM(hrId, month, year));
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
                        <h5 style={{color: '#02C39A'}}>
                          <i className='bx bxs-bar-chart-alt-2'></i> <strong>&nbsp;Financial Report History of CCM </strong>
                        </h5>
                    </div>

                    <button onClick={() => history.goBack()} className="btn btn-secondary pt-2"><i className='bx bx-arrow-back' ></i></button> &nbsp;
                    <Link to="/adminDashboard" className="btn btn-secondary pt-2"><i className='bx bx-home' ></i></Link> &nbsp;
                    <Link to="/financialReport/history" className='link pt-2'>View History of RPM</Link>
                </div>
                <br/><br/>


                {/* Select entities */}

                <div>
                  <div className="row-display">
                  <div className="col-md-3">
                   
                    <label className="form-label">Select Nurse  <span style={{color: '#02C39A'}}> *</span>  </label>
                    <Select
                        options={hrOptions}
                        onChange={getHRProfile}
                        className="react-selectbox"
                    />
                     
                </div>

                <div className="col-md-3">
                    <label className="form-label">Month  <span style={{color: '#02C39A'}}> *</span>  </label>
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
                    <label className="form-label">Year <span style={{color: '#02C39A'}}> *</span></label>
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
                                  <th>Total Minutes</th>
                                  <th>CPT Codes</th>
                                  <th>Payment</th>
                                  <th>Total</th>
                                  <th>Category</th>
                                </tr>


                                
                                  {financialreportHistory && financialreportHistory.filter((a, i) => financialreportHistory.findIndex((s) => a?.patientId?._id === s?.patientId?._id) === i).map((summaryReport, index) => (
                                    <tr key={index}> 
                                      <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                      
                                      <td>
                                        <Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} 
                                          to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId?._id }}}>{summaryReport?.patientId?.firstname} {summaryReport?.patientId?.lastname}
                                        </Link>
                                      </td>
                                      
                                      <td><b>{summaryReport?.totalMinutes}</b></td>

                                      {/* CPT Codes Payment*/}
                                      <td style={{color: 'green', fontWeight: 'bold'}}>
                                        {summaryReport?.totalMinutes >=20 && summaryReport?.totalMinutes < 40 ? '99490' : 
                                        summaryReport?.totalMinutes >= 40 && summaryReport?.totalMinutes < 60 ? '99490, 99439' : 
                                        summaryReport?.totalMinutes >= 60 && summaryReport?.totalMinutes < 90 ? '99487' : 
                                        summaryReport?.totalMinutes >= 90 ? '99487, 99489' : null  
                                        }
                                      </td>


                                       <td style={{color: 'green', fontWeight: 'bold'}}>
                                        {summaryReport?.totalMinutes >=20 && summaryReport?.totalMinutes < 40 ? '$49.73' : 
                                        summaryReport?.totalMinutes >= 40 && summaryReport?.totalMinutes < 60 ? '$49.73, $37.49' : 
                                        summaryReport?.totalMinutes >= 60 && summaryReport?.totalMinutes < 90 ? '$73.70' : 
                                        summaryReport?.totalMinutes >= 90 ? '$73.70,$35.70' : null  
                                        }
                                      </td>

                                      <td style={{color: 'green', fontWeight: 'bold'}}>
                                        {summaryReport?.totalMinutes >=20 && summaryReport?.totalMinutes < 40 ? <>
                                          <p>$49.73 </p><b style={{display: 'none'}}>{totalCharges.push({charges: 49.73})}</b>
                                        </>: 
                                        summaryReport?.totalMinutes >= 40 && summaryReport?.totalMinutes < 60 ? <><p>$87.22</p> <b style={{display: 'none'}}>{totalCharges.push({charges: 87.22})}</b></> : 
                                        summaryReport?.totalMinutes >= 60 && summaryReport?.totalMinutes < 90 ? <><p>$73.70</p> <b style={{display: 'none'}}>{totalCharges.push({charges: 73.70})}</b></> : 
                                        summaryReport?.totalMinutes >= 90 ? <><p>$109.40</p> <b style={{display: 'none'}}>{totalCharges.push({charges: 109.40})}</b></> : null  
                                        }
                                      </td> 

                                     <td>
                                        <p>CCM</p>
                                     </td> 

                                    </tr>
                                  ))}
                                
                                    </thead>
                                <tbody>            
                            </tbody>
                        </Table>

                        <div style={{float: 'right'}}>
                            <b>Total Payment : </b> <h5>  <b style={{color: 'green'}}> $ {totalCharges.reduce((total, currentValue) => total = total + currentValue.charges,0).toFixed(2)} </b></h5>
                                                       
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