import React, {useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { getPatientTelemetryData} from '../../actions/adminActions';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import { getDoctorPatients } from '../../actions/adminActions';
import {Spinner} from 'react-bootstrap';

const moment = require('moment-timezone');

const StaffPieGraph = () => {
  
  const { user } = useSelector(state => state.auth);
  const { doctorpatients } = useSelector(state => state.docPatients);
  const {loading, error,  deviceData } = useSelector(state => state.deviceData);

  const [recordsPerpage, setRecordsPerPage] = useState(5);
  const [graphType, setGraphType] = useState('bar');
  const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const [patientId, setPatientId] = useState('');

    let id = user._id;

    const alert = useAlert();


    useEffect(() => {
      if(error){
          return alert.error(error);
      }
  
      dispatch(getDoctorPatients(id));
  
      if(patientId){
        if(patientId === 'default'){
          return
        }
        dispatch(getPatientTelemetryData(patientId, recordsPerpage, currentPage))
      }
  
    }, [dispatch, error, patientId, recordsPerpage, recordsPerpage, currentPage]);

    let data = deviceData && deviceData.filter(healthData => healthData?.deviceId?.deviceType === "bp").map((deviceData) => {
      return {
          'date': moment(deviceData?.createdAt).tz("America/New_York").format("ll"),
          'sys': deviceData?.telemetaryData?.sys,
          'dia': deviceData?.telemetaryData?.dia,
          'pul':deviceData?.telemetaryData?.pul
      }
    });

    return (
      <section className="alerts-section rounded-card graph-card">
        <h5 className="title">Patient B.P Analysis</h5>
       <br/>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <select 
                className="form-control" 
                style={{width: '220px'}}
                name="patientlist"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              >
              <option value="default">Select Patient</option>
              {doctorpatients && doctorpatients.map((patient, index) => (
                  <option value={patient?._id} key={index} > {patient?.firstname} {patient?.lastname} </option>
              ))}  
              </select>

              <select 
              className="form-control"
              style={{width: '220px'}}
              onChange={e => setRecordsPerPage(e.target.value)}
              >
              <option value="default">Select Readings </option>
                <option value="5">Last 5 Readings</option>
                <option value="10">Last 10 Readings</option>
                <option value="25">Last 25 Readings</option>
                <option value="50">Last 50 Readings</option>
                <option value="100">Last 100 Readings</option>
              </select>

              <select 
                className="form-control"
                style={{width: '220px'}}
                onChange={e => setGraphType(e.target.value)}
                >
              <option value="default">Graph Type </option>
                <option value="line">Line Graphs</option>
                <option value="bar"> Bar Graph</option>
              </select>
        </div> 
        <br />
      
        {graphType === 'bar' ? <>
      <ResponsiveContainer width="100%" aspect={4/1} style={{overflowY: 'hidden !important' }}>
        {loading === true ? <Spinner animation="border" style={{marginLeft: '45%'}}/> : <BarChart data={data}
                  >
                  <XAxis dataKey="date" />
                  <YAxis dataKey="sys"/>
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend/> 
                      <Bar dataKey="sys" fill="#8FBB2C" />
                      <Bar dataKey="dia" fill="#23408e" />
                      <Bar dataKey="pul" fill="#007673" />
              </BarChart>
        }
      </ResponsiveContainer>
      </> : <>
      <ResponsiveContainer width="100%" aspect={4/1}>
              <LineChart data={data}>
              <XAxis dataKey="dia" stroke="#007673"/>
              <YAxis/>
              <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="sys" stroke="#8FBB2C"/>
              <Line type="monotone" dataKey="dia" stroke="#23408e"/>
              <Tooltip />
              <Legend />
              </LineChart>
            </ResponsiveContainer>
      </>
      }
       </section>
    );
}

export default StaffPieGraph;