    import { 
        HR_PATIENTS_REQUEST,
        HR_PATIENTS_SUCCESS,
        HR_PATIENTS_FAIL,
        ADDING_COMMENT_REQUEST,
        ADDING_COMMENT_SUCCESS,
        ADDING_COMMENT_FAIL,
        COMMENT_RESET,
        ADDING_TIME_SPENT_SUCCESS,
        ADDING_TIME_SPENT_FAIL,
        ADDING_TIME_SPENT_RESET,
        TIME_REPORT_REQUEST,
        TIME_REPORT_SUCCESS,
        TIME_REPORT_FAIL,
        INITIAL_MONTH_REPORT_REQUEST,
        INITIAL_MONTH_REPORT_SUCCESS,
        INITIAL_MONTH_REPORT_FAIL,
        RESET_INITIAL_MONTH_DATA,
        RESET_TIME_REPORT_DATA,
        ADDING_CARE_PLAN_SUCCESS,
        ADDING_CARE_PLAN_FAIL,
        ADDING_CARE_PLAN_RESET,
        PATIENT_CARE_PLAN_SUCCESS,
        PATIENT_CARE_PLAN_FAIL,
        UPDATE_CARE_PLAN_SUCCESS,
        UPDATE_CARE_PLAN_FAIL,
        UPDATE_CARE_PLAN_RESET,
        TIME_SPENT_OF_CURRENT_MONTH_SUCCESS,
        TIME_SPENT_OF_CURRENT_MONTH_FAIL,
        TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_SUCCESS,
        TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_FAIL,
        GET_HR_NOTIFICATIONS_REQUEST,
        GET_HR_NOTIFICATIONS_SUCCESS,
        GET_HR_NOTIFICATIONS_FAIL,
        GET_CAREPLAN_LIST_REQUEST,
        GET_CAREPLAN_LIST_SUCCESS,
        GET_CAREPLAN_LIST_FAIL,
        HR_STATS_SUCCESS,
        HR_STATS_FAIL,
        GET_CCM_CONSENT_REQUEST,
        GET_CCM_CONSENT_SUCCESS,
        CCM_CONSENT_RESET,
        GET_CCM_CAREPLAN_REQUEST,
        GET_CCM_CAREPLAN_SUCCESS,
        CCM_CAREPLAN_RESET,
        CHAT_PATIENT_REQUEST,
        CHAT_PATIENT_SUCCESS,
        CHAT_PATIENT_FAIL,
        CLEAR_ERRORS
    } from '../constants/HRConstants';

    export const hrpatientsReducers = (state = {}, action) => {
        switch (action.type) {
            case HR_PATIENTS_REQUEST: 
                return {
                    loading: true,
                }
            
            case HR_PATIENTS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    success: true,
                    hrpatients: action.payload
                }
            
            case HR_PATIENTS_FAIL:
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

    export const commentReducers = (state = {loading: false, commentSuccess: false}, action) => {
        switch (action.type) {
            case ADDING_COMMENT_REQUEST: 
                return {
                    loading: true,
                }
            
            case ADDING_COMMENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    commentSuccess: true,
                }
            
            case ADDING_COMMENT_FAIL:
                return {
                    loading: false,
                    commentSuccess: false,
                }

            case CLEAR_ERRORS: 
            return {
                ...state,
                error: null   
            }  
            
            case COMMENT_RESET: 
            return {
                loading: false,
                commentSuccess: false,
            }
            
            default: 
                return state; 
        } 
    }

    export const hrtimeSpentReducers = (state = {loading: false, isSuccessful: false, carePlanAdded: false}, action) => {
        switch (action.type) {
        
            case ADDING_TIME_SPENT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isSuccessful:true,
                }
            
            case ADDING_TIME_SPENT_FAIL:
                return {
                    loading: false,
                    isSuccessful:false,
                }

            case ADDING_CARE_PLAN_SUCCESS: 
                return{
                    loading: false,
                    carePlanAdded: true
                }
            
            case ADDING_CARE_PLAN_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        
            case ADDING_CARE_PLAN_RESET: 
                return{
                    loading: false,
                    carePlanAdded: false
                }

            case CLEAR_ERRORS: 
            return {
                ...state,
                error: null   
            }  
            
            case ADDING_TIME_SPENT_RESET: 
            return {
                loading: false,
                isSuccessful:false,
            }
            
            default: 
                return state; 
        } 
    }

    export const hrTimeReportReducers = (state = {targets:{}}, action) => {
        switch (action.type) {
        
            case TIME_REPORT_REQUEST:
                return {
                    loading: true,
                }
            
            case TIME_REPORT_SUCCESS:
                return {
                    loading: false,
                    targets: action.payload.targets,
                    totalTime: action.payload.totalTime,
                    totalInteractiveMinutes: action.payload.totalInteractiveMinutes,
                    totalNonInteractiveMinutes: action.payload.totalNonInteractiveMinutes
                }
            
            case RESET_TIME_REPORT_DATA: 
            return {
                loading: false,
                targets: null,
                totalTime: 0
            }

            case TIME_REPORT_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
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

    export const initialMonthReportReducers = (state = {initialMonthPatients:[]}, action) => {
        switch (action.type) {
        
            case INITIAL_MONTH_REPORT_REQUEST:
                return {
                    loading: true,
                }
            
            case INITIAL_MONTH_REPORT_SUCCESS:
                return {
                    loading: false,
                    initialMonthPatients: action.payload
                }
            
            case RESET_INITIAL_MONTH_DATA:
                return {
                    loading: false,
                    initialMonthPatients: null
                }

            case INITIAL_MONTH_REPORT_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
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

    export const carePlanReducers = (state='', action) => {
        switch (action.type) {
            
            case PATIENT_CARE_PLAN_SUCCESS:
                return {
                    careplan: action.payload
            }

            case PATIENT_CARE_PLAN_FAIL:
                return {
                    error: action.payload
                }

            case UPDATE_CARE_PLAN_SUCCESS: 
                return {
                    isUpdated: true
                }

            case UPDATE_CARE_PLAN_FAIL: 
                return {
                    error: action.payload
                }

            case UPDATE_CARE_PLAN_RESET: 
                return {
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

    export const careplanListReducers = (state={careplanlist:[]}, action) => {
        switch (action.type) {
            
            case GET_CAREPLAN_LIST_REQUEST:
                return {
                    loading: true
            }

            case GET_CAREPLAN_LIST_SUCCESS: 
                return {
                    loading: false,
                    careplanlist: action.payload
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

    export const timeSpentCurrentMonthReducer = (state={totalTime:0 }, action) => {
        switch (action.type) {
            case TIME_SPENT_OF_CURRENT_MONTH_SUCCESS:
                return {
                    totalTime: action.payload.totalTime
                }
            
            case TIME_SPENT_OF_CURRENT_MONTH_FAIL: 
            return {
                ...state,
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

    export const timeSpentCurrentMonthinCCMReducer = (state={totalTimeinCCM:0 }, action) => {
        switch (action.type) {
            case TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_SUCCESS:
                return {
                    totalTimeinCCM: action.payload.totalTime
                }
            
            case TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_FAIL: 
            return {
                ...state,
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
    
    export const hrNotificationsReducers = (state = { notifications:[] }, action) => {
        switch (action.type) {
            case GET_HR_NOTIFICATIONS_REQUEST: 
                return {
                    loading: true,
                }

            case GET_HR_NOTIFICATIONS_SUCCESS:
                return {
                    loading: false,
                    notifications: action.payload
                }
                
            case GET_HR_NOTIFICATIONS_FAIL:
                return {
                    ...state,
                    error: action.payload
            }
                
            default: // need this for default case
            return state    
        }
    }

    // HR Stats
    export const hrStatsReducers = (state = { totalPatients:0, activePatients: 0, compliantPatients:0, nonCompliantPatients:0, InactivePatients: 0  }, action) => {
        switch (action.type) {
            case HR_STATS_SUCCESS: 
                return {
                    loading: false,
                    totalPatients: action.payload.totalPatients,
                    activePatients: action.payload.activePatients, 
                    compliantPatients: action.payload.compliantPatients,
                    nonCompliantPatients: action.payload.nonCompliantPatients,
                    InactivePatients: action.payload.InactivePatients
                }
    
            case HR_STATS_FAIL:
                return {
                    ...state,
                    error: action.payload
                } 
                
            default: // need this for default case
            return state    
        }
    }

    // HR Stats
    export const patientCCMConsentReducers = (state={ccmConsent:[]}, action) => {
        switch (action.type) {
            case GET_CCM_CONSENT_REQUEST: 
                return {
                    loading: true,
                }
    
            case GET_CCM_CONSENT_SUCCESS:
                return {
                    loading: false,
                    ccmConsent: action.payload
                } 
            
            case CCM_CONSENT_RESET:
            return {
                loading: false,
                ccmConsent:[]
            }
                
            default: // need this for default case
            return state    
        }
    }

    
    // HR Stats
    export const patientCCMCareplanReducers = (state={ccmCareplan:[]}, action) => {
        switch (action.type) {

            case GET_CCM_CAREPLAN_REQUEST: 
                return {
                    loading: true,
                }
    
            case GET_CCM_CAREPLAN_SUCCESS:
                return {
                    loading: false,
                    ccmCareplan: action.payload
                }
                
            case CCM_CAREPLAN_RESET:
                return {
                    loading: false,
                    ccmCareplan:[]
                }
        
                
            default: // need this for default case
            return state    
        }
    }

    export const chatReducers = (state={chat:[] }, action) => {
        switch (action.type) {
            case CHAT_PATIENT_REQUEST:
                return {
                    loading: true
                }
            
            case CHAT_PATIENT_SUCCESS: 
            return {
                loading: false,
                chat: action.payload
            }

            case CHAT_PATIENT_FAIL: 
            return {
                loading: false,
                chat: []   
            }
            
        default: 
        return state;
        }
    }
    