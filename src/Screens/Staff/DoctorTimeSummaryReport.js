import React, {useState} from 'react';
import MetaData from '../../layouts/MetaData';
import {useAlert} from 'react-alert';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import { getTimeSummaryReportByDoctor } from '../../actions/adminActions';
import ExportSummaryReportToCSV from '../../components/ExportSummaryReportToCSV';
import Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import { Table } from 'react-bootstrap';

const DoctorTimeSummaryReport = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const [month, setMonth] = useState('08');
  const [year, setYear] = useState('2022');

  const { user } = useSelector(state => state.auth);
  const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);

  const generateTimeSummaryByHR = () => {
     if(!month){
      alert.error('Please select month');
      return;
    } else if(!year){
      alert.error('Please select month');
      return;
    } else {
      dispatch(getTimeSummaryReportByDoctor(user._id, month, year));
    }
  }

  const resetReport = () => {
    dispatch({
        type: TIME_SUMMARY_REPORT_RESET
    })
  }  


  return (
    <>
     <MetaData title="Time Summary Report" />
        <Sidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <TopBar />

        <>
            <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                            <h5 >Time Summary <span style={{color: '#8FBB2C'}}> Report </span> </h5> 
                            <hr />
                            <span className="notes-header"><b>Note: </b> You can generate time summary report selecting month and year.</span>

                            <div className="row cardWrapper">
                            <div className="col-md-3 mt-4">
                              <label>Month  <span style={{color: '#8FBB2C'}}> *</span>  </label>
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
                                <label>Year <span style={{color: '#8FBB2C'}}> *</span></label>
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
                                <label>Action</label>
                                <button className="submit-btn" onClick={generateTimeSummaryByHR}>Generate</button>
                            </div>
                            </div>

                        </div>
                  </div>

                  <br />
                  {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                    <div className="row-display">
                    <div className="col-md-9">

                    </div>
                    <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    
                    
                    <div>
                        <div
                            style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                        > 
                        </div>
                        {/* <button className="accordion"><i className='bx bxs-file-pdf'></i> Download Excel</button> */}
                        <div className="col-md-2 col-lg-2">
                            <ExportSummaryReportToCSV csvData={timeSummaryReport} fileName="Summary Telemetary Report.csv" />
                        </div>
                    </div>
                </div>
              </> : null }

                  <br />
                {loading ? <Loader /> : <>
                {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                        <div className="row-display">
                          <div style={{ 
                              fontSize: '14px',
                              backgroundColor: 'gray',
                              color: '#FFF',
                              padding: '5px',
                              width: '180px',
                              borderRadius: '5px', 
                              textAlign: 'center',
                              height: '30px'
                          }}><span>{timeSummaryReport?.length}</span> record(s) found.
                          </div>
                          
                          <span><b>Report Preview</b></span>
                          
                          <div>
                            <span style={{color: '#9B111E'}}>
                              <small>
                                <i className='bx bxs-circle'></i> Shows reading {'<'} 16 | minutes {'<'} 20
                              </small>
                            </span> 
                            
                            <br />

                            <span style={{color: '#009150'}}>
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
                                <th>Total Minutes</th>
                                <th>Month</th>
                                </tr>

                                {timeSummaryReport && timeSummaryReport.map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.patientName}</td>
                                    {summaryReport.totalReadings >= 16 ? <td style={{backgroundColor: '#009150', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td> : <td style={{backgroundColor: '#9B111E', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                    {summaryReport?.totalMinutes <= 20 ? <td style={{backgroundColor: '#9B111E', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{backgroundColor: '#009150', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td>}
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                  </tr>
                                ))}
                            </thead>
                            <tbody>
                                  
                            </tbody>
                          </Table>
                        </div>


                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>}
                </>}

              </div>
        </>
      </section>
    
    </>
  )
}

export default DoctorTimeSummaryReport;