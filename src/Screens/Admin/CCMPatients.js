import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import {Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { 
    getCCMPatients,  
    searchCCMPatient, 
    patientDeActivate 
} from '../../actions/adminActions';
import { Link, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import {UPDATE_PATIENT_RESET} from '../../constants/adminConstants';


const CCMPatients = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [patientModel, setPatientModel] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const alert = useAlert();
    const { loading, error, patients, isUpdated} = useSelector(state => state.admin);
    const { ccmPts } = useSelector(state => state.adminStat)
    const [keyword, setKeyword] = useState('');
    const [searchBy ,setSearchBy] = useState('firstname');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(20);

    useEffect(() =>{
        if(error){
            alert.error(error);
            return
        }

        if(isUpdated){
            alert.success('Status Changed');
            dispatch({type: UPDATE_PATIENT_RESET});
            dispatch(getCCMPatients(resPerPage, currentPage));
            setSmShow(false);
        }

        dispatch(getCCMPatients(resPerPage, currentPage));

    }, [dispatch, error, isUpdated, currentPage]);


        function setCurrentPageNumber(pageNumber) {
            setCurrentPage(pageNumber);
        }

        const searchhandler = () => {
            dispatch(searchCCMPatient(searchBy, keyword));
        }  

        const refreshhandler =() => {
            dispatch(getCCMPatients(resPerPage, currentPage))
        }

        const deActivatePatient = () => {
            dispatch(patientDeActivate(patientModel));
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
                            <div className="col-md-8">
                                <h5 style={{color: '#02C39A'}}>
                                    <i className="bx bx-user"></i> <strong>&nbsp;Active CCM Patients </strong>
                                </h5>
                            </div>

                            <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}>
                                <i className='bx bx-arrow-back' ></i>
                            </button> &nbsp;

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
                                <div className="col-md-8">
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
                                                    &nbsp;<button className="btn btn-outline-primary btn-sm " id="button-addon2" onClick={searchhandler}>
                                                        <i className='bx bx-search-alt'></i>
                                                    </button>
                                                    &nbsp;<button className="btn btn-outline-primary btn-sm" id="button-addon2" onClick={refreshhandler}>
                                                        <i className='bx bx-refresh'></i>
                                                    </button>
                                                    </InputGroup>
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
                                <th>EMRID</th>    
                                <th>Name</th>
                                <th>DOB </th>
                                <th>Acc Status</th>
                                <th>Physician</th>
                                <th>Consent Role</th>
                                <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                            
                            {patients && patients.length > 0 ? <Fragment> 
                                {patients && patients.filter(item => item?.block === false).map((patient, index) => (
                                <tr key={index}>
                                <td>{patient?.emrId || 'N/A'}</td>  
                                <td>
                                    {patient?.patientType === 'CCM' ? <Link className="link" 
                                        to={{ pathname: "/patientprofile/ccm", state: {patientid: patient?._id}}}>
                                         {patient?.lastname +', '+ patient?.firstname}
                                    </Link> : <Link className="link" to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}}>
                                        {patient?.lastname +', '+ patient?.firstname}
                                        </Link>
                                    }
                                </td>
                                
                                <td> {moment(patient?.DOB).format("MM/DD/YYYY")} 
                                    <p><Badge bg="success text-white">{patient?.gender}</Badge></p>
                                </td> 
                                
                                <td style={{color: 'green', fontWeight: 'bold'}}>
                                   Active
                                </td> 
                                    
                                {patient?.assigned_doctor_id ? <>
                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                </> : <>
                                <td>N/A</td>
                                </>}

                                <td>{patient?.patientType}</td>
                                
                                {/* Actions */}
                                <td>
                                <DropdownButton id="dropdown-basic-button" variant="link">
                                    <Dropdown.Item>
                                        {patient?.patientType === 'CCM' ? <Link className="link" to={{ pathname: "/patientprofile/ccm", state: {patientid: patient?._id}}}>View Profile</Link>
                                        : <Link className="link" to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}}>
                                            View Profile
                                        </Link>}
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link className="link" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}>Edit Details</Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link className="link" style={{color: 'red'}} to="/Patients/CCM" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}>Inactivate Acc</Link>     
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
                                {!isSearch && resPerPage <= ccmPts && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={resPerPage} 
                                    totalItemsCount = {ccmPts}
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

export default CCMPatients
