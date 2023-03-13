import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { getAdminNotifications } from '../../actions/adminActions';
import { useAlert } from 'react-alert';

const moment = require('moment-timezone');

const TopBar = ({props}) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const { notifications, error} = useSelector(state => state.adminNoti);

    useEffect(() => {
        if(error) {
            alert.error(error);
        }
        dispatch(getAdminNotifications());
  }, [dispatch, error, alert]);


    const { isAuthenticated, user } = useSelector(state => state.auth);

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }
    });

    const logoutHandler = () => {
        dispatch(logout());
    }

    
    return (
        <Fragment>
            <div className="navbar-top">
            <div className="row-display" style={{padding: '0px 10px'}}>
                <div className="sidebar-button">
                    <i className="bx bx-menu sidebarBtn"></i>
                    <h4 className="mt-2">Hello, <span style={{color: '#8FBB2C'}}>{isAuthenticated === true && user && user?.name} 
                    <p style={{fontSize: '13px'}}>
                        Welcome Back
                    </p></span></h4>    
                </div>

                <div className="row-display">
                        <div className="notification-dropdown">
                        <Dropdown className="admin-topbar-dropdown">
                            <Dropdown.Toggle variant="link" id="dropdown-basic">

                            <i className='bx bxs-bell' style={{color: '#8FBB2C', fontSize: '32px'}}></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="admin-topbar-notification-dropdown">
                            {notifications && notifications?.data?.slice(0,50).map((noti, index) =>(
                                <Dropdown.Item key={index} className="drop-down-item-active">
                                    {noti?.noti_type === 'bp' ? <>
                                    <Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: noti?.patientId}}}>
                                    {/* <Alert className="notification-text" variant={noti?.status === "High" ? "danger" : noti?.status === 'Elevated' ? "warning" : "info"}> */}
                                        <small>{noti?.textAny}</small>
                                        <div>
                                            <small style={{fontSize: '12px', color: 'gray', float:'right'}}>{moment(noti?.createdAt).tz("America/New_York").format("MM/DD/YYYY")}</small>
                                        </div>    
                                    {/* </Alert> */}
                                </Link></> : <>
                                <Link className="link" to="/adminDashboard">
                                        <div className="notification-text">
                                            <p>{noti?.textAny}</p>
                                                <small style={{fontSize: '12px', float:'right', marginTop: '-10px'}}>{moment(noti?.createdAt).tz("America/New_York").format("MM/DD/YYYY")}</small>
                                        </div>    
                                </Link>
                                </>    
                                }
                                
                                </Dropdown.Item>
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                        {/* Notifications */}

                
                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown-basic" className="profile-details">
                               <i className="fas fa-user-shield" style={{fontSize: '50px', color: '#8FBB2C'}}></i>  
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="admin-topbar-dropdown">
                                <Dropdown.Item>
                                    <Link className="dropdown-item" to="/me"><small>My Profile</small></Link>
                                </Dropdown.Item>
                                
                                {user?._id === '640826226439e492a4e52f33' ? <>
                                    <Dropdown.Item>
                                        <Link className="dropdown-item" to="/admins"><small>Admins</small></Link>
                                    </Dropdown.Item>
                                </> : null}
                                
                                
                                <Dropdown.Item >
                                    <Link className="dropdown-item" to="#" onClick={logoutHandler} style={{color: "red"}}><small>Logout</small></Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                      {/* </div> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TopBar;
