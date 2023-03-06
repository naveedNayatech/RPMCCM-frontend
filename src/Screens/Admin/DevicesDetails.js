import React, { useEffect, Fragment } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Button } from 'react-bootstrap';
import RPMDeviceBasicInformation from '../../components/AdminDashboard/RPMDeviceBasicInformation';
import { getDeviceDetails } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../layouts/Loader';
import { Link, useHistory } from 'react-router-dom';


const DevicesDetails = (props) => {

    let deviceId = props?.location?.state?.id;
    const history = useHistory();

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, deviceDetails } = useSelector(state => state.deviceDetails);


    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getDeviceDetails(deviceId));
    }, [dispatch, alert, error]);


    return (
        <Fragment>
            <MetaData title="Device Details" />
            <Sidebar />

            <section className="home-section">
                {/* TopBar */}
                <TopBar />
                {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                        <div className="home-content">
                            <div className="row-display">
                                <h5 className="pt-2">Device Details 
                                    <span style={{ color: '#0044ad' }}>(ID: {deviceId})</span>
                                </h5>

                                <div className="row-display">
                                <Button className="btn btn-secondary" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></Button> &nbsp;
                                <Link to="adminDashboard" className="btn btn-secondary pt-2"><i className='bx bx-home' ></i></Link> &nbsp;
                            </div>
                        </div>


                            <hr />

                            <RPMDeviceBasicInformation deviceData={deviceDetails} />
                        </div>
                    </div>
                </Fragment>}

            </section>
        </Fragment>
    )
}

export default DevicesDetails
