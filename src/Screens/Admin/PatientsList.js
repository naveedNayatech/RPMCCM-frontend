import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import {Form, InputGroup, DropdownButton, Dropdown, ProgressBar } from 'react-bootstrap';

import { 
    getPatients, 
    updatePatientConsentStatus, 
    searchPatient, 
    patientDeActivate,
    getDoctors,
    getHrLists,
    filterPatientByAccStatus,
    getDoctorsPatientList,
    getHrsPatientList
} from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import {UPDATE_PATIENT_RESET} from '../../constants/adminConstants';


const PatientsList = () => {

    const dispatch = useDispatch();
    let compliantStatus; // variable to store compliant status of patient

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [patientModel, setPatientModel] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [doctorId, setDoctorId] = useState('');
    const [hrId, setHrId] = useState('');
    const [sortPatientByAccount, setSortPatientByAccount] = useState('');

    const alert = useAlert();
    const { loading, error, patients, isUpdated} = useSelector(state => state.admin);
    const { doctors } = useSelector(state => state.doctor);
    const { hrs} = useSelector(state => state.hrslist);
    const { totalPatients } = useSelector(state => state.adminStat);
    const [keyword, setKeyword] = useState('');
    const [searchBy ,setSearchBy] = useState('firstname');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(20);

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(isUpdated){
            alert.success('Status Changed');
            dispatch({type: UPDATE_PATIENT_RESET});
            dispatch(getPatients(resPerPage, currentPage));
            setSmShow(false);
        }

        dispatch(getPatients(resPerPage, currentPage));
        dispatch(getDoctors(resPerPage, currentPage));
        dispatch(getHrLists(resPerPage, currentPage));

    }, [dispatch, alert, error, isUpdated, currentPage]);


        const searchPatientByDoctor = (id) => {
            if(id === "undefined" || ''){
                dispatch(getPatients(resPerPage, currentPage));
                dispatch(getDoctors(resPerPage, currentPage));
                dispatch(getHrLists(resPerPage, currentPage));
                return
            }
            dispatch(getDoctorsPatientList(id));
        }

        const searchPatientByHR = (id) => {
            if(id === "undefined" || ''){
                dispatch(getPatients(resPerPage, currentPage));
                dispatch(getDoctors(resPerPage, currentPage));
                dispatch(getHrLists(resPerPage, currentPage));
                return
            }
            dispatch(getHrsPatientList(id));
            setDoctorId('');
        }

        const searchPatientByAccount = (key) => {
            if(key === 'undefined'){
                return
            }
            
            dispatch(filterPatientByAccStatus(key))
        }
       

    const changeConsentStatus = (id, value) => {
        dispatch(updatePatientConsentStatus(id, value));
        alert.success('Status Changed');
    }

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const searchhandler = () => {
        dispatch(searchPatient(searchBy, keyword));
    }  

    const deActivatePatient = () => {
        dispatch(patientDeActivate(patientModel));
    }

    const refreshHandler = () => {
        dispatch(getPatients(resPerPage, currentPage));
        dispatch(getDoctors(resPerPage, currentPage));
        dispatch(getHrLists(resPerPage, currentPage));
        setHrId('');
        setDoctorId('');
        setKeyword('');
    }

    function calculateCompliancyStatus(date) {  
        var m = moment(date);
        var today = moment().startOf('day');
        var days = moment.duration(today - m).asDays();

        switch(true){
            case (days >= 0 && days < 3):
                compliantStatus = 'compliant'
                break;

            case (days >= 3 && days <= 7):
                compliantStatus = "mostLikelyCompliant"
                break;

            case (days >= 8 && days <= 20):
                compliantStatus = "notLikelyCompliant"
                break;

            case (days >= 8 && days <= 31):
                compliantStatus = "nonCompliant"
                break;
            
            default:
                compliantStatus = 'nonCompliant'
                break;
        }
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
                            <div className="col-md-7">
                                <h5 style={{color: '#8FBB2C'}}>
                                    <i className="bx bx-user"></i> <strong>&nbsp;Active RPM Patients </strong>
                                </h5>
                            </div>

                            <Link to="/adminDashboard" className="btn btn-secondary btn-sm"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn btn-secondary btn-sm" onClick={refreshHandler}><i className='bx bx-refresh'></i></button> &nbsp;
                            <Link to ="/Patients/Inactive" className="btn btn-outline-danger btn-sm">
                                <i className='bx bxs-user'></i> &nbsp;Inactive Patients
                            </Link>
                            <Link to="/addpatient" className="btn btn-outline-primary btn-sm">
                                <i className='bx bxs-user'></i> &nbsp;Add New Patient
                            </Link>                           
                        </div>
                        <hr />

                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row-display">
                                    
                                        <select 
                                            className="form-control select-input-type" 
                                            value={searchBy}
                                            onChange={e => setSearchBy(e.target.value)}
                                            >
                                                <option value="undefined">Filter Patient </option>
                                                <option value="firstname">Firstname</option>
                                                <option value="lastname">Lastname</option>
                                                <option value="email">email</option>
                                                <option value="phone1">phone1</option>
                                                <option value="initialsetup">Initial Month</option>
                                                <option value="diseases">Diseases</option>
                                                <option value="insurancecompany">Ins. Company</option>
                                                <option value="address">Address</option>
                                                <option value="state">State</option>
                                                <option value="city">City</option>
                                                <option value="zipCode">Zip Code</option>
                                        </select>    
                                            &nbsp;
                                            <InputGroup>
                                                    <Form.Control
                                                        placeholder="Search here ..."
                                                        aria-label="Search here ..."
                                                        className="form-control"
                                                        value={keyword}
                                                        onChange={e => setKeyword(e.target.value) }
                                                    />
                                                    &nbsp;<button className="btn btn-outline-primary btn-sm" 
                                                        id="button-addon2" onClick={searchhandler}>
                                                        <i className='bx bx-search-alt'></i>
                                                    </button>
                                            </InputGroup>
                                            </div>
                                        </div>

                                <div className="col-md-6">
                                    <div className="row-display">
                                    {/* Sort By Acc Status, doctor not assigned, nurse not assigned */}

                                    <div>
                                        <select 
                                        value={sortPatientByAccount}
                                        onChange={e => searchPatientByAccount(e.target.value)}
                                        className="form-control">
                                            <option value="undefined"> Device Status.</option>
                                            <option value="nonCompliant">Pts with no device</option>                                                
                                        </select>    
                                    </div>
                                    &nbsp;&nbsp;
                                    {/* Sort by Doctor */}
                                    <div>
                                            <select 
                                            className="form-control"
                                            value={doctorId}
                                            onChange={(e) => {searchPatientByDoctor(e.target.value); setDoctorId(e.target.value)}}
                                            >
                                                <option value="undefined"> Sort By Physician.</option>
                                                {doctors && doctors.map((doc, index) => (
                                                    <option value={doc?._id} key={index}>Dr. {doc?.firstname} {doc?.lastname}</option>                                         
                                                ))}
                                            </select>    
                                    </div>
                                    &nbsp;&nbsp;

                                    {/* Sort By Nurse */}
                                    <div>
                                        <select 
                                                className="form-control"
                                                value={hrId}
                                                onChange={(e) => {searchPatientByHR(e.target.value); setHrId(e.target.value)}} 
                                                >
                                                    <option value="undefined">Sort By Nurse</option>
                                                    {hrs && hrs.map((hr, index) => (
                                                        <option value={hr?._id} key={index}> {hr?.firstname} {hr?.lastname}</option>
                                                    ))}
                                                    
                                        </select>    
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>  
                    <br />


                    {/* Patient List Card */}
                        <div className="col-md-12">
                        {patients && <Fragment>
                            <Table hover striped bordered>
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>DOB </th>
                                <th>Device Status</th>
                                <th>Acc Status</th>
                                <th>Physician</th>
                                <th>Compliancy Status</th>
                                <th>Last Reading </th>
                                <th>Consent Role</th>
                                <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                            
                            {patients && patients.length > 0 ? <Fragment> 
                                {patients && patients.map((patient, index) => (
                                <tr key={index}>  
                                <td>
                                    <Link className="link" 
                                        to={{ pathname: "/patientProfile", state: {patientid: patient?._id, batterySignalStatus: patient?.batterySignals?.sig}}}>
                                        {patient?.firstname} {patient?.lastname}
                                    </Link>
                                </td>
                                
                                <td> {moment(patient?.DOB).format("MM/DD/YYYY")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                
                                <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                        <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                        <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                    {patient?.batterySignals?.sig ? <ProgressBar animated variant="success" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                </td>
                                
                                <td style={{color: 'green'}}>
                                   Active
                                </td> 
                                    
                                {patient?.assigned_doctor_id ? <>
                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                </> : <>
                                <td>---</td>
                                </>}

                                {calculateCompliancyStatus(moment(patient?.lastReading))}    
                        
                                <td>
                                    {patient?.lastReading ? 
                                        compliantStatus === 'compliant' ? <p style={{color: 'green', fontWeight: 'bold'}}>
                                            Compliant</p> : compliantStatus === 'mostLikelyCompliant' ? <p style={{color: '#F95800', fontWeight: 'bold'}}>
                                                Most Likely Compliant</p> : compliantStatus === 'notLikelyCompliant' ? <p style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                                                    Not Likely Compliant</p> : compliantStatus === 'nonCompliant' ? <p style={{color: 'red', fontWeight: 'bold'}}>
                                                    Non Compliant</p> : null : '--'}
                                </td>

                                <td><span style={{fontWeight: 'bold'}}>{patient?.lastReading ? moment(patient?.lastReading).format("MM/DD/YYYY") : '--'}</span>
                                </td>

                                <td>{patient?.patientType}</td>
                                
                                {/* Actions */}
                                <td>
                                <DropdownButton id="dropdown-basic-button" variant="link">
                                    <Dropdown.Item>
                                        <Link className="link" to={{ pathname: "/patientProfile", state: {patientid: patient?._id, batterySignalStatus: patient?.batterySignals?.sig}}}>View Profile</Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link className="link" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}>Edit Details</Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link className="link" style={{color: 'red'}} to="/patients" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}>Inactivate Acc</Link>     
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
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small> 

                            {/* Pagination */}
                                {!isSearch && !doctorId && !hrId && resPerPage <= totalPatients && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={resPerPage} 
                                    totalItemsCount = {totalPatients}
                                    onChange={setCurrentPageNumber} 
                                    nextPageText = {'⟩'}
                                    prevPageText = {'⟨'}
                                    firstPageText = {'«'}
                                    lastPageText = {'»'}
                                    itemClass='page-item'
                                    linkClass="page-link"
                                    />           
                            </div>
                                )}    

                                <Modal
                                    size="sm"
                                    show={smShow}
                                    onHide={() => setSmShow(false)}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Body>
                                        <small style={{color: 'gray'}}>Are you sure you want to Inactivate 
                                            <span style={{color: '#000'}}> {patientToDelete}</span> ?
                                        </small>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <button className="btn btn-sm btn-danger" onClick={deActivatePatient}>Inactive</button>
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

export default PatientsList
