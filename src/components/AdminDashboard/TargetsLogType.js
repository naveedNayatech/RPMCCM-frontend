import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';

const TargetsLogType = ({reportBy, logType, logs}) => {
  return (
    <div>
         <Table striped hover bordered>
                <thead align="center">
                    <tr>
                        <th>Patient Name</th>
                        <th>Time added by</th>
                        <th>Role</th>
                        <th>Log Detail</th>
                        <th>Date & Time</th>
                    </tr> 
                </thead>
                <tbody>
                {logs && logs.map((log, index) => (
                <tr key={index}>
                    {reportBy === 'nurse' && logType === 'targets' ? <>
                        <td>{log?.patient_id?.firstname} {log?.patient_id?.lastname}
                            <p style={{color: 'gray'}}>{log?.patient_id?.gender}</p>
                        </td>
                        <td>Hr. {log?.hr_id?.firstname} {log?.hr_id?.lastname}</td>
                        <td>{log?.hr_id?.role}</td>
                        <td>{log?.text}</td>
                        <td>{moment(log?.createdAt).tz('America/New_York').format("MM/DD/YYYY")} (EST)</td>
                    </> : <></>}
                </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default TargetsLogType