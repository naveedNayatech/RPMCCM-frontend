import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminReducers } from './reducers/adminReducers';
import { authReducers } from './reducers/authReducers';
import { doctorProfileReducers } from './reducers/adminReducers'; 
import { patientProfileReducers } from './reducers/adminReducers';
import { doctorReducers } from './reducers/adminReducers';
import { deviceDataReducers } from './reducers/adminReducers';
import { devicesReducers } from './reducers/adminReducers';
import { deviceDetailsReducers } from './reducers/adminReducers';
import { newDeviceReducers } from './reducers/adminReducers';
import { doctorpatientsReducers } from './reducers/adminReducers';
import { hrsReducers } from './reducers/adminReducers';
import { adminStatsReducers } from './reducers/adminReducers';
import { hrpatientsReducers } from './reducers/HRReducers'; 
import { commentReducers } from './reducers/HRReducers';
import { hrtimeSpentReducers } from './reducers/HRReducers';
import { hrTimeReportReducers } from './reducers/HRReducers';
import { carePlanReducers } from './reducers/HRReducers';
import {initialMonthReportReducers} from './reducers/HRReducers';
import { timeSpentCurrentMonthReducer } from './reducers/HRReducers';
import {adminNotificationsReducers} from './reducers/adminReducers';
import { inventoryStatsReducers } from './reducers/adminReducers';
import { hrNotificationsReducers } from './reducers/HRReducers';
import { remainingReadingsReducer } from './reducers/adminReducers';
import { logsReducers } from './reducers/adminReducers';
import { hrProfilesReducer } from './reducers/adminReducers';
import { careplanListReducers } from './reducers/HRReducers'; //Get list of careplans for doctor and hrs 
import {doctorTelemetaryReportReducer} from './reducers/adminReducers';
import { timeSummaryReportReducer } from './reducers/adminReducers';
import {searchLogReducer} from './reducers/adminReducers';
import {adminsListReducers} from './reducers/adminReducers';
import {timeSpentCurrentMonthinCCMReducer} from './reducers/HRReducers';
import {hrStatsReducers} from './reducers/HRReducers';
import { deviceSignalHistoryReducers } from './reducers/adminReducers';
import {financialReportHistoryReducers} from './reducers/adminReducers';
import { patientCCMConsentReducers } from './reducers/HRReducers';
import { patientCCMCareplanReducers } from './reducers/HRReducers';
import {inactivePatientsReducers} from './reducers/adminReducers'
import { devicesHistoryReducers } from './reducers/adminReducers';
import { chatReducers } from './reducers/HRReducers';
import { criticalRPMReducers } from './reducers/adminReducers';
import { doctorStatsReducers } from './reducers/adminReducers';
// COMMON REDUCERS
import { commonReducers } from './reducers/Common';

const reducer = combineReducers({
    admin: adminReducers,
    auth: authReducers,
    doctorProfile: doctorProfileReducers,
    patientProfile: patientProfileReducers,
    doctor: doctorReducers,
    deviceData: deviceDataReducers,
    devices: devicesReducers,
    deviceDetails: deviceDetailsReducers,
    device : newDeviceReducers,
    docPatients: doctorpatientsReducers,
    hrslist: hrsReducers,
    hrPatients:hrpatientsReducers,
    comments: commentReducers,
    timeSpent: hrtimeSpentReducers,
    target : hrTimeReportReducers,
    adminStat: adminStatsReducers,
    careplan: carePlanReducers,
    initialMonthReport:initialMonthReportReducers,
    adminNoti: adminNotificationsReducers,
    totalTimeSpent: timeSpentCurrentMonthReducer,
    totalTimeSpentInCCM:timeSpentCurrentMonthinCCMReducer,
    inventoryStats: inventoryStatsReducers,
    hrNoti: hrNotificationsReducers,
    readingsCount: remainingReadingsReducer,
    log: logsReducers,
    common: commonReducers,
    hrprofile: hrProfilesReducer,
    careplans: careplanListReducers,
    telemetaryReport: doctorTelemetaryReportReducer,
    summaryReport: timeSummaryReportReducer,
    searchLogResult: searchLogReducer,
    adminsList: adminsListReducers,
    hrStats: hrStatsReducers,
    deviceSignalHistory: deviceSignalHistoryReducers,
    financialReportHistory:financialReportHistoryReducers,
    patientCCMConsent: patientCCMConsentReducers,
    patientCCMCareplan : patientCCMCareplanReducers,
    inactivePatients: inactivePatientsReducers,
    deviceHistory: devicesHistoryReducers,
    chatHistory: chatReducers,
    criticalPatients: criticalRPMReducers,
    doctorStats: doctorStatsReducers
})

let initialState = {}

const middleware = [thunk];


// const store = createStore(reducer, initialState, disableReactDevTools(applyMiddleware(...middleware)))


let mode = "production"
const devTools =
  mode === "production"
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducer, initialState, devTools);

export default store;