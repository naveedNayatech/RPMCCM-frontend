import axios from 'axios';
import { Prod01 } from '../constants/ActionType';
import moment from 'moment';

import {
    HR_PATIENTS_REQUEST,
    HR_PATIENTS_SUCCESS,
    HR_PATIENTS_FAIL,
    ADDING_COMMENT_REQUEST,
    ADDING_COMMENT_SUCCESS,
    ADDING_COMMENT_FAIL,
    ADDING_TIME_SPENT_SUCCESS,
    ADDING_TIME_SPENT_FAIL,
    TIME_REPORT_REQUEST,
    TIME_REPORT_SUCCESS,
    TIME_REPORT_FAIL,
    INITIAL_MONTH_REPORT_REQUEST,
    INITIAL_MONTH_REPORT_SUCCESS,
    INITIAL_MONTH_REPORT_FAIL,
    ADDING_CARE_PLAN_SUCCESS,
    ADDING_CARE_PLAN_FAIL,
    PATIENT_CARE_PLAN_SUCCESS,
    PATIENT_CARE_PLAN_FAIL,
    UPDATE_CARE_PLAN_SUCCESS,
    UPDATE_CARE_PLAN_FAIL,
    TIME_SPENT_OF_CURRENT_MONTH_SUCCESS,
    TIME_SPENT_OF_CURRENT_MONTH_FAIL,
    GET_HR_NOTIFICATIONS_REQUEST,
    GET_HR_NOTIFICATIONS_SUCCESS,
    GET_HR_NOTIFICATIONS_FAIL,
    GET_CAREPLAN_LIST_REQUEST,
    GET_CAREPLAN_LIST_SUCCESS,
    GET_CAREPLAN_LIST_FAIL,
    HR_STATS_SUCCESS,
    HR_STATS_FAIL,
    TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_SUCCESS,
    TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_FAIL,
    CLEAR_ERRORS,
    GET_CCM_CONSENT_REQUEST,
    GET_CCM_CONSENT_SUCCESS,
    GET_CCM_CAREPLAN_REQUEST,
    GET_CCM_CAREPLAN_SUCCESS,
    CHAT_PATIENT_REQUEST,
    CHAT_PATIENT_SUCCESS,
    CHAT_PATIENT_FAIL
} from '../constants/HRConstants';

import { 
    SHOW_ALERT_MESSAGE,
    HIDE_ALERT_MESSAGE,
    FETCH_ERROR
} from '../constants/Common';



export const getHRPatients = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HR_PATIENTS_REQUEST,
        })


        const { data } = await axios.post(`${Prod01}/hr/patientlist/${id}`, {
            name: 'hammad'
        });

        dispatch({
            type: HR_PATIENTS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: HR_PATIENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPatientChat = (PatientId, id) => async (dispatch) => {
    try {
        dispatch({
            type: CHAT_PATIENT_REQUEST,
        })


        const { data } = await axios.post(`${Prod01}/general/getMessages`, {
            patientId: PatientId, 
            nurseId: id
        });

        dispatch({
            type: CHAT_PATIENT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CHAT_PATIENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const submitPatientChat = (PatientId, nurseId, message) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${Prod01}/general/sendMessage`, {
            patient_id: PatientId, 
            nurse_id: nurseId,
            message: message
        });

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Message Sent"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })     

        dispatch(getPatientChat(PatientId, nurseId));


    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Server Error! Cannot send message'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


export const getHRCCMPatients = (doctorId, resPerPage, currentPage) => async (dispatch) => {
    
    if(doctorId !== 'undefined'){
        try {
            dispatch({
                type: HR_PATIENTS_REQUEST,
            })
    
            const { data } = await axios.post(`${Prod01}/general/ccmpatients/list/${resPerPage}/${currentPage}`, {
                drId: doctorId
            });
    
            dispatch({
                type: HR_PATIENTS_SUCCESS,
                payload: data
            })
    
    
        } catch (error) {
            dispatch({
                type: HR_PATIENTS_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

export const searchNurseCCMPatients = (doctorId, searchBy, keyword) => async (dispatch) => {
    try {
        dispatch({
            type: HR_PATIENTS_REQUEST,
        })

        const { data } = await axios.post(`${Prod01}/patient/ccm/search`,{
            key: searchBy,
            value:keyword,
            drId: doctorId
        }, );

        dispatch({
            type: HR_PATIENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HR_PATIENTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getHRStats = (id) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${Prod01}/hr/hrStats`, {
            hrId: id
        });

        dispatch({
            type: HR_STATS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: HR_STATS_FAIL,
            payload: error.response.data.message
        })
    }
}

// HR comment on reading
export const commentOnReading = (readingId, hrId, comment) => async (dispatch) => {

    try {
        dispatch({
            type: ADDING_COMMENT_REQUEST
        });

        const { data } = await axios.put(`${Prod01}/patient/commentonreading/${readingId}`, {
            conclusion_hr_id: hrId,
            conclusion: comment
        });

        dispatch({
            type: ADDING_COMMENT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADDING_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const commentOnReadingByStaff = (readingId, staffId, comment) => async (dispatch) => {

    try {
        dispatch({
            type: ADDING_COMMENT_REQUEST
        });

        const { data } = await axios.put(`${Prod01}/patient/commentonreading/${readingId}`, {
            conclusion_doctor_id: staffId,
            conclusion: comment
        });

        dispatch({
            type: ADDING_COMMENT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADDING_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Time Spent on Patient
export const timeSpentOnPatient = (patientId, hrId, startDate, endDate, startTime, endTime, isCCM, interactiveMinutes, minutes, note, fileName) => async (dispatch) => {
    let data = {};
    try {
        if(isCCM == false){

            let formData = new FormData();
            formData.append('file', fileName);

            if (fileName) {
                fetch(`${Prod01}/general/uploadfile`, {
                    method: 'POST',
                    body: formData,
                }
                )
            }

             data = await axios.post(`${Prod01}/hr/addtimeforpatient/${hrId}`, {
                assigned_patient_id: patientId,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                interactiveMinutes: interactiveMinutes,
                timeSpentInMinutes: minutes,
                conclusion: note,
                fileName:fileName.name
            });
        } else {

            let formData = new FormData();
            formData.append('file', fileName);

            if (fileName) {
                fetch(`${Prod01}/general/uploadfile`, {
                    method: 'POST',
                    body: formData,
                }
                )
            }

            data = await axios.post(`${Prod01}/hr/addtimeforpatient/${hrId}`, {
                assigned_patient_id: patientId,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                isCCM:isCCM,
                interactiveMinutes: interactiveMinutes,
                timeSpentInMinutes: minutes,
                conclusion: note,
                fileName: fileName.name
            });
        } 
        

        dispatch({
            type: ADDING_TIME_SPENT_SUCCESS,
            payload: data
        });
     
    } 
   
    catch (error) {
        dispatch({
            type: ADDING_TIME_SPENT_FAIL,
            payload: error.message
        })
    }
}

export const timeSpentOnPatientAuto = (patientId, hrId, minutes, description) => async(dispatch) => {
    try {
       const { data } = await axios.post(`${Prod01}/hr/addtimeforpatient/${hrId}`, {
                assigned_patient_id : patientId,
                timeSpentInMinutes:minutes,
                conclusion: description
           });    
           
        dispatch({ 
            type: ADDING_TIME_SPENT_SUCCESS,
            payload: data
        });
        
    } catch (error) {
       dispatch({
           type: ADDING_TIME_SPENT_FAIL,
           payload: error.message
       })
    }   
}


export const carePlanOfPatient = (patientId, hrId, description, readingsPerMonth, readingsInDay, readingsInNight, fileName) => async (dispatch) => {
    let data;
    try {
    
        data = await axios.post(`${Prod01}/patient/addCarePlan`, {
            assigned_hr_id: hrId,
            assigned_patient_id: patientId,
            Description: description,
            readingsPerMonth: readingsPerMonth,
            readingsInSlot1: readingsInDay,
            readingsInSlot2: readingsInNight,
            fileName: fileName.name
        });


        let formData = new FormData();
        formData.append('file', fileName);

        if (fileName) {
            fetch(`${Prod01}/general/uploadfile`, {
                method: 'POST',
                body: formData,
              }
            )
        }

        dispatch({
            type: ADDING_CARE_PLAN_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADDING_CARE_PLAN_FAIL,
            payload: 'Care plan already exists'
        })
    }
}

export const getTimeReport = (patientId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            patientId: patientId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportByHR = (hrId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            hrId: hrId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportByDR = (drId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltimeOfDoctor`, {
            drId: drId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportCCM = (patientId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltimeofCCMCategory`, {
            patientId: patientId,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD")
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportCCMByHR = (hrId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltimeofCCMCategory`, {
            hrId: hrId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportCCMByDR = (drId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltimeOfDoctor`, {
            drId: drId,
            startDate: startDate,
            endDate: endDate,
            isCCM: true
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}


export const hrTimeSpentOfCurrentMonth = (patientId, hrId, startDate, endDate) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            hrId: hrId,
            patientId: patientId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_FAIL,
            payload: error.message
        })
    }
}

export const hrTimeSpentOfCurrentMonthinCCMCategory = (patientId, hrId, startDate, endDate) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltimeofCCMCategory`, {
            hrId: hrId,
            patientId: patientId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_IN_CCM_FAIL,
            payload: error.message
        })
    }
}

export const getInitialMonthReport = (hrId, doctorId, month) => async (dispatch) => {
    try {
        dispatch({
            type: INITIAL_MONTH_REPORT_REQUEST
        });

        let data;

        if (month) {
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month
            });
        }

        if (month && hrId) {
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month,
                hrId: hrId
            });
        }

        if (month && doctorId) {
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month,
                doctorId: doctorId
            });
        }


        dispatch({
            type: INITIAL_MONTH_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: INITIAL_MONTH_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getPatientCarePlan = (patientId) => async (dispatch) => {
    try {

        const data = await axios.get(`${Prod01}/patient/CarePlan/${patientId}`);

        dispatch({
            type: PATIENT_CARE_PLAN_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: PATIENT_CARE_PLAN_FAIL,
            payload: error.message
        })
    }
}

export const getHRCareplans = (hrId) => async (dispatch) => {
    try {

        dispatch({
            type: GET_CAREPLAN_LIST_REQUEST
        })

        const { data } = await axios.post(`${Prod01}/patient/CarePlanbydrhr`, {
            "hr_Id": hrId
        });

        dispatch({
            type: GET_CAREPLAN_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: GET_CAREPLAN_LIST_FAIL,
            payload: error.message
        })
    }
}

export const updateCarePan = (description, readingsPerMonth, readingsPerDay, careplanId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${Prod01}/patient/editcareplan/${careplanId}`, {
            Description: description,
            readingsPerMonth: readingsPerMonth,
            readingsPerDay: readingsPerDay
        });

        dispatch({
            type: UPDATE_CARE_PLAN_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_CARE_PLAN_FAIL,
            payload: error.message
        })
    }
}

export const getHRNotifications = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_HR_NOTIFICATIONS_REQUEST })

        const data = await axios.post(`${Prod01}/general/notifications`, {
            hrId: id
        });

        dispatch({
            type: GET_HR_NOTIFICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_HR_NOTIFICATIONS_FAIL,
            payload: error
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

export const submitCCMConsent = (fileName, user, patientId, type, description) => async(dispatch) => {
    try { 
        let formData = new FormData();
            formData.append('file', fileName);

        if (fileName) {
            fetch(`${Prod01}/general/uploadfile`, {
                method: 'POST',
                body: formData,
            }
            )
        }

        await axios.post(`${Prod01}/patient/add/CCMConsent`,{
            assigned_patient_id: patientId,
            addedBy: user?.firstname ? user?.firstname +' '+ user?.lastname : user?.name,
            fileName:fileName.name,
            assigned_hr_id: user?._id,
            type: type,
            consentType: 'CCM',
            description: type === "Verbal" ? description : null   
        }, );

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "CCM Consent Added"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add consent'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const submitCCMCareplan = (fileName, user, patientId, description) => async(dispatch) => {
    try { 
        let formData = new FormData();
            formData.append('file', fileName);

        if (fileName) {
            fetch(`${Prod01}/general/uploadfile`, {
                method: 'POST',
                body: formData,
            }
            )
        }

        await axios.post(`${Prod01}/patient/add/CCMCarePlan`,{
            assigned_patient_id: patientId,
            addedBy: user?.firstname ? user?.firstname +' '+ user?.lastname : user?.name,
            fileName:fileName.name,
            description: description
        }, );

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "CCM Careplan Added"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add consent'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const getPatientCCMConsent = (patientId) => async(dispatch) => {
    try { 
        dispatch({
            type: GET_CCM_CONSENT_REQUEST
        });

        const {data} = await axios.get(`${Prod01}/patient/get/CCMConsent/${patientId}`);

        dispatch({
            type: GET_CCM_CONSENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        return
        // dispatch({
        //     type: FETCH_ERROR,
        //     payload: error.message
        // })
    }
}

export const getPatientCCMCareplan = (patientId) => async(dispatch) => {
    try { 
        dispatch({
            type: GET_CCM_CAREPLAN_REQUEST
        });

        const {data} = await axios.get(`${Prod01}/patient/get/CCMCarePlan/${patientId}`);

        dispatch({
            type: GET_CCM_CAREPLAN_SUCCESS,
            payload: data
        })

    } catch (error) {
        return
    }
}

export const deleteCCMCareplan = (careplanId) => async(dispatch) => {
    try { 
        await axios.delete(`${Prod01}/patient/remove/CCMCarePlan/${careplanId}`);

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "CCM Careplan Deleted"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to delete CCM Careplan'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const deleteCCMConsent = (consentId) => async(dispatch) => {
    try { 
        await axios.delete(`${Prod01}/patient/delete/CCMConsent/${consentId}`);

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "CCM Consent Deleted"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to delete CCM Consent'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}