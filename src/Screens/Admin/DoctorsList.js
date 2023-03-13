import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, doctorDeActivate, doctorActivate } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import {Badge, Table, Modal, DropdownButton, Dropdown } from 'react-bootstrap';


const DoctorsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(10);

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [doctorModel, setDoctorModel] = useState(null);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [sort, setSort] = useState('ascending');
    const [query, setQuery] = useState("");
    const keys = ["firstname", "lastname", "email", "npinumber", "phone1"];

    // const { loading, error, isUpdated} = useSelector(state => state.admin);
    const {loading, message, error } = useSelector(state => state.common);
    const { doctors } = useSelector(state => state.doctor);
    const { totalDrs } = useSelector(state => state.adminStat);
        
    useEffect(() =>{
        if(error){
            alert.error(error);
        }

        if(message) {
            alert.success(message);
            dispatch(getDoctors(resPerPage, currentPage));
            setSmShow(false);
        }

        dispatch(getDoctors(resPerPage, currentPage));

    }, [dispatch, error, currentPage, message]);

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    } 

    const deActivateDoctor = () => {
        dispatch(doctorDeActivate(doctorModel));
    }

    const activateDoctor = () => {
        dispatch(doctorActivate(doctorModel));
    }

    return (
        <Fragment>
                <MetaData title="Doctors"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : (
                <Fragment>   
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card">
                    <div className="home-content">

                    <div className="row-display">
                            <h5 style={{color: '#8FBB2C'}}>
                                <i className='bx bx-plus-medical'></i> <strong>&nbsp;List of Doctors </strong>
                            </h5>

                            <div className="row-display"> 
                                <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                    
                                &nbsp;&nbsp;
                                <Link to="/adddoctor" className="add-staff-btn">Add New Doctor</Link>
                            </div>
                        </div>
                        <hr />

                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="row-display">    
                                    <input type="text" 
                                        placeholder="Search doctor..." 
                                        className="form-control" 
                                        style={{width: '200px'}}
                                        onChange={e => setQuery(e.target.value)}
                                    />
                                        &nbsp;&nbsp;&nbsp;

                                        <button className="btn btn-primary" onClick={() => setSort(sort => !sort)}>
                                            {sort ? <i className="bx bx-sort-z-a"></i> : <i className="bx bx-sort-a-z"></i>}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-9">
                                   
                                </div>
                            </div>
                        </div>
                    </div>  
                    <br />

                    {/* Patient List Card */}
                        <div className="col-md-12">
                         <Fragment>
                         <Table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender </th>
                                    <th>NPI Number</th>
                                    <th>Phone 1</th>
                                    <th>HR</th>
                                    <th>Acc Status</th>
                                    <th>Action</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {sort ? <>
                            {doctors && doctors.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((doctor, index) => ( 
                                <tr key={index}>
                                <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}}> Dr. {doctor?.firstname} {doctor?.lastname} </Link></td>
                                
                                <td style={{wordWrap: 'break-word'}}>{doctor?.email}</td>
                                
                                {doctor?.gender === 'male' ? <td>
                                    <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                    </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                </td>}

                                <td>{doctor?.npinumber ? doctor?.npinumber : '--'}</td>
                                
                                <td>{doctor?.phone1 ? doctor?.phone1 : '--'}</td>

                                <td style={{color:"#8FBB2C"}}>{doctor?.assigned_hr_id ? <>HR. {doctor?.assigned_hr_id?.firstname}  {doctor?.assigned_hr_id?.lastname}</> : '--'} </td>
                                
                                {doctor?.block === false ? <td>
                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                    </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                </td>}
                                
                                {/* Actions Dropdown */}
                                <td>
                                        <DropdownButton id="dropdown-basic-button" variant="Light">
                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}} className="link">View Profile</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/Doctor/Edit", state: {id: doctor}}} className="link">Edit Details</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                {doctor?.block === false ? <Link to="/doctors" style={{color: 'red'}} className="link" onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}>Block Account</Link> : 
                                                <Link to="/doctors" className="link" style={{color: 'green'}} onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}>Activate Account</Link> }
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                {/* Actions Dropdown ends*/}
                            </tr> 
                             ))} 
                            </> : <>
                            {doctors && doctors.reverse().filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((doctor, index) => ( 
                                <tr key={index}>
                                 <td><Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#222'}} to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}}> Dr. {doctor?.firstname} {doctor?.lastname} </Link></td>
                                
                                <td style={{wordWrap: 'break-word'}}>{doctor?.email}</td>
                                
                                {doctor?.gender === 'male' ? <td>
                                    <Badge pill bg="primary text-white" style={{fontSize: '12px', fontWeight: 300}}>Male</Badge>
                                    </td> : <td><Badge pill bg="info text-white" style={{fontSize: '12px'}}>Female</Badge>
                                </td>}
                                
                                <td>{doctor?.npinumber ? doctor?.npinumber : '--'}</td>
                                
                                <td>{doctor?.phone1 ? doctor?.phone1 : '--'}</td>

                                <td style={{color:"#8FBB2C"}}>{doctor?.assigned_hr_id ? <>HR. {doctor?.assigned_hr_id?.firstname}  {doctor?.assigned_hr_id?.lastname}</> : '--'} </td>
                                
                                {doctor?.block === false ? <td>
                                    <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                    </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                </td>}
                                {/* Actions Dropdown */}
                                <td>
                                        <DropdownButton id="dropdown-basic-button" variant="Light">
                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}} className="link">View Profile</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to={{ pathname: "/Doctor/Edit", state: {id: doctor}}} className="link">Edit Details</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                {doctor?.block === false ? <Link to="/doctors" style={{color: 'red'}} className="link" onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}>Block Account</Link> : 
                                                <Link to="/doctors" className="link" style={{color: 'green'}} onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}>Activate Account</Link> }
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                {/* Actions Dropdown ends*/}
                            </tr> 
                             ))}
                            </>}    
                            
                             
                             </tbody>
                            </Table> 
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small> 


                            {/* Pagination */}
                                {resPerPage <= totalDrs && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={resPerPage} 
                                    totalItemsCount = {totalDrs}
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
                        </Fragment>                      
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
                    <small style={{color: 'gray'}}>Are you sure you want to activate / block 
                        <span style={{color: '#000'}}> Dr. {doctorToDelete}'s</span> Account ?
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-success" onClick={activateDoctor}>Activate</button>
                    <button className="btn btn-sm btn-danger" onClick={deActivateDoctor}>Block</button>
                </Modal.Footer>
            </Modal>  
        </Fragment>
    )
}

export default DoctorsList;
