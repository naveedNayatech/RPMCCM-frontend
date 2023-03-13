import React, {useEffect, useState} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import {useAlert} from 'react-alert';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import { getTimeSummaryReportByHR } from '../../actions/adminActions';
import { useHistory } from 'react-router-dom';
// import ExportSummaryReportToCSV from '../../components/ExportSummaryReportToCSV';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HRSummaryReport = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const [month, setMonth] = useState('02');
  const [year, setYear] = useState('2023');
  const [category, setCategory] = useState('CCM');


  const { user } = useSelector(state => state.auth);
  const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);

  useEffect(() => {
    
    dispatch({
      type: TIME_SUMMARY_REPORT_RESET
    })

}, [dispatch, month, year]);

  const generateTimeSummaryByHR = () => {
     if(!month){
      alert.error('Please select month');
      return;
    } else if(!year){
      alert.error('Please select month');
      return;
    } else {
      dispatch(getTimeSummaryReportByHR(user?._id, month, year,category));
    }
  }

  // const resetReport = () => {
  //   dispatch({
  //       type: TIME_SUMMARY_REPORT_RESET
  //   })
  // }  


  return (
    <>
     <MetaData title="Time Summary Report" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />

        <>
             <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                    <div className="row-display">
                        <h5 style={{color: '#8FBB2C'}}>
                        <i className="fas fa-dollar-sign" style={{color: 'green', fontSize: '20px'}}></i> 
                            <strong>&nbsp;&nbsp;Financial Report for RPM </strong>
                        </h5>
                      <div>
                        <Link to="/Nurse/Report/Financial_Report/CCM" className="link pr-3">CCM Financial Report</Link>  
                        <button className="btn btn-secondary btn-sm" 
                          onClick={() => history.goBack()}><i className='bx bx-arrow-back'></i>
                        </button>
                      </div>
                    </div>


                            <hr />
                            <div className="row cardWrapper">
                            <label className='profile-label pt-1'>Select Month <span style={{color: 'red'}}>*</span></label> 
                            <div className="col-md-3">  
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

                            <label className='profile-label pt-1'>Select Year <span style={{color: 'red'}}>*</span></label> 
                            <div className="col-md-3">
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
                          
              
                            <div className="col-md-2">                  
                                <button className="btn btn-outline-primary btn-sm btn-block" onClick={generateTimeSummaryByHR}>Generate Report</button>
                            </div>
                            </div>

                        </div>
                  </div>

                  

                
                {loading ? <Loader /> : <>
                {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                    <br/> <hr />
                        <div className="row-display">

                        <div>
                          <b>Generated Report Preview</b>
                          <p><small style={{color: 'crimson', fontWeight: 'bold'}}>Total {timeSummaryReport?.length} records found.</small></p>
                        </div>
                          
                          <div>
                            <span style={{color: 'crimson'}}>
                              <small>
                                <i className='bx bxs-circle'></i> Shows reading {'<'} 16 | minutes {'<'} 20
                              </small>
                            </span> 
                            
                            <br />

                            <span style={{color: 'green'}}>
                              <small>
                                <i className='bx bxs-circle'></i> Shows reading {'>'} 16 | minutes {'>'} 20
                              </small>
                              </span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <br />
                        <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Sr.</th>
                                <th>Patient Name</th>
                                <th>Total Readings Received </th>
                                <th>Total Minutes Added</th>
                                <th>CPT Codes</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Category</th>
                                </tr>

                                {timeSummaryReport && timeSummaryReport.map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>
                                    
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.patientName}</td>
                                    
                                    {summaryReport.totalReadings > 16 ? 
                                      <td style={{color: 'green', fontWeight: 'bold'}}>{summaryReport?.totalReadings}</td> : 
                                      <td style={{color: 'red', fontWeight: 'bold'}}>{summaryReport?.totalReadings}</td>
                                    }

                                    {summaryReport?.totalMinutes < 20 ? 
                                      <td style={{color: 'red' , fontWeight: 'bold'}}>{summaryReport?.totalMinutes} mins</td> : 
                                      <td style={{color: 'green', fontWeight: 'bold'}}>{summaryReport?.totalMinutes} mins</td>
                                    }

                                    <td>
                                      {summaryReport.totalReadings >= 16 ? 
                                        <text style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}> 
                                        99454</text> : null }
                                      {summaryReport.totalMinutes >= 20 && summaryReport.totalMinutes < 40 ? 
                                        <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>99457</p> : 
                                        summaryReport.totalMinutes >= 40 ? <p style={{fontSize: '14px', color: 'green', fontWeight: 'bold'}}>
                                          99457 <br /> 99458</p> : null}
                                    </td>

                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                    <td>{year && year}</td>
                                    <td style={{fontWeight: 'bold'}}>RPM</td>
                                  </tr>
                                ))}
                            </thead>
                            <tbody>
                                  
                            </tbody>
                          </Table>
                        </div>


                   </> : null}
                </>}

              </div>
        </>
      </section>
    
    </>
  )
}

export default HRSummaryReport;