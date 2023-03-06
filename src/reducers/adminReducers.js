import { 
    ALL_PATIENTS_REQUEST, 
    ALL_PATIENTS_SUCCESS, 
    ALL_PATIENTS_FAIL, 
    ALL_DOCTORS_REQUEST,
    ALL_DOCTORS_SUCCESS,
    ALL_DOCTORS_FAIL,
    DOCTOR_PROFILE_REQUEST,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAIL,
    DOCTOR_PATIENTS_REQUEST,
    DOCTOR_PATIENTS_SUCCESS,
    HR_PROFILE_SUCCESS,
    HR_PROFILE_FAIL,
    PATIENT_PROFILE_REQUEST,
    PATIENT_PROFILE_SUCCESS,
    PATIENT_PROFILE_FAIL,
    RESET_ASSIGN_PATIENT_TO_HR,
    ASSIGN_DEVICE_TO_PATIENT_REQUEST,
    ASSIGN_DEVICE_TO_PATIENT_SUCCESS,
    ASSIGN_DEVICE_TO_PATIENT_FAIL,
    GET_PATIENT_DEVICE_DATA_REQUEST,
    GET_PATIENT_DEVICE_DATA_SUCCESS,
    GET_PATIENT_DEVICE_DATA_FAIL,
    GET_DEVICES_LIST_REQUEST,
    GET_DEVICES_LIST_SUCCESS,
    GET_DEVICES_LIST_FAIL,
    GET_DEVICE_DETAILS_REQUEST,
    GET_DEVICE_DETAILS_SUCCESS,
    GET_DEVICE_DETAILS_FAIL,
    ADD_RPM_DEVICE_RESET,
    SORT_DEVICES_BY_BROKEN_REQUEST,
    SORT_DEVICES_BY_BROKEN_SUCCESS,
    SORT_DEVICES_BY_BROKEN_FAIL,
    SORT_DEVICES_REQUEST,
    SORT_DEVICES_SUCCESS,
    SORT_DEVICES_FAIL,
    ALL_HRS_REQUEST,
    ALL_HRS_SUCCESS,
    ALL_HRS_FAIL,
    ASSIGN_DOCTOR_TO_HR_REQUEST,
    ASSIGN_DOCTOR_TO_HR_SUCCESS,
    ASSIGN_DOCTOR_TO_HR_FAIL,
    ADMIN_STATS_SUCCESS,
    ADMIN_STATS_FAIL,
    INVENTORY_STATS_SUCCESS,
    INVENTORY_STATS_FAIL,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAIL,
    UPDATE_PATIENT_RESET,
    GET_ADMIN_NOTIFICATIONS_REQUEST,
    GET_ADMIN_NOTIFICATIONS_SUCCESS,
    GET_ADMIN_NOTIFICATIONS_FAIL,
    GET_PATIENT_REMAINING_READINGS,
    GET_LOGS_REQUEST,
    GET_LOGS_SUCCESS,
    GET_LOGS_FAIL,
    GET_CAREPLAN_LIST_REQUEST,
    GET_CAREPLAN_LIST_SUCCESS,
    GET_CAREPLAN_LIST_FAIL,
    GET_DOCTOR_TELEMETARY_REPORT_REQUEST,
    GET_DOCTOR_TELEMETARY_REPORT_SUCCESS,
    GET_DOCTOR_TELEMETARY_REPORT_FAIL,
    GET_DOCTOR_TELEMETARY_REPORT_RESET,
    TIME_SUMMARY_REPORT_REQUEST,
    TIME_SUMMARY_REPORT_SUCCESS,
    TIME_SUMMARY_REPORT_FAIL,
    TIME_SUMMARY_REPORT_RESET,
    SEARCH_LOG_REQUEST,
    SEARCH_LOG_SUCCESS,
    SEARCH_LOG_FAIL,
    SEARCH_LOG_RESET,
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL, 
    DEVICE_SIGNAL_HISTORY_FETCH_SUCCESS,
    DEVICE_SIGNAL_HISTORY_FETCH_FAIL,
    FINANCIAL_REPORT_HISTORY_REQUEST,
    FINANCIAL_REPORT_HISTORY_SUCCESS,
    FINANCIAL_REPORT_HISTORY_FAIL,
    FINANCIAL_REPORT_HISTORY_RESET,
    ALL_INACTIVE_PATIENTS_REQUEST,
    ALL_INACTIVE_PATIENTS_SUCCESS,
    ALL_INACTIVE_PATIENTS_FAIL,
    DEVICE_HISTORY_REQUEST,
    DEVICE_HISTORY_SUCCESS,
    DEVICE_HISTORY_FAIL,
    RPM_CRITICAL_DATA_SUCCESS,
    DOCTOR_STATS_SUCCESS,
    DOCTOR_STATS_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const adminReducers = (state = { patients: []}, action) => {
    switch(action.type) {
        case ALL_PATIENTS_REQUEST: 
        return { 
            loading: true,  
            patients: []            
        }

        case ALL_PATIENTS_SUCCESS: 
        return { 
            loading: false,  
            patients: action.payload       
        }

        case ALL_PATIENTS_FAIL: 
        case UPDATE_PATIENT_REQUEST:
        return { 
            loading: false,  
            error: action.payload        
        }

        case UPDATE_PATIENT_SUCCESS: 
            return {
                loading: false,
                isUpdated: true 
        }

        case UPDATE_PATIENT_FAIL: return {
            loading: false,
            error: action.payload
        }

        case UPDATE_PATIENT_RESET: return {
            loading: false,
            isUpdated: false
        }

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 
        }

        default: 
         return state;
    }
} 

export const doctorReducers = (state = {doctors: []}, action) => {
    switch(action.type) {
        case ALL_DOCTORS_REQUEST:
            return { 
                loading: true,     
            }

        case ALL_DOCTORS_SUCCESS:
            return { 
                loading: false,  
                doctors: action.payload 
            }
            
        case ALL_DOCTORS_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

 export const doctorProfileReducers = (state = {doctor: {}}, action) => {
    switch (action.type) {
        case DOCTOR_PROFILE_REQUEST: 
            return {
                loading: true,
            }
        
        case DOCTOR_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                doctor: action.payload
            }
        
        case DOCTOR_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
        default: 
            return state; 
    } 
}

export const doctorpatientsReducers = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_PATIENTS_REQUEST: 
            return {
                loading: true,
            }
        
        case DOCTOR_PATIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                doctorpatients: action.payload
            }
        
        // case DOCTOR_PATIENTS_SUCCESS:
        //     return {
        //         loading: false,
        //         error: action.payload
        //     }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    

        default: 
            return state; 
    } 
}

export const patientProfileReducers = (state = {patient: {}, readingsCount: ""}, action) => {
    switch (action.type) {
        case PATIENT_PROFILE_REQUEST: 
        case ASSIGN_DEVICE_TO_PATIENT_REQUEST:
            return {
                loading: true,
            }
        
        case PATIENT_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                patient: action.payload
            }
         
        case ASSIGN_DEVICE_TO_PATIENT_SUCCESS:
        return {
            ...state,
            loading: false,
            success: true,
            // patient: action.payload,
            isUpdated: true
        }    
        
        case PATIENT_PROFILE_FAIL:
        case ASSIGN_DEVICE_TO_PATIENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        case CLEAR_ERRORS: 
                return {
                ...state,
                error: null   
                }    
        default: 
            return state; 
    } 
}

export const deviceDataReducers = (state = { deviceData: []}, action) => {
    switch(action.type) {
        case GET_PATIENT_DEVICE_DATA_REQUEST: 
        return { 
            loading: true,              
        }

        case GET_PATIENT_DEVICE_DATA_SUCCESS: 
        return { 
            loading: false,  
            deviceData: action.payload,
            Count :action.count        
        }

        case GET_PATIENT_DEVICE_DATA_FAIL: 
        return { 
            loading: false,  
            error: action.payload        
        }

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 
        }

        default: 
         return state;
    }
} 

export const devicesReducers = (state = { devices: []}, action) => {
    switch(action.type) {
        case GET_DEVICES_LIST_REQUEST:
        case SORT_DEVICES_REQUEST:
        case SORT_DEVICES_BY_BROKEN_REQUEST:     
        return { 
            loading: true,      
        }

        case GET_DEVICES_LIST_SUCCESS:  
        return { 
            loading: false,  
            deviceCount: action.payload.count,
            devices: action.payload.devices        
        }

        case SORT_DEVICES_BY_BROKEN_SUCCESS: 
        return {
            loading: false, 
            devices: action.payload
        }

        case SORT_DEVICES_SUCCESS: 
        return {
            loading: false, 
            devices: action.payload,
        }

        case GET_DEVICES_LIST_FAIL: 
        case SORT_DEVICES_BY_BROKEN_FAIL:
        case SORT_DEVICES_FAIL:
        return { 
            loading: false,  
            error: action.payload        
        }

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 
        }

        default: 
         return state;
    }
} 

export const deviceDetailsReducers = (state = {deviceDetails: {}}, action) => {
    switch (action.type) {
        case GET_DEVICE_DETAILS_REQUEST: 
            return {
                loading: true,
            }
        
        case GET_DEVICE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                deviceDetails: action.payload,
            }
        
        case GET_DEVICE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
        default: 
            return state; 
    } 
}

export const newDeviceReducers = (state = {devices: {} }, action) => {
    switch (action.type) {

    case ADD_RPM_DEVICE_RESET: 
        return { 
            ...state,
        loading: false,
        success: false,
        isUpdated: false
        }      
     
     case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
     default: 
        return state; 
    } 
 }

// HRs Reducers
export const hrsReducers =  (state = { hrs: []}, action) => {
    switch (action.type) {
        case ALL_HRS_REQUEST: 
        case ASSIGN_DOCTOR_TO_HR_REQUEST:
         return {
             loading: true
         }

        case ALL_HRS_SUCCESS: 
            return {
                loading: false,
                hrs: action.payload
            }   

         case ASSIGN_DOCTOR_TO_HR_SUCCESS: 
            return { 
             loading: false,
             isAssigned: true,
            }
            
        case RESET_ASSIGN_PATIENT_TO_HR:
            return { 
                isAssigned: false,
            }

        case ALL_HRS_FAIL: 
        case ASSIGN_DOCTOR_TO_HR_FAIL:
        return {
            error: action.payload
        }

        default: // need this for default case
        return state 
    }
}

export const adminStatsReducers = (state = { totalPatients:0, totalHrs: 0, totalDrs:0, totalDevices:0  }, action) => {
    switch (action.type) {
        case ADMIN_STATS_SUCCESS: 
            return {
                loading: false,
                totalPatients: action.payload.totalPatients,
                totalHrs: action.payload.totalHrs, 
                totalDrs: action.payload.totalDrs,
                totalDevices: action.payload.totalDevices,
                activePts: action.payload.activePts,
                blockPts: action.payload.blockpts,
                malePts: action.payload.malePts,
                femalePts: action.payload.femalePts,
                rpmPts: action.payload.rpmPts,
                ccmPts: action.payload.ccmPts,
            }

        case ADMIN_STATS_FAIL:
            return {
                ...state,
                error: action.payload
            } 
            
        default: // need this for default case
        return state    
    }
}

export const inventoryStatsReducers = (state={totalDevices:0, instockDevices: 0, outstockDevices: 0, brokenDevices:0}, action) => {
    switch(action.type){
        case INVENTORY_STATS_SUCCESS:
            return{
                totalDevices: action.payload.totalDevices,
                instockDevices: action.payload.instockDevices,
                outstockDevices: action.payload.outstockDevices,
                brokenDevices: action.payload.brokenDevices,
                cuffDevices: action.payload.cuffDevices,
                weightDevices: action.payload.weightDevices,
                spo2Devices: action.payload.spo2Devices
        }

        case INVENTORY_STATS_FAIL:
            return {
                ...state,
                error: action.payload
            }
            
        default: 
        return state
    }
}

export const careplanListReducers = (state={doccareplanlist:[]}, action) => {
    switch (action.type) {
        
        case GET_CAREPLAN_LIST_REQUEST:
            return {
                loading: true
        }

        case GET_CAREPLAN_LIST_SUCCESS: 
            return {
                loading: false,
                doccareplanlist: action.payload
            }
        
        case GET_CAREPLAN_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }
         
        default: 
        return state;
        }
}

export const adminNotificationsReducers = (state = { notifications:[] }, action) => {
    switch (action.type) {
        case GET_ADMIN_NOTIFICATIONS_REQUEST: 
            return {
                loading: true,
            }

        case GET_ADMIN_NOTIFICATIONS_SUCCESS:
            return {
                loading: false,
                notifications: action.payload
            }
            
        case GET_ADMIN_NOTIFICATIONS_FAIL:
            return {
                ...state,
                error: action.payload
        }
            
        default: // need this for default case
        return state    
    }
}

export const remainingReadingsReducer = (state={count:0}, action) => {
    switch(action.type) {
        case GET_PATIENT_REMAINING_READINGS: 
        return {
            count: action.payload.Readings  
        }

        default: 
        return state
    }
}

export const hrProfilesReducer = (state={hrProfile:0}, action) => {
    switch(action.type) {
        
        case HR_PROFILE_SUCCESS: 
        return {
            hrProfile: action.payload
        }

        case HR_PROFILE_FAIL: 
        return {
            ...state,
            error: action.payload
        }

        default: 
        return state
    }
}

export const logsReducers = (state = {logs: []}, action) => {
    switch(action.type) {
        case GET_LOGS_REQUEST:
            return { 
                loading: true,     
            }

        case GET_LOGS_SUCCESS:
            return { 
                loading: false,  
                logs: action.payload 
            }
            
        case GET_LOGS_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

export const doctorTelemetaryReportReducer = (state = {telemetaryReport: []}, action) => {
    switch(action.type) {
        case GET_DOCTOR_TELEMETARY_REPORT_REQUEST:
            return { 
                loading: true,     
            }

        case GET_DOCTOR_TELEMETARY_REPORT_SUCCESS:
            return { 
                loading: false,  
                telemetaryReport: action.payload 
            }
            
        case GET_DOCTOR_TELEMETARY_REPORT_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case GET_DOCTOR_TELEMETARY_REPORT_RESET: 
        return {
            loading: false, 
            telemetaryReport: []
         }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

export const timeSummaryReportReducer = (state = {timeSummaryReport: []}, action) => {
    switch(action.type) {
        case TIME_SUMMARY_REPORT_REQUEST:
            return { 
                loading: true,     
            }

        case TIME_SUMMARY_REPORT_SUCCESS:
            return { 
                loading: false,  
                timeSummaryReport: action.payload 
            }
            
        case TIME_SUMMARY_REPORT_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case TIME_SUMMARY_REPORT_RESET: 
        return {
            loading: false, 
            timeSummaryReport: []
         }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

export const searchLogReducer = (state = {logs: []}, action) => {
    switch(action.type) {
        case SEARCH_LOG_REQUEST:
            return { 
                loading: true,     
            }

        case SEARCH_LOG_SUCCESS:
            return { 
                loading: false,  
                logs: action.payload 
            }
            
        case SEARCH_LOG_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case SEARCH_LOG_RESET: 
        return {
            loading: false, 
            logs: []
         }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

export const adminsListReducers = (state = {adminsList: []}, action) => {
    switch(action.type) {
        case ALL_ADMINS_REQUEST:
            return { 
                loading: true,     
        }

        case ALL_ADMINS_SUCCESS:
            return { 
                loading: false,  
                admins: action.payload 
        }
            
        case ALL_ADMINS_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const deviceSignalHistoryReducers = (state = {signalHistory: []}, action) => {
    switch(action.type) {

        case DEVICE_SIGNAL_HISTORY_FETCH_SUCCESS:
            return {   
                signalHistory: action.payload 
        }
            
        case DEVICE_SIGNAL_HISTORY_FETCH_FAIL:
            return {   
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const financialReportHistoryReducers = (state = {financialreportHistory: []}, action) => {
    switch(action.type) {

        case FINANCIAL_REPORT_HISTORY_REQUEST:
            return {   
                loading: true,
                financialreportHistory: action.payload 
        }

        case FINANCIAL_REPORT_HISTORY_SUCCESS:
            return {   
                loading: false,
                financialreportHistory: action.payload 
        }
            
        case FINANCIAL_REPORT_HISTORY_FAIL:
            return {   
                error: action.payload
        }

        case FINANCIAL_REPORT_HISTORY_RESET:
            return {   
            loading: false, 
            financialreportHistory: []
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const inactivePatientsReducers = (state = {inactivePts: []}, action) => {
    switch(action.type) {

        case ALL_INACTIVE_PATIENTS_REQUEST:
            return {   
                loading: true 
            }

        case ALL_INACTIVE_PATIENTS_SUCCESS:
            return {   
                loading: false,
                inactivePts: action.payload 
        }
            
        case ALL_INACTIVE_PATIENTS_FAIL:
            return {   
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const devicesHistoryReducers = (state = {}, action) => {
    switch(action.type) {

        case DEVICE_HISTORY_REQUEST:
            return {   
                loading: true 
            }

        case DEVICE_HISTORY_SUCCESS:
            return {   
                loading: false,
                deviceHistory: action.payload 
            }
            
        case DEVICE_HISTORY_FAIL:
            return {   
                error: action.payload
        }

        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const criticalRPMReducers = (state = {criticalPts: []}, action) => {
    switch(action.type) {
        case RPM_CRITICAL_DATA_SUCCESS:
            return {   
                loading: false,
                criticalPts: action.payload 
            }
        
        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
        }        
        
        default:{
            return state
        }     
    }
}

export const doctorStatsReducers = (state = { totalPatients:0, rpmPatients: 0, ccmPatients:0 }, action) => {
    switch (action.type) {
        case DOCTOR_STATS_SUCCESS: 
            return {
                loading: false,
                totalPatients: action.payload.totalPatients,
                RpmPatients: action.payload.RpmPatients, 
                CcmPatients: action.payload.CcmPatients,
            }

        case DOCTOR_STATS_FAIL:
            return {
                ...state,
                error: action.payload
            } 
            
        default: // need this for default case
        return state    
    }
}