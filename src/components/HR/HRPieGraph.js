import React, {useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPatientTelemetryData} from '../../actions/adminActions';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
import {Spinner} from 'react-bootstrap';
import { LineChart, Line } from 'recharts';
const moment = require('moment-timezone');

const HRPieGraph = () => {
  
  const { hr } = useSelector(state => state.hrAuth);
  const { hrpatients} = useSelector(state => state.hrPatients);
  const {loading, error,  deviceData } = useSelector(state => state.deviceData);
  


    const dispatch = useDispatch();
    const [patientId, setPatientId] = useState('');
    const [graphType, setGraphType] = useState('bar');
    const [recordsPerpage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    let id = hr._id;

    const alert = useAlert();


    useEffect(() => {
      if(error){
          return alert.error(error);
      }
  
      dispatch(getHRPatients(id));
  
      if(patientId){
        if(patientId === 'default'){
          return
        }
        dispatch(getPatientTelemetryData(patientId, recordsPerpage, currentPage))
      }
  
    }, [dispatch, error, patientId, recordsPerpage]);

    let data = deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp').map((deviceData) => {
      return {
          'date': moment(deviceData?.createdAt).tz("America/New_York").format("ll"),
          'sys': deviceData?.telemetaryData?.sys,
          'dia': deviceData?.telemetaryData?.dia,
          'pul':deviceData?.telemetaryData?.pul
      }
    });

    return (
      <section className="alerts-section rounded-card graph-card" style={{width: '100%'}}>
      <h5 className="title">Patient B.P Analytics </h5>
      <div className='row-display'>
            
            <select 
              className="form-control" 
              style={{width: '220px'}} 
              name="patientlist"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              >
              <option value="default">Select Patient</option>
              {hrpatients && hrpatients.map((patient, index) => (
                  <option value={patient?._id} key={index} > {patient?.firstname} {patient?.lastname} </option>
              ))}  
              </select>

              {/* Number of readings */}
              <select 
              className="form-control"
              style={{width: '220px'}}
              onChange={e => setRecordsPerPage(e.target.value)}
              >
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
                <option value="bar"> Bar Graph</option>
                <option value="line">Line Graphs</option>
              </select>
        </div> 
        <br />
      
        {graphType === 'bar' ? <>
      <ResponsiveContainer width="100%" aspect={4/1}>
        {loading === true ? <Spinner animation="border" style={{marginLeft: '45%'}}/> : <BarChart data={data}
                  margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                  <XAxis dataKey="date" />
                  <YAxis dataKey="sys"/>
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend/> 
                  <Bar dataKey="sys" fill="#02C39A" />
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
              <Line type="monotone" dataKey="sys" stroke="#02C39A"/>
              <Line type="monotone" dataKey="dia" stroke="#23408e"/>
              <Tooltip />
              <Legend />
              </LineChart>
            </ResponsiveContainer>
             </>}    
      </section>
    );
}

export default HRPieGraph;