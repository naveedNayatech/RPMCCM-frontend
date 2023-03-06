import React, {Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HRProtectedRoute = ({isHR, component: Component, ...rest}) => {
    
	const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    return (
        <Fragment> 
            {user?.role === 'HrMedical' && isHR === true ? (
                <Route {...rest} render={props => {
                    
                    if(isAuthenticated === false && isHR !== true){
                        <Redirect to="/login" />
                    }
                    
                    else if(isHR === true && isAuthenticated === true){
                        <Redirect to="/Nurse/Dashboard" />
                    }
                    
                    return <Component {...props} />
                }}
                />
            ) : <Redirect to="/login" /> 
}
        </Fragment>
    )
}

export default HRProtectedRoute;