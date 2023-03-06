import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/route/ProtectedRoute';
import StaffProtectedRoute from './components/route/StaffProtectedRoute';
import HRProtectedRoute from './components/route/HRProtectedRoute';
// Admin Dashboard Components
import AdminDashboard from './components/AdminDashboard/Dashboard';
import Admins from './Screens/Admin/Admins';
import Profile from './Screens/Admin/Profile';
import LandingPage from './Screens/LandingPage';
import Login from './Screens/Login';
import PatientsList from './Screens/Admin/PatientsList'; 
import DoctorsList from './Screens/Admin/DoctorsList'; 
import DoctorProfile from './Screens/Admin/DoctorProfile';
import AddNewDoctor from './Screens/Admin/AddNewDoctor';
import PatientProfile from './Screens/Admin/PatientProfile';
import EditDoctor from './Screens/Admin/EditDoctor';
import AssignDoctorToPatient from './Screens/Admin/AssignDoctorToPatient';
import RPMDevices from './Screens/Admin/RPMDevices';
import DevicesDetails from './Screens/Admin/DevicesDetails';
import AddRPMDevice from './Screens/Admin/AddRPMDevice';
import UpdateRPMDevice from './Screens/Admin/UpdateRPMDevice';
import PrintReceipt from './Screens/Admin/PrintReceipt';
import AddPatient from './Screens/Admin/AddPatient';
import HRList from './Screens/Admin/HRList';
import HRAdd from './Screens/Admin/HRAdd';
import UpdateHR from './Screens/Admin/UpdateHR';
import HRProfile from './Screens/Admin/HRProfile';
import AssignDrToHr from './Screens/Admin/AssignDrToHr';
import AssignPatientToHr from './Screens/Admin/AssignPatientToHR';
import AdminTimeReport from './Screens/Admin/AdminTimeReport';
import EditPatient from './Screens/Admin/EditPatient';
import InitialMonthReport from './Screens/Admin/InitialMonthReport';
import CompleteInventoryList from './Screens/Admin/CompleteInventoryList';
import AdminResetPassword from './Screens/Admin/AdminResetPassword';
import TelemetaryReport from './Screens/Admin/TelemetaryReport';
import TimeSummaryReport from './Screens/Admin/TimeSummaryReport';
import ManageLogs from './Screens/Admin/ManageLogs';
import EditTelemetaryData from './Screens/Admin/EditTelemetaryData';
import FinancialReportHistory from './Screens/Admin/FinancialReportHistory';
import InactivePatients from './Screens/Admin/InactivePatients';
import CCMPatients from './Screens/Admin/CCMPatients';
import TimeReportCCM from './Screens/Admin/TimeReportCCM';
import FinancialReportHistoryCCM from './Screens/Admin/FinancialReportHistoryCCM';
import DevicesHistory from './Screens/Admin/DevicesHistory';
import CCMPatientProfileAdmin from './Screens/Admin/CCMPatientProfileAdmin';
// Staff Screens
import StaffDashboard from './Screens/Staff/StaffDashboard';
import StaffProfile from './Screens/Staff/StaffProfile';
import StaffPatient from './Screens/Staff/StaffPatients';
import StaffPatientProfile from './Screens/Staff/StaffPatientProfile';
import DoctorAddPatient from './Screens/Staff/DoctorAddPatient';
import DocCareplanList from './Screens/Staff/DocCareplanList';
import DoctorTimeSummaryReport from './Screens/Staff/DoctorTimeSummaryReport';
import FinancialReportCCM from './Screens/Admin/FinancialReportCCM';
import StaffCCMPatients from './Screens/Staff/StaffCCMPatients';
import DoctorPatientProfileCCM from './Screens/Staff/DoctorPatientProfileCCM';
// HR Screens
import HRDashboard from './Screens/HR/HRDashboard'; 
import HRPatientsList from './Screens/HR/HRPatientsList';
import HRPatientProfile from './Screens/HR/HRPatientProfile';
import HR from './Screens/HR/HR';
import TimeReport from './Screens/HR/TimeReport';
import HRAddPatient from './Screens/HR/HRAddPatient';
import CareplanDetails from './Screens/HR/CareplanDetails';
import CareplanList from './Screens/HR/CareplanList';
import HRSummaryReport from './Screens/HR/HRSummaryReport'
import NurseCCMPatients from './Screens/HR/NurseCCMPatients';
import CCMPatientProfile from './Screens/HR/CCMPatientProfile';
import MinutesHistory from './Screens/HR/MinutesHistory';
import Chat from './Screens/HR/Chat';
import HRFinancialReportCCM from './Screens/HR/HRFinancialReportCCM';
// General links
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';

function App() {
  return (
    <Router>
        <Route exact path='/' component={LandingPage} />  
        <Route exact path='/login' component={Login} />
        <Route exact path='/auth/forgot' component={ForgotPassword} />
        <Route exact path="/auth/resetPassword/:token" component={ResetPassword} />
        
        <ProtectedRoute exact path='/patients' isAdmin={true} component={PatientsList} />
        <ProtectedRoute exact path='/doctors' isAdmin={true} component={DoctorsList} />
        <ProtectedRoute exact path='/adminDashboard' isAdmin={true} component={AdminDashboard} />
        <ProtectedRoute exact path='/admins' isAdmin={true} component={Admins} />
        <ProtectedRoute exact path='/doctorProfile' isAdmin={true} component={DoctorProfile} />
        <ProtectedRoute exact path='/me' isAdmin={true} component={Profile} />
        <ProtectedRoute exact path='/adddoctor' isAdmin={true} component={AddNewDoctor} />
        <ProtectedRoute exact path='/patientprofile' isAdmin={true} component={PatientProfile} />
        <ProtectedRoute exact path='/patientprofile/ccm' isAdmin={true} component={CCMPatientProfileAdmin} />
        <ProtectedRoute exact path="/Doctor/Edit" isAdmin={true} component={EditDoctor} />
        <ProtectedRoute exact path='/assigndoctor' isAdmin={true} component={AssignDoctorToPatient} />
        <ProtectedRoute exact path='/devices' isAdmin={true} component={RPMDevices} />
        <ProtectedRoute exact path='/devicedetails' isAdmin={true} component={DevicesDetails} />
        <ProtectedRoute exact path='/device' isAdmin={true} component={AddRPMDevice} />
        <ProtectedRoute exact path='/printReceipt' isAdmin={true} component={PrintReceipt} />
        <ProtectedRoute exact path='/updatedevice' isAdmin={true} component={UpdateRPMDevice} />
        <ProtectedRoute exact path='/addpatient' isAdmin={true} component={AddPatient} />
        <ProtectedRoute exact path='/hrlist' isAdmin={true} component={HRList} /> 
        <ProtectedRoute exact path='/addhr' isAdmin={true} component={HRAdd} />
        <ProtectedRoute exact path='/updateHR' isAdmin={true} component={UpdateHR} />
        <ProtectedRoute exact path='/hrProfile' isAdmin={true} component={HRProfile} />
        <ProtectedRoute exact path='/assignDrToHr' isAdmin={true} component={AssignDrToHr} />
        <ProtectedRoute exact path='/assignPatientToHr' isAdmin={true} component={AssignPatientToHr} />
        <ProtectedRoute exact path="/Admin/Report/RPM" isAdmin={true} component={AdminTimeReport} />
        <ProtectedRoute exact path='/Patients/Edit' isAdmin={true} component={EditPatient} />
        <ProtectedRoute exact path="/Admin/Report/InitialMonth" isAdmin={true} component={InitialMonthReport} />
        <ProtectedRoute exact path='/Admin/Inventory/Download' isAdmin={true} component={CompleteInventoryList} />
        <ProtectedRoute exact path="/Credentials" isAdmin={true} component={AdminResetPassword} />
        <ProtectedRoute exact path='/report/telemetary' isAdmin={true} component={TelemetaryReport} />
        <ProtectedRoute exact path='/report/financialReport' isAdmin={true} component={TimeSummaryReport} />
        <ProtectedRoute exact path='/logs' isAdmin={true} component={ManageLogs} />
        <ProtectedRoute exact path='/edit/telemetarydata' isAdmin={true} component={EditTelemetaryData} />
        <ProtectedRoute exact path='/financialReport/history' isAdmin={true} component={FinancialReportHistory} />
        <ProtectedRoute exact path='/financialReport/CCM' isAdmin={true} component={FinancialReportCCM} />
        <ProtectedRoute exact path='/Patients/Inactive' isAdmin={true} component={InactivePatients} /> 
        <ProtectedRoute exact path='/Patients/CCM' isAdmin={true} component={CCMPatients} /> 
        <ProtectedRoute exact path="/Admin/Report/CCM" isAdmin={true} component={TimeReportCCM} /> 
        <ProtectedRoute exact path="/financialReport/history/CCM" isAdmin={true} component={FinancialReportHistoryCCM} /> 
        <ProtectedRoute exact path="/Devices/History" isAdmin={true} component={DevicesHistory} /> 
         {/* Staff Routes */}
        <StaffProtectedRoute exact path="/doctor/dashboard" isStaff={true} component={StaffDashboard} />
        <StaffProtectedRoute exact path="/staffProfile" isStaff={true} component={StaffProfile} />
        <StaffProtectedRoute exact path="/doctor/patients" isStaff={true} component={StaffPatient} />
        <StaffProtectedRoute exact path="/doctor/patient/profile" isStaff={true} component={StaffPatientProfile} />
        <StaffProtectedRoute exact path="/doctor/Addpatient" isStaff={true} component={DoctorAddPatient} />
        <StaffProtectedRoute exact path="/doctor/careplan" isStaff={true} component={DocCareplanList} />
        <StaffProtectedRoute exact path="/doctor/report/financialReport" isStaff={true} component={DoctorTimeSummaryReport} />
        <StaffProtectedRoute exact path="/CCM/doctor/patients" isStaff={true} component={StaffCCMPatients} />
        <StaffProtectedRoute exact path="/doctor/patientprofile/ccm" isStaff={true} component={DoctorPatientProfileCCM} />
        {/* HR Routes */}
        <HRProtectedRoute exact path="/Nurse/Dashboard" isHR={true} component={HRDashboard} />
        <HRProtectedRoute exact path="/Nurse/Patients" isHR={true} component={HRPatientsList} />
        <HRProtectedRoute exact path="/Nurse/Patient/Profile" isHR={true} component={HRPatientProfile} />
        <HRProtectedRoute exact path="/hr" isHR={true} component={HR} />
        <HRProtectedRoute exact path="/Nurse/Report/TimeReport" isHR={true} component={TimeReport} />
        <HRProtectedRoute exact path="/Nurse/Add_New_Patient" component={HRAddPatient} />
        <HRProtectedRoute exact path="/Nurse/Careplan" isHR={true} component={CareplanDetails} />
        <HRProtectedRoute exact path="/Nurse/careplans" isHR={true} component={CareplanList} />
        <HRProtectedRoute exact path="/Nurse/Report/Financial_Report" isHR={true} component={HRSummaryReport} />
        <HRProtectedRoute exact path="/CCM/Nurse/Patients" isHR={true} component={NurseCCMPatients} />
        <HRProtectedRoute exact path="/Nurse/Patient/CCM/Profile" isHR={true} component={CCMPatientProfile} />
        <HRProtectedRoute exact path="/Nurse/Minutes/History" isHR={true} component={MinutesHistory} />
        <HRProtectedRoute exact path="/Nurse/Chat" isHR={true} component={Chat} />
        <HRProtectedRoute exact path="/Nurse/Report/Financial_Report/CCM" isHR={true} component={HRFinancialReportCCM} />
    </Router>
  )      
};

export default App;
