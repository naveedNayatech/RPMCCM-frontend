import React, {useState, useEffect, Fragment} from 'react';
import {Badge, Table, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { getHrLists, HRDeactivate, HRActivate } from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';


const HRList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, hrs } = useSelector(state => state.hrslist);
    const {message, error: hrUpdateError } = useSelector(state => state.common);

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [HRModel, setHRModel] = useState(null);
    const [HRToDelete, setHRToDelete] = useState(null);
    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState(""); // set search query.
    const keys = ["firstname", "lastname", "email", "DOB", "gender"];

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(hrUpdateError){
            return alert.error(hrUpdateError);
        }

        if(message){
            alert.success(message);
            setSmShow(false);
            dispatch(getHrLists());
        }

        dispatch(getHrLists());

    }, [dispatch, error, message, hrUpdateError]);

    const deActivateHR = () => {
        dispatch(HRDeactivate(HRModel));
    }

    const activateHR = () => {
        dispatch(HRActivate(HRModel));
    }
    

  return <Fragment>
        <MetaData title="Nurse Resource"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : ( <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">

                        <div className="row-display">
                            <h5 style={{color: '#8FBB2C'}}>
                                <i className='bx bx-plus-medical'></i> <strong>&nbsp;List of Nurses </strong>
                            </h5>

                            <div className="row-display"> 
                                    <Link to="/adminDashboard" className="btn btn-secondary pt-2"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                    &nbsp;&nbsp;
                                    <Link to="/addhr" className="add-staff-btn">Add New Nurse</Link>
                            </div>
                        </div>
                        <hr />

                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="row-display">    
                                        <input type="text" 
                                            placeholder="Search..." 
                                            className="form-control"
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                        &nbsp;&nbsp;&nbsp;

                                        <button className="btn btn-sm btn-primary" onClick={() => setSort(!sort)}>
                                            {sort ? <i className='bx bx-sort-z-a' ></i> : <i className='bx bx-sort-a-z'></i>}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-9">
                                   
                                </div>
                            </div>
                        </div>
                        <br />


                        {/* HRs List */}
                        <div className="col-md-12">
                         <Fragment>
                         <Table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>D.O.B</th>
                                <th>Email</th>
                                <th>Gender </th>
                                <th>HR Of</th>
                                <th>Account Status</th>
                                <th>Consent Program</th>
                                <th>Action</th>
                                </tr> 
                            </thead>
                            
                            <tbody>
                            {sort ? <>
                            {hrs && hrs.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((hr, index) => (
                               <tr key={index}>
                                <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/hrProfile", state: {hr: hr}}}> {hr?.firstname} {hr?.lastname} <p style={{color: 'gray'}}>({hr?.role})</p> </Link></td>
                                
                                <td>{moment(hr?.DOB).format("MM/DD/YYYY")}</td>    
                                
                                <td style={{wordWrap: 'break-word'}}>{hr?.email}</td>    
                                {hr?.gender === 'male' ? <td>
                                    <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                    </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                </td>}    
                                
                                {hr?.assigned_doctor_id ? <td style={{ color: '#23408e'}}>
                                    Dr. {hr?.assigned_doctor_id?.firstname} {hr?.assigned_doctor_id?.lastname} 
                                    </td> : 
                                <td>--</td>}

                                {hr?.block === false ? <td>
                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                    </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                </td>}

                                <td>
                                    {hr?.consentRole === 'RPM' ? <b>RPM</b> : hr?.consentRole === 'CCM' ? <b>CCM</b> : <b>RPM & CCM</b>}
                                </td>
                                
                                {/* Actions Dropdown */}
                                <td>
                                        <DropdownButton id="dropdown-basic-button" variant="Light">
                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/hrProfile", state: {hr: hr}}} className="link">View Profile</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/updateHR", state:{ hr: hr}}} className="link">Edit Details</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                {hr?.block === false ? <Link to="hrlist" style={{color: 'red'}} className="link" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}>Block Account</Link> : 
                                                <Link to="hrlist" className="link" style={{color: 'green'}} onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}>Activate Account</Link> }
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                {/* Actions Dropdown ends*/}
                               </tr> 
                            ))}
                            </> : <>
                            {hrs && hrs.reverse().filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((hr, index) => (
                               <tr key={index}>
                                <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/hrProfile", state: {hr: hr}}}> {hr?.firstname} {hr?.lastname} <p style={{color: 'gray'}}>({hr?.role})</p> </Link></td>
                                
                                <td>{moment(hr?.DOB).format("ll")}</td>    
                                
                                <td style={{wordWrap: 'break-word'}}>{hr?.email}</td>    
                                    
                                {hr?.gender === 'male' ? <td>
                                    <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                    </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                </td>} 

                                {hr?.assigned_doctor_id ? <td style={{ color: '#23408e'}}>
                                    Dr. {hr?.assigned_doctor_id?.firstname} {hr?.assigned_doctor_id?.lastname} 
                                    </td> : 
                                <td>--</td>}

                                {hr?.block === false ? <td>
                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                    </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                </td>}

                                <td>
                                    {hr?.consentRole === 'RPM' ? <b>RPM</b> : hr?.consentRole === 'CCM' ? <b>CCM</b> : <b>RPM & CCM</b>}
                                </td>
                                
                                {/* Actions Dropdown */}
                                <td>
                                        <DropdownButton id="dropdown-basic-button" variant="Light">
                                            <Dropdown.Item href="#/action-1">
                                                <Link to={{ pathname: "/hrProfile", state: {hr: hr}}} className="link">View Profile</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/updateHR", state:{ hr: hr}}} className="link">Edit Details</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                {hr?.block === false ? <Link to="hrlist" style={{color: 'red'}} className="link" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}>Block Account</Link> : 
                                                <Link to="hrlist" className="link" style={{color: 'green'}} onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}>Activate Account</Link> }
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                {/* Actions Dropdown ends*/}
                               </tr> 
                            ))}
                            </>}
                            
                            </tbody>
                        </Table>
                        </Fragment>
                        </div>

                      </div>
                    </div>
                </Fragment> 
                )}
                </section>

                <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body>
                    <small style={{color: 'gray'}}>Are you sure you want to activate / de-activate 
                        <span style={{color: '#000'}}> HR. {HRToDelete}'s</span> Account ?
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-success" onClick={activateHR}>Activate</button>
                    <button className="btn btn-sm btn-danger" onClick={deActivateHR}>Block</button>
                </Modal.Footer>
            </Modal>  
    </Fragment>;
};

export default HRList;
