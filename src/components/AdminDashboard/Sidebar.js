import React from 'react';
import { NavLink } from 'react-router-dom';
import TDW_logo from '../../assets/Images/official_logo.png';

const Sidebar = () => {

    return (
        <>
            <div className="sidebar">
            <div className="logo-details">
                <img src={TDW_logo} className="logoImg" alt="logo" />
            </div>

            <ul className="nav-links">
                <li className="nav_link">
                    <NavLink key="admindashboard" to="/adminDashboard" activeClassName="link-name-active">
                        <i className="fas fa-home" style={{color: '#FFC300', fontSize: '24px'}}></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>


                <li className="nav_link">
                    <NavLink key="rpmPatients" to="/patients" activeClassName="link-name-active">
                    <i className="fas fa-user-injured" style={{color: '#ED553B', fontSize: '24px'}}></i>
                        <span className="link_name">RPM Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="ccmPatients" to="/Patients/CCM" 
                     activeClassName="link-name-active">
                    <i className="fas fa-hospital-user" style={{color: '#FFC300', fontSize: '24px'}}></i>
                        <span className="link_name">CCM Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="doctors" to="/doctors" activeClassName="link-name-active">
                    <i className="fas fa-user-md" style={{color: '#008080', fontSize: '24px'}}></i>
                        <span className="link_name">Manage Doctors</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="hr" to="/hrlist" activeClassName="link-name-active">
                    <i className="fas fa-users" style={{color: '#800080', fontSize: '24px'}}></i>
                    <span className="link_name">Nurse Resources</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="inventory" to="/devices" activeClassName="link-name-active">
                    <i className="fas fa-weight" style={{color: '#008080', fontSize: '24px'}}></i>
                    <span className="link_name">Inventory Management</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="'managelogs'" to="/logs" activeClassName="link-name-active">
                    <i className='fas fa-book-open' style={{color: '#FFC300', fontSize: '24px'}}></i>
                        <span className="link_name">Manage Logs</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="credentials" to="/credentials" activeClassName="link-name-active">
                        <i className='fas fa-key' style={{color: '#FF0000', fontSize: '24px'}}></i>
                        <span className="link_name">Hard Reset Password</span>
                    </NavLink>
                </li>

                <hr />

                <li className="nav_link">
                    <NavLink key="timereport" to="/Admin/Report/RPM">
                        <i className='fas fa-history' style={{color: '#900C3E', fontSize: '24px'}}></i>
                        <span className="link_name">Time Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="ksandasd" to="/report/financialReport" activeClassName="link-name-active">
                    <i className='fas fa-funnel-dollar' style={{color: '#CF2749', fontSize: '24px'}}></i>
                        <span className="link_name">Financial Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="telemetarydatareport" to="/report/telemetary" activeClassName="link-name-active">
                    <i className='fas fa-heart' style={{color: '#FF0000', fontSize: '24px'}}></i>
                        <span className="link_name">Telemetary Data Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="ndjaiusd" to="/Admin/Report/InitialMonth" activeClassName="link-name-active">
                        <i className="fas fa-stream" style={{color: '#28B643', fontSize: '24px'}}></i>
                        <span className="link_name">Initial Month Report</span>
                    </NavLink>
                </li>

                {/* <li className="nav_link">
                    <NavLink key="knsadan" to="/Admin/Report/patient" activeClassName="link-name-active">
                        <i className='bx bxs-report'></i>
                        <span className="link_name">Patient CP</span>
                    </NavLink>
                </li> */}
            </ul>
        </div>    
        </>
    )
}

export default Sidebar;
