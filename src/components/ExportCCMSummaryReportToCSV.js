import React from 'react'
import { CSVLink } from 'react-csv';


const ExportCCMSummaryReportToCSV = ({csvData, fileName, filterPatient}) => {
    
    let CptCode = '';
    let CptCharges = '';
    let totalCharges = '';
  
    function calcCPT(minutes) {
      switch(true){
        case (minutes >= 20 && minutes < 40):
          CptCode = '99490'
          CptCharges = '$49.73'
          totalCharges = '$49.73'
          break; 
        case (minutes >= 40 && minutes < 60):
            CptCode = '99490, 99439'
            CptCharges = '$49.73, 37.49'
            totalCharges = '$87.22'
            break;
        case (minutes >= 60 && minutes < 90):
            CptCode = "99487"
            CptCharges = '$73.70'
            totalCharges = '$73.70'
            break;
        case (minutes >= 90):
              CptCode = '99487, 99489'
              CptCharges = '$73.70, $35.70'
              totalCharges = '109.40'
              break; 
        default: 
            CptCode = ''
            CptCharges=''
            totalCharges = ''
        break;
        }
      }

      
    let result = csvData.filter(item => filterPatient === true ? item.totalMinutes > 0 : item).map((report, index) => {

    calcCPT(report?.totalMinutes);
        
    return {
            'Sr No':index + 1,
            'Month': report?.Month,
            'Patient Name':report?.patientName,
            'Total Minutes': report?.totalMinutes,
            'CPT Code': CptCode,
            'Payment': CptCharges, 
            'Total Payment':totalCharges,
            'Category': 'CCM' 
        }
    })


    return (
    <button className="accordion">
        <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span>Download .csv</span></CSVLink> 
    </button>
  )
}

export default ExportCCMSummaryReportToCSV