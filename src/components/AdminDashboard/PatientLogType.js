import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';

const PatientLogType = ({ reportBy, logType, logs} ) => {
  return (
    <div>
        <Table striped hover bordered>
            <thead align="center">
                <tr>
                    <th>Patient Details</th>
                    <th>Email Address</th>
                    <th>Log Detail</th>
                    <th>Log Type</th>
                    <th>Date & Time</th>
                </tr> 
            </thead>
            <tbody>
            {logs && logs.map((log, index) => (
            <tr key={index}>
                    <td>{log?.patient_id?.firstname} {log?.patient_id?.lastname}
                        <p style={{color: 'gray'}}>{log?.patient_id?.gender}</p>
                    </td>
                    <td style={{wordWrap: 'break-word'}}>{log?.patient_id?.email}</td>
                    <td>{log?.text}</td>
                    <td>Patient Profile</td>
                    <td>{moment(log?.createdAt).tz('America/New_York').format("MM/DD/YYYY")} (EST)</td>
            </tr>
            ))}
            </tbody>
        </Table>
    </div>
  )
}

export default PatientLogType