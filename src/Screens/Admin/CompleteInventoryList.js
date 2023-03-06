import React, { useState, useEffect } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getAllDevices } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import {useSelector, useDispatch } from 'react-redux';
import { Table, Badge } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import ExportInventoryTOCSV from '../../components/ExportInventoryTOCSV'; 

const CompleteInventoryList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1); //for pagination, current page
    const [resPerPage, setResPerPage] = useState(2000); 

    const { loading, error, devices, isDeleted } = useSelector(state => state.devices);

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getAllDevices(resPerPage, currentPage));

    }, [dispatch, alert, error, isDeleted, currentPage])


  return (
    <>
        <MetaData title="Download Inventory"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />
        {loading ? <Loader /> : ( <>    
        <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
            <div className="home-content">
                <div className="row-display"> 
                        <h5 className="pt-2">Inventory List </h5>
                        
                        {devices && devices.length > 0 && (<>
                            <ExportInventoryTOCSV csvData={devices} className="add-staff-btn" fileName="Inventory.csv" />
                        </>)}
                </div>

                <br />
                <div className="col-md-12">
                         <>
                         {devices && <>
                            <Table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                    <th>Device ID</th>
                                    <th>IMEI</th>
                                    <th>Device Type </th>
                                    <th>Broken</th>
                                    <th>Status</th>
                                    <th>Ass. To</th>
                                    <th>Ass. Date</th>
                                    <th>Firmware</th>
                                    <th>Hardware</th>

                                </tr> 
                            </thead>

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={index}>
                                    <td><Link to={{ pathname:"/devicedetails", state: {id: device?._id}}}>{device?._id}</Link></td>
                                    <td>{device?.imei ? device?.imei : 'N/A'}</td>
                                    {device?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" className="male-tag">cuff</Badge></td>
                                        : device.deviceType === 'spO2' ? <td><Badge bg="info text-white" className="male-tag">Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" className="male-tag">Weight</Badge></td>}
                                    {device?.broken === true ? <td style={{color: 'red', fontWeight: 'bold'}}>Broken</td> : <td>unbroken</td> }
                                    
                                    {device?.assigned_patient_id ? <td style={{backgroundColor: 'green', color: '#FFF'}}>Assigned</td> : <td style={{color: 'green', fontWeight: 'bold'}}>In Stock</td>}
                                    <td>{device?.assigned_patient_id ? device?.assigned_patient_id?.lastname : 'N/A'}</td>
                                    <td>{moment(device?.assignedTime).format("ll") || 'N/A'}</td>
                                    <td>{device?.firmwareVersion || 'N/A'}</td>
                                    <td>{device?.hardwareVersion || 'N/A'}</td>

                                </tr>                      
                            ))}
                             </tbody>
                            </Table>  
                         
                            </> 
                            } 
                          </>                
                         </div>
            </div>
            </div>
            </>
        )}

        </section>
        </>
  )
}

export default CompleteInventoryList