import React, { useState, useEffect, Fragment } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevices, sortRPMDevicesByBroken, sortRPMDevices, deleteRPMDevice, searchRPMDevices } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import Loader from '../../layouts/Loader';
import Pagination from 'react-js-pagination';
import { Badge, Modal, Table, Form, InputGroup, Button, DropdownButton, Dropdown, ProgressBar } from 'react-bootstrap';
import InventoryAnalytics from '../../components/inventory/InventoryAnalytics';
import ReactTooltip from "react-tooltip";
import moment from 'moment';

const RPMDevices = (props) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, deviceCount, devices } = useSelector(state => state.devices);
    const {message, error } = useSelector(state => state.common);

    const [deviceModel, setDeviceModel] = useState(null);
    const [deviceToDelete, setDeviceToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); //for pagination, current page
    const [resPerPage, setResPerPage] = useState(20); //for pagination, how many responses we want to show
    const [search, setSearch] = useState(''); 
    const [searchBy, setSearchBy] = useState('imei');

    const [smShow, setSmShow] = useState(false); //small confirm modal

    useEffect(() => {
        if(error){
        return alert.error(error);
        }

        if(message) {
            alert.success(message);
            props?.history.push('/devices');
            setSmShow(false);    
        }

        dispatch(getAllDevices(resPerPage, currentPage));

    }, [dispatch, alert, error, message, currentPage])

    const sortDevices = (event) => {
        let updatedValue = event.target.value;

        if (updatedValue === "true" || updatedValue == "false") {
            updatedValue = JSON.parse(updatedValue);
        }
        dispatch(sortRPMDevices(updatedValue));
    }

    const sortDevicesByBroken = (event) => {
        let brokenValue = event.target.value;

        if (brokenValue === "true") {
            brokenValue = JSON.parse(brokenValue);
        }

        dispatch(sortRPMDevicesByBroken(brokenValue));
    }

    const deleteHandler = () => {
        dispatch(deleteRPMDevice(deviceToDelete));
    }

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    } 

    const searchDevice = () => {
        dispatch(searchRPMDevices(searchBy, search))
    };

    const refreshHandler = () => {
        dispatch(getAllDevices(resPerPage, currentPage));
    }

    return (
        <Fragment>
              <MetaData title="RPM Devices "/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />


                {loading ? <Loader /> : ( <Fragment>    
                <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                    <div className="home-content">
                    
                    <div className="row-display">
                        
                        <h5 style={{color: '#02C39A'}}>
                            <i className='bx bxs-devices'></i> <strong>&nbsp;Inventory Management </strong>
                        </h5>
                            
                        <div className="row-display">
                            <Link to="adminDashboard" className="btn btn-secondary pt-2"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn btn-secondary pt-2" onClick={refreshHandler}><i className='bx bx-refresh'></i></button> &nbsp;
                        <Link to="/device" className="add-staff-btn">
                            <small>Add New Device</small>
                        </Link>
                        </div>
                    </div>
                    <hr />

                     {/* Component of devices list */}
                        <InventoryAnalytics />        
                     {/* Devices List Card */}
                    <br />

                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row-display">
                                    <select name="listDevice" 
                                        className="form-control shadow-none select-input-type"
                                        value={searchBy}
                                        onChange={e => setSearchBy(e.target.value)}
                                        >
                                        <option value="undefined">Search device By </option>
                                        <option value="_id">Device ID</option>
                                        <option value="imei">IMEI</option>
                                        <option value="modelNumber">Model Number</option>
                                        <option value="deviceType">Device Type</option>
                                        <option value="firmwareVersion">Firmware Version</option>
                                        <option value="hardwareVersion">Hardware Version</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;
                                    <InputGroup>
                                            <Form.Control
                                                placeholder="Search here ..."
                                                aria-label="Search here ..."
                                                className="form-control"
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                            />
                                            <Button variant="outline-info" id="button-addon2" onClick={searchDevice}>
                                                Search
                                            </Button>
                                    </InputGroup> 
                                </div>
                            </div>

                            <div className="col-md-4">
                                    <div className="row-display">
                                        <select name="listDevice" 
                                            className="form-control shadow-none select-input-type"
                                            defaultValue={'List Device By'}
                                            onChange={sortDevices}
                                        >
                                            <option disabled>List Device By</option>
                                            <option value="true"> In Stock</option>
                                            <option value="false"> Assigned </option>
                                        </select>
  
                                        &nbsp;&nbsp;
                                        <div>
                                            <select name="listDevice" 
                                                className="form-control select-input-type"
                                                    defaultValue={'Sort By'}
                                                    onChange={sortDevicesByBroken}
                                            >
                                                <option disabled>Sort By</option>
                                                <option value="true"> Broken</option>
                                            </select>
                                        </div>
                                        
                                        &nbsp;&nbsp;
                                        <div>
                                            <Link to="/Admin/Inventory/Download" className="add-staff-btn" data-tip data-for="downloadcsv">
                                                <i className='bx bxs-download'></i>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <ReactTooltip id="downloadcsv" type="dark" effect="solid">
                            Download complete list in .csv
                        </ReactTooltip>
                        <br /> 

                        <div className="col-md-12">
                         <Fragment>
                         {devices && <Fragment>
                            <Table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                    <th>Device ID</th>
                                    <th>IMEI</th>
                                    <th>Device Type </th>
                                    <th>Broken</th>
                                    <th>Status</th>
                                    <th>Signal</th>
                                    <th>Battery</th>
                                    <th>Assigned To</th>
                                    <th>Action</th>
                                </tr> 
                            </thead>

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={index}>
                                    <td><Link className="link" to={{ pathname:"/devicedetails", state: {id: device?._id}}}>{device?._id}</Link></td>
                                    <td>{device?.imei ? device?.imei : 'N/A'}</td>
                                    {device?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" style={{padding: '10px', letterSpacing: '2px'}}>cuff</Badge></td>
                                        : device.deviceType === 'spO2' ? <td><Badge bg="info text-white" style={{padding: '10px', letterSpacing: '2px'}}>Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" style={{padding: '10px', letterSpacing: '2px'}}>Weight</Badge></td>}
                                    {device?.broken === true ? <td style={{color: 'red', fontWeight: 'bold'}}>Broken</td> : <td>unbroken</td> }
                                    
                                    {device?.assigned_patient_id ? <td style={{color: 'green'}}>Assigned</td> : <td style={{color: 'dodgerblue', fontWeight: 'bold'}}>In Stock</td>}
                                    
                                    <td>{device?.signal?.sig >= 0 && device?.signal?.sig <= 10 ? 
                                        <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : device?.signal?.sig > 10 && device?.signal?.sig <= 20 ? 
                                        <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : device?.signal?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : null} 
                                        <p>{device?.signal?.sig ? moment(device?.dateAdded).format("MM/DD/YYYY") : null} &nbsp;
                                            {device?.signal?.sig ? device?.time : null}
                                        </p>
                                    </td>

                                    <td>{device?.signal?.bat ? <ProgressBar striped variant="info" now={device?.signal?.bat} label={`${device?.signal?.bat}%`} /> : null} </td>

                                    <td>{device?.assigned_patient_id ? <span style={{ color: '#23408e'}}> {device?.assigned_patient_id?.lastname}, {device?.assigned_patient_id?.firstname} </span> : 'N/A'}</td>
                                    
                                    {/* Actions */}
                                    <td>
                                        <DropdownButton id="dropdown-basic-button" variant="Light">
                                            <Dropdown.Item href="#/action-1">
                                                <Link to={{ pathname:"/devicedetails", state: {id: device?._id}}} className="link">View Details</Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to={{ pathname:"/updatedevice", state: {deviceDetails: device}}} className="link">Edit Details</Link>                       
                                            </Dropdown.Item>

                                            <Dropdown.Item>
                                                <Link to="/devices" className="link" style={{color: 'red'}} onClick={() => {setSmShow(true); setDeviceModel(device?._id); setDeviceToDelete(device?._id)}} >Delete Device</Link>
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                    {/* Actions ended*/}
                                </tr>                      
                            ))}
                             </tbody>
                            </Table>  
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small>  

                            {resPerPage <= deviceCount && (
                            <div className="d-flex justify-content-center mt-5"> 
                                <Pagination activePage={currentPage} 
                                itemsCountPerPage={resPerPage} 
                                totalItemsCount = {deviceCount}
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
                            } 
                          </Fragment>                
                         </div>
                        </div>

                        <Modal
                            size="sm"
                            show={smShow}
                            onHide={() => setSmShow(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                        >
                            <Modal.Body>
                                <small style={{color: 'gray'}}>Are you sure you want to delete RPM device having model number
                                    <span style={{color: '#000'}}> {deviceModel}</span> ?
                                 </small>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-sm btn-danger" onClick={deleteHandler}>Delete</button>
                            </Modal.Footer>
                        </Modal>
                    </Fragment> 
                    )}
                </section>
                
        </Fragment>
    )
}

export default RPMDevices
