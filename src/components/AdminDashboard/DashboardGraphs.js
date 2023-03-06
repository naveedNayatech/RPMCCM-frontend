import React, { useState, useEffect, Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import {getPatientTelemetryData, getPatients } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import {Spinner} from 'react-bootstrap';
const moment = require('moment-timezone');

const DashboardGraphs = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const [patientId, setPatientId] = useState('620e683097b688395e4ff22e');
  const {loading, error,  deviceData } = useSelector(state => state.deviceData);
  const { patients } = useSelector(state => state.admin);
  const [recordsPerpage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [graphType, setGraphType] = useState('bar');

  useEffect(() => {
    if(error){
        return alert.error(error);
    }

    dispatch(getPatients());

    if(patientId){
      if(patientId === 'default'){
        return
      }
      dispatch(getPatientTelemetryData(patientId, recordsPerpage, currentPage))
    }

  }, [dispatch, error, patientId, recordsPerpage]);

        let data = deviceData && deviceData.filter(healthData => healthData?.deviceId?.deviceType === "bp").map((deviceData) => {
              return {
                  'date': moment(deviceData?.createdAt).tz("America/New_York").format("MM/DD/YYYY"),
                  'sys': deviceData?.telemetaryData?.sys,
                  'dia': deviceData?.telemetaryData?.dia,
                  'pul':deviceData?.telemetaryData?.pul
              }
         });


    return (
        <Fragment>
            <section className="alerts-section rounded-card graph-card">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h5 className="title">B.P </h5>
              <select 
              className="form-control" 
              style={{width: '180px'}}
              name="patientlist"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              >
              <option value="default">Select Patient</option>
              {patients && patients.map((patient, index) => (
                  <option value={patient?._id} key={index} > {patient?.firstname} {patient?.lastname} </option>
              ))}  
              </select>

              <select 
              className="form-control"
              style={{width: '180px'}}
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
                style={{width: '180px'}}
                onChange={e => setGraphType(e.target.value)}
                >
                <option value="bar"> Bar Graph</option>
                <option value="line">Line Graphs</option>
                
              </select>
            </div> 
            <br />

            {graphType === 'bar' ? <>
              <ResponsiveContainer width="100%" aspect={4/1}>
                  {loading === true ? <Spinner animation="border" style={{marginLeft: '45%'}}/> : 
                  <BarChart data={data}
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
        </Fragment>
    )
}

export default DashboardGraphs
