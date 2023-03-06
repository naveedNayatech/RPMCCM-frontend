import {
   FETCH_START,
   SHOW_ALERT_MESSAGE,
   HIDE_ALERT_MESSAGE,
   FETCH_ERROR
  } from "../constants/Common";

const INIT_STATE = {
    error: "",
    loading: false,
    message: ""
  };

export const commonReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
      
      case FETCH_START: 
        return {
          loading: true,
          error: "", 
          message: ""
        }
      

      case SHOW_ALERT_MESSAGE: 
        return { ...state, 
            error: "", 
            message: action.payload, 
            loading: false 
        };

      case FETCH_ERROR: 
        return {
          ...state,
          loading: false,
          error: action.payload,
          message: ""
        };
    
      case HIDE_ALERT_MESSAGE: 
        return { ...state, 
            loading: false, 
            error: "", 
            message: "" 
        };
      
        default:
        return state;
    }
  };
  
