import React, {useEffect, useState} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import {useAlert} from 'react-alert';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import { getCCMTimeSummaryReportByHR } from '../../actions/adminActions';
import { useHistory } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HRFinancialReportCCM = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const [month, setMonth] = useState('02');
  const [year, setYear] = useState('2023');
  const [filterPatient, setFilterPatient] = useState(false);


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
      dispatch(getCCMTimeSummaryReportByHR(user?._id, month, year));
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
                        <h5 style={{color: '#02C39A'}}>
                        <i className="fas fa-stopwatch-20" style={{color: 'crimson', fontSize: '24px'}}></i> 
                            <strong>&nbsp;&nbsp;Financial Report for CCM </strong>
                        </h5>
                      <div>
                        <Link to="/Nurse/Report/Financial_Report" className="link pr-3">RPM Financial Report</Link>  
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
                        <br/><hr/>
                        <div className="row-display">
                          <div>
                            <b>Generated Report Preview</b>
                            <p><small style={{color: 'crimson', fontWeight: 'bold'}}>Total {timeSummaryReport?.length} records found.</small></p>
                          </div>

                          <div>
                          <div className="pt-2 pr-3">
                            <Form.Check 
                              checked={filterPatient ? true : false}
                              onChange={() => setFilterPatient(!filterPatient)}
                              type="checkbox"
                              id="filterPts"
                              label="Minutes > 0 ?"
                              style={{fontWeight: 'bold'}}
                            />
                          </div>
                          
                          </div>
                        </div>  

                        <div className="col-md-12">
                          <br />
                        <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Sr.</th>
                                <th>Patient Name</th>
                                <th>Total Minutes</th>
                                <th>CPT Codes</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Category</th>
                                </tr>

                                {timeSummaryReport && timeSummaryReport.filter(item => filterPatient ? item.totalMinutes > 0 : item).map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>

                                    <td><Link className="link" 
                                        to={{ pathname: "/Nurse/Patient/CCM/Profile", state: {patientid: summaryReport?.patientId}}}>
                                          {summaryReport?.patientName}
                                        </Link>
                                    </td>

                                    <td>
                                        <b style={{color: summaryReport?.totalMinutes >= 20 ?  'green' : 'red'}}>{summaryReport?.totalMinutes}</b></td>


                                    {/* CPT Codes Payment*/}
                                    <td style={{color: 'green', fontWeight: 'bold'}}>
                                        {summaryReport?.totalMinutes >=20 && summaryReport?.totalMinutes < 40 ? '99490' : 
                                        summaryReport?.totalMinutes >= 40 && summaryReport?.totalMinutes < 60 ? '99490, 99439' : 
                                        summaryReport?.totalMinutes >= 60 && summaryReport?.totalMinutes < 90 ? '99487' : 
                                        summaryReport?.totalMinutes >= 90 ? '99487, 99489' : '--'  
                                        }
                                    </td>

                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>

                                    <td style={{wordWrap: 'break-word'}}>{year && year}</td>

                                    <td style={{fontWeight: 'bold'}}>CCM</td>
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

export default HRFinancialReportCCM;