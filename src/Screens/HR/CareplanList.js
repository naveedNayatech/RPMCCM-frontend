import React, { useState, useEffect } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { useSelector, useDispatch } from 'react-redux';
import { getHRCareplans } from '../../actions/HRActions';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../../layouts/Loader';

const CareplanList = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    const [query, setQuery] = useState("");

    const keys = ["Description"];

    const { loading, careplanlist } = useSelector(state => state.careplans);

    let hrId = user?._id;

    useEffect(() => {

     dispatch(getHRCareplans(hrId));   
    }, [dispatch]);

    const downloadFile = (fileName) => {
        // local link
        // window.open(`http://localhost:5000/v1/uploadFiles/${fileName}`);
        // live link
        window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
      }


  return (
    <>
      <MetaData title="Careplan List"/>
        <HRSidebar />    

        <section className="home-section">
        {/* TopBar */}
        <HRTopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
            <div className="container">
            <div className="row-display">         

            <h5 style={{color: '#8FBB2C'}}>
                <i className="fas fa-hospital-user" style={{color: '#3CAEA3', fontSize: '24px'}}></i>
                <strong>&nbsp;&nbsp;RPM Careplans List </strong>
            </h5> 
                    
                <div className="row-display">
                    <Link to="/Nurse/Dashboard">
                        <button className="btn btn-secondary btn-sm">
                            <i className='bx bx-arrow-back'></i>
                        </button>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to="/Nurse/Dashboard">
                        <button className="btn btn-secondary btn-sm">
                        <i className='bx bxs-home'></i>
                        </button>
                    </Link>
                </div> 
              </div>
            </div>
            <hr />

            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <input 
                    type="text" 
                    className="form-control mt-2 mb-2 mr-3"
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search"
                    style={{width: '180px', height: '40px'}}
                />
            </div>


            <div className="home-content">
                <div className="container-fluid col-md-12">
                    <>
                    {loading ? <Loader /> : <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Patient Name</th>
                                <th>HR  </th>
                                <th>RPD / RPM </th>
                                <th>Careplan Description</th>
                                <th>File</th> 
                                </tr>
                            </thead>

                             <tbody>
                                 {careplanlist.length > 0 ? <>
                                    {careplanlist && careplanlist.filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((careplan, index) => ( 
                                    <tr key={index}>
                                    
                                    <td>
                                        <p>{careplan?.assigned_patient_id?.firstname +" "+ careplan?.assigned_patient_id?.lastname}</p>
                                    </td> 

                                    <td> <p>{careplan?.assigned_hr_id?.firstname +" "+ careplan?.assigned_hr_id?.lastname} </p>
                                    </td>
                                        
                                    <td> <b>{careplan?.readingsPerDay || '--'} / {careplan?.readingsPerMonth || 'N/A'}</b>
                                    </td>

                                    <td> <p>{careplan?.Description || 'N/A'}</p></td>

                                    <td>
                                        {careplan?.fileName ? <>
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => downloadFile(careplan?.fileName)}>
                                            {careplan?.fileName} 
                                        </button>
                                        </> : null}    
                                    </td>
                                </tr> 
                                
                                ))}
                                 </> : <td>
                                  <small>No Careplan for this HR</small>
                                  </td>}
                                </tbody> 
                        </Table> }
                    </>
                    </div>



            </div>
        </div>
        </section>
    </>
  )
}

export default CareplanList