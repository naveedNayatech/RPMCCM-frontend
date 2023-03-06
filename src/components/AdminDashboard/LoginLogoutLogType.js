import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';

const LoginLogoutLogType = ({reportBy, logType, logs}) => {

  return (
    <div>
        <Table striped hover bordered>
                <thead align="center">
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Text</th>
                        <th>{reportBy === 'doctor' ? "License Number" : "Email Address"}</th>
                        <th>Date & Time</th>
                    </tr> 
                </thead>
                <tbody>
                {logs && logs.map((log, index) => (
                <tr key={index}>
                    {reportBy === 'doctor' && logType === 'logs' ? <>
                        <td>Dr. {log?.doctor_id?.firstname} {log?.doctor_id?.lastname}
                            <p style={{color: 'gray'}}>{log?.doctor_id?.gender}</p>
                        </td>
                        <td>{log?.doctor_id?.role}</td>
                        <td>{log?.text}</td>
                        <td>{log?.doctor_id?.licensenumber}</td>
                        <td>{moment(log?.createdAt).tz('America/New_York').format("MM/DD/YYYY")} (EST)</td>
                    </> : <>
                        <td>HR. {log?.hr_id?.firstname} {log?.hr_id?.lastname}
                            <p style={{color: 'gray'}}>{log?.hr_id?.gender}</p>
                        </td>
                        <td>{log?.hr_id?.role}</td>
                        <td>{log?.text}</td>
                        <td>{log?.hr_id?.email}</td>
                        <td>{moment(log?.createdAt).tz('America/New_York').format("MM/DD/YYYY")} (EST)</td>
                    </>}
                </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default LoginLogoutLogType