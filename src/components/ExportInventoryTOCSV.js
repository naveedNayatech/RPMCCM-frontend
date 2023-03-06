import React, {Fragment} from 'react';
import { CSVLink } from 'react-csv';
const moment = require('moment-timezone');

const ExportInventoryTOCSV = ({csvData, fileName}) => {

    let result = csvData.map((device, index) => {
        return {
            'Sr No':index + 1,
            'Device ID':device?._id,
            'IMEI': device.imei,
            'Type': device?.deviceType,
            'Broken':device?.broken === true ? 'Broken' : 'Unbroken',
            'Firmware Version': device?.firmwareVersion,
            'Hardware Version': device?.hardwareVersion,
            'Assigned To':device?.assigned_patient_id ? device?.assigned_patient_id?.lastname : '',
            'Assigned Date':device?.assignedTime || 'N/A',
            'Device Added Date':moment(device?.createdAt).tz("America/New_York").format("MM/DD/YYYY"),
        }
    })


  return (
    <Fragment>
        <button className="excelreportbutton">
           <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span style={{color: '#FFF'}}>Download</span></CSVLink> 
        </button>
    </Fragment>
  )
}

export default ExportInventoryTOCSV