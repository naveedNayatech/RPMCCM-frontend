import React, {useEffect} from 'react';
import Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import { getDoctorCareplans } from '../../actions/adminActions';
import { Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';


const DocCareplanList = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading, careplanlist } = useSelector(state => state.careplans);
  const history = useHistory();
  
  let id = user._id;

  useEffect(() => {
    dispatch(getDoctorCareplans(id));
}, [dispatch])


const downloadFile = (fileName) => {
  window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
}


  return (<>
    <MetaData title="My Patients"/>
    <Sidebar />    

    <section className="home-section">
    {/* TopBar */}
    <TopBar />

    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
        <div className="home-content">
            <div className="row-display">
              <h5 className="title">RPM Careplans <span style={{color: '#004488'}}>List </span></h5>
              <button 
              onClick={() => history.goBack()}
              className="btn btn-secondary btn-sm"><i className="bx bx-arrow-back"></i></button>
            </div>
            <br />
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
                                {careplanlist && careplanlist.length > 0 ? <>
                                  {careplanlist && careplanlist.map((careplan, index) => ( 
                                    <tr key={index}>
                                    
                                    <td>
                                        <p>{careplan?.assigned_patient_id?.firstname +" "+ careplan?.assigned_patient_id?.lastname}</p>
                                    </td> 


                                    <td> <p>{careplan?.assigned_hr_id?.firstname +" "+ careplan?.assigned_hr_id?.lastname } </p>
                                    </td>
                                        
                                    <td> <b>{careplan?.readingsPerDay || '--'} / {careplan?.readingsPerMonth || 'N/A'}</b>
                                    </td>

                                    <td> <p>{careplan?.Description || '--'}</p></td>

                                    <td>
                                    {careplan?.fileName ? 
                                        <button className="btn btn-outline-primary" onClick={() => downloadFile(careplan?.fileName)}>
                                          {careplan?.fileName} 
                                        </button> : <b style={{color: 'red'}}>No file added.</b> }   
                                     </td>
                                </tr> 
                                
                                ))}
                                 </> : 
                                  <p className="text-center">
                                    <span style={{color: 'crimson', fontWeight: 'bold'}}>No Careplan found ! </span>
                                  </p> 
                                 }
                                </tbody> 
                        </Table> }
              </>
            
        </div>
    </div>
    </section>
    </>
  )
}

export default DocCareplanList