import axios from 'axios';
import { Prod, Prod01 } from '../constants/ActionType';
import { useAlert } from 'react-alert';

import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    STAFF_LOGOUT_SUCCESS,
    STAFF_LOGOUT_FAIL,
    ADMIN_PASSWORD_UPDATE_REQUEST,
    ADMIN_PASSWORD_UPDATE_FAIL,
    HR_LOGOUT_SUCCESS,
    HR_LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/authConstants';

import { 
    SHOW_ALERT_MESSAGE,
    HIDE_ALERT_MESSAGE,
    FETCH_ERROR
} from '../constants/Common';


// Login 
export const login = (values) => async(dispatch) => {
    const { email, password} = values;
    try {
       dispatch({
           type: LOGIN_REQUEST
       })     

       const res  = await axios.post(`${Prod01}/admin/login`, {
           email,
           password
       });
       
       if (res.data) {
        axios.defaults.headers.common["authorization"] = "Bearer " + res.data.tokens.access.token;
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.Admin)
        );
       }

       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data.Admin
       })

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Invalid email or password'
          })
          dispatch({
            type: HIDE_ALERT_MESSAGE
          })
          dispatch({
              type: LOGIN_FAIL
          })
    }
}

// Staff Login 
export const staffLogin = (values) => async(dispatch) => {
    const {email, password} = values;

    let res;

    try {
       dispatch({
           type: LOGIN_REQUEST
       })     

       res = await axios.post(`${Prod01}/doctor/login`, {
        email: email, 
        password: password
       });

       if (res.data) {
        axios.defaults.headers.common["authorization"] = "Bearer " + res.data.tokens.access.token;

        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "doctor",
          JSON.stringify(res.data.doctor)
        );
       }

       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data.doctor
       })
       
    } catch (error) {
        if(error.message === "Request failed with status code 401"){
            dispatch({
                type: LOGIN_FAIL,
                payload: "Your account is blocked"
            }) 
        } else if(error.message === "Request failed with status code 500"){
            dispatch({
                type: LOGIN_FAIL,
                payload: "Invalid username or password"
            })
            dispatch({
                type: LOGIN_FAIL,
                payload: "Please check your internet connection and try again"
            })
        }
    }
}

// HR Login 
export const hrLogin = (values) => async(dispatch) => {
    const {email, password} = values;
    let res;

    try {
       dispatch({
           type: LOGIN_REQUEST
       })     

       res = await axios.post(`${Prod01}/hr/login`, {
        email : email,
        password : password
       });

       if (res.data) {
        axios.defaults.headers.common["authorization"] = "Bearer " + res.data.tokens.access.token;

        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "hr",
          JSON.stringify(res.data.hr)
        );
       }

       dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.hr
    })
       
    } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
            })
     }
}

// HR Logout 
export const hrLogout = () => async(dispatch) => {
    try {
       
       await axios.post(`${Prod01}/hr/signout`);

       dispatch({
           type: HR_LOGOUT_SUCCESS
       })
       
    } catch (error) {
        dispatch({
            type: HR_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Password -> ADMIN 
export const updatePassword = (id, name, email, password) => async(dispatch) => {
    try {
       dispatch({
           type: ADMIN_PASSWORD_UPDATE_REQUEST
       })     

        await axios.put(`${Prod}/admin/edit/${id}`, {
           name: name,
           email: email,
           password: password
       });

       dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: "Account Information updated"
        });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })

        dispatch(logout());

    } catch (error) {
        dispatch({
            type: ADMIN_PASSWORD_UPDATE_FAIL,
            payload: "unable to update"
        })
    }
}

// Logout 
export const logout = () => async(dispatch) => {
    try {
       dispatch({
           type: LOGOUT_SUCCESS
       })
       
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Logout 
export const staffLogout = () => async(dispatch) => {
    try {

        await axios.post(`${Prod01}/doctor/signout`);
        dispatch({
            type: STAFF_LOGOUT_SUCCESS
        })


       
    } catch (error) {
        dispatch({
            type: STAFF_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotpassword = (values) => async(dispatch) => {
    const { email } = values;  
    try {
       const res  = await axios.post(`${Prod01}/auth/forgot-password`, {
           email
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Email Sent"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Email cannot be sent'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}

export const resetpassword = (values, queryToken) => async(dispatch) => {
    const { password } = values;  
    try {
       const res = await axios.post(`${Prod01}/auth/reset-password?token=${queryToken}`, {
           password: password
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Password has been reset"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Unable to update password'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}

export const adminSignup = (values) => async(dispatch) => {

    
    try {
        const res = await axios.post(`${Prod01}/admin/signup`, values);

        if(res){
            dispatch({
                type: SHOW_ALERT_MESSAGE,
                payload: "New Admin Added"
              });
            dispatch({
                type: HIDE_ALERT_MESSAGE
            })
        }
    }
     catch (error) {
        dispatch({
        type: FETCH_ERROR,
        payload: 'Email already exists'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}

export const resetpasswordById = (password, id) => async(dispatch) => {  

    try {
       const res = await axios.post(`${Prod01}/general/resetpasswordanyuser`, {
           id: id,
           password: password
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Password has been reset"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Unable to update password'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}



// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}