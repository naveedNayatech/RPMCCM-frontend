import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { 
    getInactivePatients,
    patientActivate 
} from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import {UPDATE_PATIENT_RESET} from '../../constants/adminConstants';



const InactivePatients = () => {

    const dispatch = useDispatch();

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [patientModel, setPatientModel] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const alert = useAlert();
    const { loading, error, inactivePts} = useSelector(state => state.inactivePatients);
    const { isUpdated} = useSelector(state => state.admin);



    useEffect(() => {
        if(error){
            return alert.error(error);
        }  
        
        if(isUpdated){
            alert.success('Status Changed');
            dispatch({type: UPDATE_PATIENT_RESET});
            dispatch(getInactivePatients());
            setSmShow(false);
        }

        dispatch(getInactivePatients());    
    
    }, [dispatch, alert, error, isUpdated]);
    

    const refreshHandler = () => {
        dispatch(getInactivePatients());
    }

    const activatePatient = () => {
        dispatch(patientActivate(patientModel));
    }

    
  return (
    <Fragment>
                <MetaData title="Patients List"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : (
                <Fragment>   
                {/*  patients List Filter Section */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        
                        <div className="row-display">
                            <div className="col-md-10">
                                <h5 style={{color: '#8FBB2C'}}>
                                    <i className="bx bx-user"></i> <strong>&nbsp;List of <span style={{color: 'red'}}>Inactive</span> Patients </strong>
                                </h5>
                            </div>

                            <button className="btn btn-secondary pt-2" onClick={refreshHandler}><i className='bx bx-refresh'></i></button> &nbsp;
                           
                            <Link to ="/patients" className="add-staff-btn">
                                <i className='bx bxs-user'></i> &nbsp;Active Patients</Link>
                                                      
                            </div>
                            </div>  
                        <br />


                    {/* Patient List Card */}
                        <div className="col-md-12">
                        {inactivePts && <Fragment>
                            <Table hover striped bordered>
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>DOB </th>
                                <th>Acc Status</th>
                                <th>Consent Role (s)</th>
                                <th>ACTION</th> 
                                </tr>
                            </thead>
                            <tbody>
                            
                            {inactivePts && inactivePts.length > 0 ? <Fragment> 
                                {inactivePts && inactivePts.map((patient, index) => (
                                <tr key={index}>  
                                <td>
                                    <Link style={{textDecoration: 'none', color: "dodgerblue", fontWeight: 'bold'}} 
                                        to={{ pathname: "/patientProfile", state: {patientid: patient?._id, batterySignalStatus: patient?.batterySignals?.sig}}}>
                                        {patient?.firstname} {patient?.lastname}
                                    </Link>
                                </td>
                                
                                <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                
                                {patient?.block === false ? <td>
                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                    </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                </td>}
                                

                                <td>{patient?.patientType}</td>

                                <td>
                                <DropdownButton id="dropdown-basic-button">
                                    <Dropdown.Item>
                                        <Link className="link" to={{ pathname: "/patientProfile", state: {patientid: patient?._id, batterySignalStatus: patient?.batterySignals?.sig}}}>View Profile</Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link className="link" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}>Edit Details</Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item> 
                                        <Link className="link" style={{color: 'green'}} to="/Patients/Inactive" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}>Activate Account</Link>
                                    </Dropdown.Item>
                                </DropdownButton>
                                </td>
                            </tr>    
                            ))}
                            </Fragment> : <div>
                                <small className="not-found-text">Patients Not Found</small>
                            </div> }
                            
                            </tbody>
                            
                            </Table> 

                                <Modal
                                    size="sm"
                                    show={smShow}
                                    onHide={() => setSmShow(false)}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Body>
                                        <small style={{color: 'gray'}}>Are you sure you want to activate Pt.  
                                            <span style={{color: '#000'}}> {patientToDelete}</span> ?
                                        </small>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <button className="btn btn-sm btn-success" onClick={activatePatient}>Activate</button>
                                    </Modal.Footer>
                                </Modal>  
                        </Fragment>}                      
                        </div>
                    </div>
                </Fragment>
            )}
            </section>
        </Fragment>
    )
}

export default InactivePatients