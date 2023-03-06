import React from 'react'
import { CSVLink } from 'react-csv';
const moment = require('moment-timezone');

export const ExportReactCSV = ({csvData, fileName}) => {

    let result = csvData.map((patient, index) => {
        return {
            'Sr No':index + 1,
            'initial Month':patient?.initialsetup,
            'First Name':patient?.firstname,
            'Last Name': patient.lastname,
            'DOB': moment(patient?.DOB).tz("America/New_York").format("MM/DD/YYYY"),
            'Gender': patient?.gender,
            'Email': patient?.email,
            'Phone 1':patient?.phone1,
            'Diseases': patient?.diseases,
            ' ':' ',
            'Dr Fname': patient?.assigned_doctor_id?.firstname,
            'Dr LName': patient?.assigned_doctor_id?.lastname,
            ' ':' ',
            'HR FName':patient?.assigned_hr_id?.firstname,
            'HR FName':patient?.assigned_hr_id?.lastname,
            ' ':' ',
            'DeviceId (01)': patient?.assigned_devices[0]?.deviceObjectId?._id,
            'DeviceType (01)': patient?.assigned_devices[0]?.deviceObjectId?.deviceType,
            'DeviceId (02)': patient?.assigned_devices[1]?.deviceObjectId?._id,
            'DeviceType (02)': patient?.assigned_devices[1]?.deviceObjectId?.deviceType,
        }
    })


    return (
        <button className="excelreportbutton">
           <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span style={{color: '#FFF'}}>Download</span></CSVLink> 
        </button>
    )
}

export default ExportReactCSV;