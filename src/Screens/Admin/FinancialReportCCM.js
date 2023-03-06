import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getHrLists, 
    getHrProfile, 
    getDoctors, 
    getTimeSummaryReportforCCMByDrHr, 
    changeBilledStatus 
  } from '../../actions/adminActions';
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import { Table, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../../layouts/Loader';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import hrIcon from '../../assets/Images/network.png';
import ExportCCMSummaryReportToCSV from '../../components/ExportCCMSummaryReportToCSV';
import moment from 'moment';


const FinancialReportCCM = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    let totalCharges = [];
    let category = 'CCM';
    
    const {  error, hrs } = useSelector(state => state.hrslist);
    const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);
    const { hrProfile } = useSelector(state => state.hrprofile);
    const { doctors } = useSelector(state => state.doctor);
    const [filterPatient, setFilterPatient] = useState(false);
    const {message, error: billedError } = useSelector(state => state.common);

    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2023');
    const [hrId, sethrId] = useState("");
    const [reportBy, setReportBy] = useState('doctor');
    const [drId, setDRId] = useState('');

    let hrDoctorId = hrProfile?.assigned_doctor_id?._id;

    
    useEffect(() => {
        if(error){
            alert.error(error);
        }

        if(message){
          alert.success(message);
        }

        if(billedError){
          alert.error(billedError);
        }
    
        dispatch(getHrLists());
        dispatch(getDoctors(10, 1));

        // dispatch({
        //   type: TIME_SUMMARY_REPORT_RESET
        // })
        
    }, [dispatch, error, message, billedError]);

    const hrOptions = []
        hrs && hrs.filter(item => item?.consentRole === 'CCM' || item?.consentRole === 'Both').map((hr) => (
            hrOptions.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname, hr?.consentRole ].join(" ")})
    ))

    const getHRProfile = (hr) => {
        sethrId(hr.value);
        dispatch(getHrProfile(hr.value));
        console.log('Assigned Dr is ' + hrDoctorId );
    }

    const generateFinanceReport = () => {
      if(!hrId && !drId) {
            alert.error('Please select Nurse or Doctor');
            return; 
          } else {
            dispatch(getTimeSummaryReportforCCMByDrHr(drId, hrId, month, year, reportBy));    
          } 
      }

    const resetReport = () => {
        dispatch({
            type: TIME_SUMMARY_REPORT_RESET
        })
    }

    const billedStatus = (patientId) => {
      var confirmation = window.confirm(`Are you sure you to change status to billed ?`);
        if(confirmation){
          dispatch(changeBilledStatus(patientId, month, category));
          generateFinanceReport();
        }
      }
      



  return (
    <>
    <MetaData title="Financial Report CCM"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg mb-5 mr-4 ml-4 rounded-card">
            <div className='searchArea p-3'>
            <div className="row-display">
                  <div className="col-md-8">
                    <h5 style={{color: '#0044ad'}}>
                      <i className='bx bxs-bar-chart-alt-2'></i> <b>&nbsp;Financial Report For CCM </b>
                    </h5>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}>
                    <i className='bx bx-arrow-back' ></i>
                  </button> &nbsp;
                  <Link to="/report/financialReport" className="link pt-2">RPM Financial Report</Link> &nbsp;
                  <Link to="/financialReport/history" className="link pt-2">View History</Link> &nbsp;
            </div>
            <hr />

            <p className="notes-header"><b>Note: </b> You can generate financial report for CCM by doctor and by Nurse.</p>


            <div className="row cardWrapper">    
                <div className={`cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                onClick={() => setReportBy("doctor")}>
                    <img src={doctorIcon} alt="" height="60" width="60"/>
                        <p> By Doctor </p>
                </div>
                
                
                <div className={`cardButton ${reportBy === "hr" ? "cardActive" : ""}`}
                onClick={() => setReportBy("hr")}>
                    <img src={hrIcon} alt="" height="60" width="60"/>
                    <p> By Nurse </p>
                </div>
            </div>

            {/* Select boxes */}
            <div className="row-display">
                  <div className="col-md-3">
                    {reportBy === 'doctor' ? <>
                    <b>Select Doctor <span style={{color: 'red'}}> *</span>  </b>
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
                    </> : <>
                    <b>Select Nurse  <span style={{color: 'red'}}> *</span></b>
                      <Select
                          options={hrOptions}
                          onChange={getHRProfile}
                          className="react-selectbox"
                      />
                    </>}
                    
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

            {loading ? <Loader /> : <>
              {timeSummaryReport && timeSummaryReport?.length > 0 ? <>

                <div className="row-display p-4">
                      <div className="text-center p-1" style={{ 
                          fontSize: '14px',
                          backgroundColor: '#0044ad',
                          color: '#FFF',
                          borderRadius: '5px',
                      }}>Financial Report Preview
                      </div>

                      <div className="row-display">
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

                        <div className='row-display'>
                          <button className="accordion" onClick={resetReport}>
                            <i className='bx bxs-file-pdf'></i> Reset
                          </button> &nbsp;
                        <div>
                            <ExportCCMSummaryReportToCSV 
                              filterPatient={filterPatient}
                              csvData={timeSummaryReport} 
                              fileName={'CCM Financial Report'+ moment().format('YYYY-MM-DD')+'.csv'} 
                            />
                        </div>

                        </div>
                      </div>
                </div>

                {/* Report Result starts from here */}
                <div className="col-md-12">
                          <br />
                        <Table bordered hover>
                            <thead align="center">
                                <tr>
                                  <th>Sr. No</th>
                                  <th>Month</th>
                                  <th>Patient Name</th>
                                  <th>Total Minutes</th>
                                  <th>CPT</th>
                                  <th>Payment</th>
                                  <th>Total</th>
                                  <th>Category</th>
                                  <th>Billed Status</th>
                                  <th>Action</th>
                                </tr>

                                {timeSummaryReport && timeSummaryReport.filter(item => filterPatient ? item.totalMinutes > 0 : item).map((summaryReport, index) => (
                                    <tr key={index}> 
                                      <td>{index + 1}</td>
                                      <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                      
                                      <td>
                                        <Link className="link" style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} 
                                        to={{ pathname: "/patientProfile", state: {patientid: summaryReport?.patientId }}}>
                                          {summaryReport?.patientName}
                                        </Link></td>
                                      
                                      
                                      {/* Total Minutes */}
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

                                      <td style={{fontWeight: 'bold'}}>CCM</td>

                                      {summaryReport?.totalMinutes >= 20 ? <>
                                        <td>{summaryReport?.billedStatus === true ? 
                                        <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'green'}}>Billed</p> : 
                                          <p className="m-0 p-0" style={{fontWeight: 'bold', color: 'red'}}>Not Billed</p>}
                                        <p className="m-0 p-0"><small>Month of: {summaryReport?.Month}</small></p>
                                        </td>
                                      </> : <td> </td>
                                      }   

                                      {summaryReport?.totalMinutes >= 20 ? <>
                                      <td>
                                      {summaryReport?.billedStatus === true ? <> <i className='bx bx-check' style={{fontSize: '25px', color: 'green'}}></i> </>  
                                          : <> <button className="btn btn-outline-primary btn-sm"
                                          onClick={() => billedStatus(summaryReport?.patientId)}
                                          >Billed </button> </> }
                                      </td>
                                      </> : <td> </td>
                                      }
                                      
                                    </tr>
                                  ))}
                            </thead>
                        </Table>
                    </div>

                    <div style={{float: 'right'}} className="mr-4">
                            <b>Total Payment : </b> <h5>  <b style={{color: 'green'}}> $ {totalCharges.reduce((total, currentValue) => total = total + currentValue.charges,0).toFixed(2)} </b></h5>
                          </div>
                          <br/><br/><br/><br/>
              </> : null }
              </> }
              
              
          </div>
        </section>
        </>
  )
}

export default FinancialReportCCM;