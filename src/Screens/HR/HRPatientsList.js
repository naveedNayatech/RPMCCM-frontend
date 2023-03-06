import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { getHRPatients } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { Link } from 'react-router-dom';
import { Table, Badge, DropdownButton, Dropdown, ProgressBar } from 'react-bootstrap';
import moment from 'moment';
import { useAlert} from 'react-alert';



const HRPatientsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let compliantStatus; // variable to store compliant status of patient

    const { isAuthenticated, user} = useSelector(state => state.auth);
    const { loading, error, hrpatients} = useSelector(state => state.hrPatients);

    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState("");
    const keys = ["firstname", "lastname", "DOB", "email", "phone1"];

    let id = user._id;


    useEffect(() => {
		if(error) {
			alert.error(error);
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])

    useEffect(() => {
		if(error) {
			alert.error(error);
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])

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

  return <Fragment>
      <MetaData title="Patients List" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />


                {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row-display">
                                <h5 style={{color: '#02C39A'}}>
                                <i className="fas fa-user-injured" style={{color: '#ED553B', fontSize: '24px'}}></i>
                                 <strong>&nbsp;&nbsp;My Patients </strong>
                                </h5>

                                <div className="row-display"> 
                                        <Link to="/Nurse/Dashboard" className="btn btn-secondary pt-2"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                        &nbsp;&nbsp;
                                        <Link to="/Nurse/Add_New_Patient" className="add-staff-btn">+ Add New Patient</Link> 
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="row-display">    
                                        <input 
                                                type="text" 
                                                className="form-control mt-2"
                                                onChange={e => setQuery(e.target.value)}
                                                placeholder="Search"
                                                style={{width: '180px', height: '40px'}}
                                            /> 

                                            &nbsp;&nbsp;&nbsp;
                                            <button className="btn add-staff-btn mt-2" 
                                            onClick={() => setSort(sort => !sort)}
                                            style={{height: '40px'}}
                                            >
                                            {sort ? <i className="bx bx-sort-a-z"></i> : <i className="bx bx-sort-z-a"></i>}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-9">
                                    
                                    </div>
                                  </div>
                                </div>
                            <br />
                                
                                {hrpatients?.length > 0 ? (<Fragment>
                                <div className="container-fluid col-md-12">
                                    <Fragment>
                                        <Table className="table table-sm table-striped">
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Device Status</th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Compliancy Status</th>
                                            <th>Last Reading </th>
                                            <th>Consent Program</th>
                                            <th>Actions</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                        {hrpatients && hrpatients.filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => (  
                                            <tr key={index}>
                                            
                                        {patient?.block === false ? <td>
                                            <Link style={{textDecoration: 'none', color: 'dodgerblue', fontWeight: 'bold'}} 
                                                to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id }}}>{patient?.firstname} 
                                                {patient?.lastname} <p>{patient?.phone1}</p>
                                            </Link>
                                        </td> : <td>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></td> }
                                        
                                        <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                                    
                                        <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                                <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                                <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                            {patient?.batterySignals?.sig ? <ProgressBar striped variant="info" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                        </td>
                                
                                        {patient?.block === false ? <td>
                                            <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                            </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                        </td>}

                                        {patient?.assigned_doctor_id ? <>
                                            <td style={{color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                            </> : <>
                                            <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Not Assigned</Badge></td>
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

                                        <td><span style={{fontWeight: 'bold'}}>{patient?.lastReading ? moment(patient?.lastReading).format("LL") : '--'}</span>
                                        {/* <p>{patient?.lastReading ?  moment(patient?.lastReading).fromNow() : null}</p> */}
                                        </td>

                                        <td>{patient?.assigned_hr_id === id && patient?.assigned_ccm_nurse_id !== id ? <b>RPM</b> : 
                                                    patient?.assigned_ccm_nurse_id === id && patient?.assigned_hr_id !== id ? <b>CCM</b> : 
                                                    patient?.assigned_hr_id === id && patient?.assigned_ccm_nurse_id === id ? <b>RPM, CCM</b> : 
                                                null }   
                                            </td> 


                                            <td>
                                            <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                <Dropdown.Item>
                                                    <Link className="link" to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                                </Dropdown.Item>
                                            </DropdownButton>
                                            </td>
                                        </tr> 
                                        ))}
                                        </> : <>
                                        
                                        {hrpatients && hrpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            {patient?.block === false ? <td>
                                                <Link style={{textDecoration: 'none', color: 'dodgerblue', fontWeight: 'bold'}} 
                                                to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id }}}>
                                                    {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p>
                                                </Link>
                                            </td> : <td>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></td> }
                                            
                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td>{patient?.batterySignals?.sig >= 0 && patient?.batterySignals?.sig <= 10 ? 
                                                    <text style={{color: 'red', fontWeight: 'bold'}}>Weak</text> : patient?.batterySignals?.sig > 10 && patient?.batterySignals?.sig <= 20 ? 
                                                    <text style={{color: 'orange', fontWeight: 'bold'}}>Medium</text> : patient?.batterySignals?.sig > 20 ? <text style={{color: 'green', fontWeight: 'bold'}}>Strong</text> : '--'} 

                                                {patient?.batterySignals?.sig ? <ProgressBar striped variant="info" now={patient?.batterySignals?.bat} label={`${patient?.batterySignals?.bat}%`} /> : '--'}
                                            </td>
    
                                            {patient?.block === false ? <td>
                                                <Badge pill bg="success text-white" style={{fontSize: '12px', fontWeight: 300}}>Activated</Badge>
                                                </td> : <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Inactive</Badge>
                                            </td>}

                                            {patient?.assigned_doctor_id ? <>
                                                <td style={{color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                                </> : <>
                                                <td><Badge pill bg="danger text-white" style={{fontSize: '12px'}}>Not Assigned</Badge></td>
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
                                        <p>{patient?.lastReading ?  moment(patient?.lastReading).fromNow() : null}</p>
                                        </td>

                                        <td>{patient?.rpmconsent === true && patient?.isCCM === false ? <b>RPM</b> : 
                                                patient?.isCCM === true && patient?.rpmconsent === false ? <b>CCM</b> : 
                                                patient?.rpmconsent === true && patient?.isCCM === true ? <b>RPM, CCM</b> : 
                                                <b>RPM</b>
                                            }   
                                        </td>

                                            <td>
                                            <DropdownButton id="dropdown-basic-button" variant="Light" disabled={patient?.block === true ? true : false}>
                                                <Dropdown.Item>
                                                    <Link className="link" to={{ pathname: "/Nurse/Patient/Profile", state: {patientid: patient?._id}}}>View Profile</Link>
                                                </Dropdown.Item>
                                            </DropdownButton>
                                            </td>
                                        </tr> 
                                        
                                        ))}

                                        </> }
                                         
                                        </tbody>
                                        </Table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>
                        <div>   
                                           
                        <img src={folderImg} className="no-record-found-img"/>
                        <p className="doctor-specilizations">No Patient Assigned Yet...</p>                            
                                    </div>
                                </Fragment> }
                            </div>
                        </div>
                    </div>
                </Fragment>
                    }
            </section>
  </Fragment>;
};

export default HRPatientsList;
