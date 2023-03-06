import React, {Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StaffProtectedRoute = ({isStaff, component: Component, ...rest}) => {
    
    const { isAuthenticated, user } = useSelector(state => state.auth);

    return (
        <Fragment> 
            {user?.role === 'doctor' && isStaff === true ? (
                <Route {...rest} render={props => {
                    
                    if(isAuthenticated === false && isStaff !== true){
                        <Redirect to="/login" />
                    }
                    
                    else if(isStaff === true && isAuthenticated === true){
                        <Redirect to="/doctor/dashboard" />
                    }
                    
                    return <Component {...props} />
                }}
                />
            ) : <Redirect to="/login" /> 
}
        </Fragment>
    )
}

export default StaffProtectedRoute;