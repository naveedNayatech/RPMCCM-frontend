import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link, useHistory } from 'react-router-dom';
import { getDeviceHistory } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layouts/Loader';
import moment from 'moment';

const DevicesHistory = () => {

const dispatch = useDispatch();
const [count, setCount] = useState(0);
const history = useHistory();
const [searchAction, setSearchAction] = useState('all');
  
const {loading, error, deviceHistory} = useSelector(state => state.deviceHistory);


  useEffect(() => {
    setCount((count) => count + 1);
        dispatch(getDeviceHistory());
    return
  }, []);

    return (
    <>
    <MetaData title="Devices History"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg mb-5 mr-4 ml-4 rounded-card">
            <div className='p-3'>
            <div className="row-display">
                  <div className="col-md-11">
                    <h5 style={{color: '#8FBB2C'}}>
                      <i className='bx bxs-devices'></i> <b>&nbsp;Devices History </b>
                    </h5>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></button> &nbsp;
                  <Link to="/adminDashboard" className="btn btn-secondary btn-sm pt-2"><i className="bx bx-home"></i></Link> &nbsp;
                </div>
            <hr />

            <div className="row-display">
              <div>
              <b>Total Results Found : </b> &nbsp;
               {deviceHistory && deviceHistory?.length}              
               </div>

              <div>
                <b>Sort By : </b> <select 
                className="form-control"
                value={searchAction}
                onChange={e => setSearchAction(e.target.value)}
                >
                <option value="all">All</option>
                  <option value="assigned">Assigned</option>
                  <option value="unassigned">Unassigned</option>
                </select>
              </div>
            </div>

            {loading ? <Loader /> : <>
            <div className="row">
            {deviceHistory && deviceHistory.filter(item => searchAction !== 'all' ? item?.actionPerformed === searchAction : item).map((history, index) => (
              <div className="col-md-3 mt-4" key={index + 1 }>
              <div className="card">
                <div className={`ribbon ribbon-top-left`}> 
                  <span style={{backgroundColor: history?.actionPerformed === 'unassigned' ? 'red' : 'green'}}>
                    {history?.actionPerformed === 'unassigned' ? 'Unassigned' : 'assigned'}
                  </span>
                </div>

                <div className="container text-center">
                  <label className="profile-label mt-3">Device ID: </label>
                  <p>{history?.deviceID || 'N/A'}</p>
                  <div className="row" style={{justifyContent: 'center'}}>
                    <i className="fas fa-tachometer-alt deviceHistoryIcons"></i>
                    <i className={`fas ${history?.actionPerformed === 'unassigned' ? 'fa-angle-left' : 'fa-angle-right'} deviceHistoryIcons`}></i>
                    <i className="fas fa-user deviceHistoryIcons"></i>
                  </div>
                  
                    {history?.actionPerformed === 'unassigned' ? <small style={{color: 'red', fontWeight: 'bold'}}>
                      Unassigned
                    </small> : <small style={{color: 'green', fontWeight: 'bold'}}>
                      Assigned
                    </small>}
                  <br/>

                  <label className="profile-label mt-3">Device {history?.actionPerformed === 'unassigned' ? 'was' : 'is'} assigned to: </label> <br/>
                    <Link to={{ pathname: "/patientProfile", state: {patientid: history?.assigned_patient_id?._id }}} className='link' style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                      {history?.assigned_patient_id?.firstname} {history?.assigned_patient_id?.lastname}
                    </Link>
                  <hr />

                  <label>Model No : </label>
                    &nbsp;{history?.modelNumber || 'N/A'}
                  <br />

                  <label>IMEI : </label>
                    &nbsp; {history?.imei || 'N/A'}
                  <br />

                  <label className="profile-label mt-3">Action Performed Date : </label>
                  <p>{moment(history?.createdAt).tz("America/New_York").format("MM-DD-YYYY")}</p>

                </div>
              </div>
            </div> 
            ))}
            </div>
            </>}

            </div>
        </div>
        </section>
    </>
  )
}

export default DevicesHistory