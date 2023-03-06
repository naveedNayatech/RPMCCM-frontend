import React, {Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    
    const { isAuthenticated, user } = useSelector(state => state.auth);

    return (
        <Fragment>

            {user?.role === 'admin' && isAdmin === true ? (
                <Route {...rest} render={props => {
                    
                    if(isAuthenticated === false && isAdmin !== true){
                        <Redirect to="/login" />
                    }
                    
                    else if(isAdmin === true && isAuthenticated === true){
                        <Redirect to="/adminDashboard" />
                    }
                    
                    return <Component {...props} />
                }}
                />
            ) : <Redirect to="/login" /> 
        }
        
        </Fragment>
    )
}

export default ProtectedRoute;