import React from 'react';
import MaleFemalePieChart from '../../components/Graphs/MaleFemalePieChart';
import { Link } from 'react-router-dom';

const AdminPatientStats = ({ activePatients, InactivePatients, malePts, femalePts, rpmPts, ccmPts}) => {

    return (
    <>
    <div className="col-md-12">
                <h5 className='title m-0 p-0'> Patients Analytics</h5>
                <br/>
                <div className="row-display">
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="card analytics-card">
                                    <div className="row-display p-2">
                                        <i className="fas fa-check-circle" style={{color: 'green', fontSize: '24px', paddingLeft: '15px'}}></i>
                                        <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;Active Patients</small>
                                        <small className="circleBg">{activePatients && activePatients}</small>
                                    </div>
                                    </span>
                                </div>

                                <div className="col-md-6">
                                <Link to="/Patients/Inactive" className="link">
                                    <span className="card analytics-card">
                                        <div className="row-display p-2">
                                            <i className="fas fa-ban" style={{color: 'red', fontSize: '24px', paddingLeft: '15px'}}></i>
                                            <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;Inactive Patients</small>
                                            <small className="circleBg">{InactivePatients && InactivePatients}</small>
                                        </div>
                                    </span>
                                </Link>
                                </div>

                                {/* RPM Patients & CCM Patients */}    
                                <div className="col-md-6">
                                    <Link to="/patients" className='link'>
                                    <span className="card analytics-card mt-3">
                                        <div className="row-display p-2">
                                        <i className="fas fa-weight" style={{color: '#8FBB2C', fontSize: '24px', paddingLeft: '15px'}}></i>
                                            <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;RPM Patients</small>
                                            <small className="circleBg">{rpmPts && rpmPts}</small>
                                        </div>
                                    </span>
                                    </Link>
                                </div>

                                <div className="col-md-6">
                                <Link to="/Patients/CCM" className="link">    
                                    <span className="card analytics-card mt-3">
                                        <div className="row-display p-2">
                                        <i className="fas fa-stethoscope" style={{color: 'green', fontSize: '24px', paddingLeft: '15px'}}></i>
                                                <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;CCM Patients</small>
                                            <small className="circleBg">{ccmPts && ccmPts}</small>
                                        </div>
                                    </span>
                                </Link>
                                </div>

                                <div className="col-md-6">
                                    <span className="card analytics-card mt-3">
                                        <div className="row-display p-2">
                                        <i className="fas fa-male" style={{color: '#8FBB2C', fontSize: '24px', paddingLeft: '15px'}}></i>
                                            <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;Male Patients</small>
                                            <small className="circleBg">{malePts && malePts}</small>
                                        </div>
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <span className="card analytics-card mt-3">
                                        <div className="row-display p-2">
                                        <i className="fas fa-female" style={{color: '#E0115F', fontSize: '24px', paddingLeft: '15px'}}></i>
                                            <small style={{ fontSize: '18px'}}> &nbsp;&nbsp;Female Patients</small>
                                            <small className="circleBg">{femalePts && femalePts}</small>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <MaleFemalePieChart 
                                malePts={malePts}
                                femalePts={femalePts}
                            />
                        </div>

                        <div className="col-md-3">
                            <Link to="/financialReport/history" className="btn btn-outline-primary btn-sm btn-block">Financial Report of RPM ( History )</Link>
                            <Link to="/financialReport/history/CCM" className="btn btn-outline-danger btn-sm btn-block">Financial Report of CCM ( History )</Link>
                            <Link to="/Devices/History" className="btn btn-outline-secondary btn-sm btn-block">Device Assign / Unassign ( History )</Link>
                            <Link to="/Admin/Report/CCM" className="btn btn-outline-info btn-sm btn-block">CCM Time Report</Link>
                            <Link to="/Patients/Inactive" className="btn btn-outline-primary btn-sm btn-block">Inactive Patients</Link>
                        </div>
                    </div>
                </div>
                <br />
    </>
  )
}

export default AdminPatientStats