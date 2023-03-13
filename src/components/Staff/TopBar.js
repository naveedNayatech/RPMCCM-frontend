import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { staffLogout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';


const TopBar = () => {
    
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.auth);

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }
    });

    const logoutHandler = () => {
        dispatch(staffLogout());
    }

    
    return (
        <Fragment>
            {/* Top Header */}
            <div className="navbar-top">
                <div className="row-display" style={{padding: '10px 30px'}}>
                <div className="sidebar-button">
                <i className="bx bx-menu sidebarBtn"></i>
                    <span className="title">Welcome Back, <p style={{color: '#8FBB2C', marginTop: '-10px'}}>
                            <small>{isAuthenticated === true && user && <>
                                {user?.firstname} {user?.lastname} </> }
                            </small> 
                        </p>
                    </span>    
                </div>

                <h5 className="title mt-4"><b>Doctor's Dashboard</b></h5>                
                <Dropdown>
                    <Dropdown.Toggle variant="none" id="dropdown-basic" className="profile-details">
                    <i className="fas fa-user-md" style={{fontSize: '50px', color: '#8FBB2C'}}></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="admin-topbar-dropdown">
                        <Dropdown.Item>
                            <Link className="dropdown-item" to="/staffProfile"><small>My Profile</small></Link>
                        </Dropdown.Item>
                        
                        <Dropdown.Item >
                            <Link className="dropdown-item" to="#" onClick={logoutHandler} style={{color: "red"}}><small>Logout</small></Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>                
            </div>
        </div>
        </Fragment>
    )
}

export default TopBar;
