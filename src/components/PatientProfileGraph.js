import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import moment from 'moment';


const PatientProfileGraph = ({healthData }) => {

    const [graphType, setGraphType] = useState('bar');

    let data = healthData && healthData.filter(healthData => healthData?.deviceId?.deviceType === "bp").map(deviceData => {
     
        return {
            'date': moment(deviceData?.createdAt).tz("America/New_York").format("MM/DD/YYYY"),
            'sys': deviceData?.telemetaryData?.sys,
            'dia': deviceData?.telemetaryData?.dia,
            'pul':deviceData?.telemetaryData?.pul
        } 
      });

  return (
      <>
    <section className="alerts-section rounded-card graph-card">

       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h5 className="title">Patient B.P Analysis </h5>
            
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
        <br/>

        {graphType === 'bar' ? <>
       <ResponsiveContainer width="100%" aspect={4/1} style={{overflowY: 'hidden !important' }}>
        <BarChart data={data}
                  >
                  <XAxis dataKey="date" />
                  <YAxis dataKey="sys"/>
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend/> 
                  <Bar dataKey="sys" fill="#02C39A" />
                      <Bar dataKey="dia" fill="#23408e" />
                      <Bar dataKey="pul" fill="#F95800" />
              </BarChart>
      </ResponsiveContainer>
      </> : <>
      <ResponsiveContainer width="100%" aspect={4/1}>
              <LineChart data={data}>
              <XAxis dataKey="dia" stroke="#007673"/>
              <YAxis/>
              <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="sys" stroke="#02C39A"/>
              <Line type="monotone" dataKey="dia" stroke="#DC143C"/>
              <Tooltip />
              <Legend />
              </LineChart>
            </ResponsiveContainer>
      </>
    }
    </section>
    </>
  )
}

export default PatientProfileGraph