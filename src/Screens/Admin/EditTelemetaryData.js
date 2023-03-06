import React, { useEffect, useState } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import moment from 'moment';
import { useSelector, useDispatch} from 'react-redux';
import {updatetelemetary} from '../../actions/adminActions';
import { useAlert } from 'react-alert';

const EditTelemetaryData = (props) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();

  let telemetarydata = props?.location?.state?.telemetaryData;

  const {message, error } = useSelector(state => state.common);

  const [sys, setSys] = useState(telemetarydata?.telemetaryData?.sys);
  const [dia, setDia] = useState(telemetarydata?.telemetaryData?.dia);
  const [pul, setPul] = useState(telemetarydata?.telemetaryData?.pul);
  const [dateAdded, setDateAdded] = useState(telemetarydata?.dateAdded);
  const [Id, setId] = useState(telemetarydata?._id);

  useEffect(() =>{
    if(error){
        return alert.error(error);
    }

    if(message){
        alert.success(message);
        props?.history?.goBack();
    }

}, [dispatch, error, message]);

    // console.log('Id is ' + Id);

  const editTelemetaryData = () => {    
    dispatch(updatetelemetary(Id, sys, dia, pul, dateAdded));
    }

  return (
    <>
        <MetaData title="Edit Telemetary Data"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />  
                
                <p>Id is {Id}</p>
                

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <h5 className="pt-2 mt-2">Edit <span style={{ color: '#02C39A'}}> Telemetary Data </span></h5>
                            <hr/>          

                                <div className="row">
                                    <div className="col-lg-4">

                                    </div>

                                    <div className="col-lg-4">
                                        <div>

                                        <label htmlFor="sys" className="form-label mt-3">Systolic</label>
                                            <input 
                                                type="text"
                                                name="sys"
                                                className="form-control"
                                                placeholder="Enter Systolic *"
                                                value={sys}
                                                onChange={e => setSys(e.target.value)}
                                            />

                                            <label htmlFor="dia" className="form-label mt-3">Diastolic</label>
                                            <input 
                                                type="text"
                                                name="dia"
                                                className="form-control"
                                                placeholder="Enter Diastolic *"
                                                value={dia}
                                                onChange={e => setDia(e.target.value)}
                                            /> 

                                            <label htmlFor="pul" className="form-label mt-3">Pulse</label>
                                            <input 
                                                type="text"
                                                name="pul"
                                                className="form-control"
                                                placeholder="Enter Pulse *"
                                                value={pul}
                                                onChange={e => setPul(e.target.value)}
                                            />

                                            <label htmlFor="dateAdded" className="form-label mt-3">Created At</label>
                                            <input 
                                                type="text"
                                                name="dateAdded"
                                                className="form-control"
                                                placeholder="Created At *"
                                                value={dateAdded}
                                                onChange={e => setDateAdded(e.target.value)}
                                            />
                                            <small>Note: Date should be in format YYYY/MM/DD. </small>

                                            <div className="mt-3" style={{ float: 'right'}}>
                                                <button className="submit-btn ml-3" onClick={editTelemetaryData}>Update</button>
                                            </div> 

                                            <br/><br/>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        
                                    </div>
                                </div>    
                            </div>
                        </div>
                </div>
                </section>
    </>
  )
}

export default EditTelemetaryData