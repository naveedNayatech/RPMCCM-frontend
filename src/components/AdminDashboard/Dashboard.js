import React, { Fragment } from 'react'
import Sidebar from './Sidebar';
import Home from './Home';
import MetaData from '../../layouts/MetaData';

const Dashboard = () => {
    return (
        <Fragment>
            <div className="admindashboardbody">
                <MetaData title="Dashboard" />
                <Sidebar />
                <Home />
            </div>
        </Fragment>
    )
}

export default Dashboard;
