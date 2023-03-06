import React from 'react';
import { CSVLink } from 'react-csv'


const ExportSummaryReportToCSV = ({csvData, fileName}) => {
  let CptCode = '';
  let CptCharges = '';
  let totalCharges = '';

  function calcCPT(readings, minutes) {
    switch(true){
      case (readings < 16 && minutes < 20):
        CptCode = ''
        CptCharges = ''
        totalCharges = ''
        break; 
      case (readings >= 16 && minutes < 20):
          CptCode = '99454'
          CptCharges = '$50.83'
          totalCharges = '$50.83'
          break;
      case (readings < 16 && minutes >=20 && minutes < 40):
          CptCode = "99457"
          CptCharges = '$42.26'
          totalCharges = '$42.26'
          break;
      case (readings >= 16 && minutes >= 20 && minutes < 40):
            CptCode = '99454, 99457'
            CptCharges = '$50.83, $42.26'
            totalCharges = '$93.09'
            break; 
      case (readings < 16 && minutes >=40):
          CptCode = "99457, 99458"
          CptCharges = '$42.26, $31.94'
          totalCharges = '$74.20'
      break;
      case (readings >= 16 && minutes >=40):
          CptCode = '99454, 99457, 99458'
          CptCharges = '$50.83, $42.26, $31.94'
          totalCharges = '$125.03'
      break; 
      default: 
      break;
      }
    }


    let result = csvData.map((report, index) => {

      calcCPT(report?.totalReadings, report?.totalMinutes);

        return {
            'Sr No':index + 1,
            'Month': report?.Month,
            'Patient Name':report?.patientName,
            'Total Readings':report?.totalReadings,
            'Total Minutes': report?.totalMinutes,
            'CPT Code': CptCode,
            'Payment': CptCharges, 
            'Total Payment':totalCharges,
            'Category': report?.category == true ? 'CCM' : 'RPM' 
          }
    })


  return (
    <button className="accordion">
        <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span>Download</span></CSVLink> 
    </button>
  )
}

export default ExportSummaryReportToCSV