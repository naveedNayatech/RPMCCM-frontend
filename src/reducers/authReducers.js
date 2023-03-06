import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ADMIN_PASSWORD_UPDATE_REQUEST,
    ADMIN_PASSWORD_UPDATE_SUCCESS,
    ADMIN_PASSWORD_UPDATE_FAIL,
    CLEAR_ERRORS,
    STAFF_LOGOUT_SUCCESS,
    STAFF_LOGOUT_FAIL,
    HR_LOGOUT_SUCCESS,
    HR_LOGOUT_FAIL
} from '../constants/authConstants';


export const authReducers = (state = { user: {}, isAuthenticated: false, loading: false}, action) => {
    
    switch(action.type){
    
   case LOGIN_REQUEST: 
    return {
        loading: true,
        isAuthenticated: false,
    }

    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
            // user: action.payload.Admin,
            // token: action.payload.tokens.access.token
        }
    
    case LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload
        }    

    case LOGOUT_SUCCESS: 
    return {
        loading: false,
        isAuthenticated: false,
        user: null
    }   
    
    case LOGOUT_FAIL: 
    return {
        ...state,
        error: action.payload
    }

    // HR LOGOUT CASES STARTS
    case HR_LOGOUT_SUCCESS: 
    return {
        loading: false,
        isAuthenticated: false,
        user: null
    }   
    
    case HR_LOGOUT_FAIL: 
    return {
        ...state,
        error: action.payload
    }
    // HR LOGOUT CASES FAIL

    // STAFF LOGOUT CASES
    case STAFF_LOGOUT_SUCCESS: 
    return {
        loading: false,
        isAuthenticated: false,
        staff: null
    }   
    
    case STAFF_LOGOUT_FAIL: 
    return {
        ...state,
        error: action.payload
    }
    // STAFF LOGOUT CASES ENDS

    case ADMIN_PASSWORD_UPDATE_REQUEST:
        return { 
            loading: true
        }
   
   case ADMIN_PASSWORD_UPDATE_SUCCESS: 
       return { 
           loading: false,
           user: action.payload
       }
       
    case ADMIN_PASSWORD_UPDATE_FAIL: 
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
        return state
    }
}

