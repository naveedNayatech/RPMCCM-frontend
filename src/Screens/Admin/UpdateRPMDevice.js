import React, { useState, Fragment } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/Form/TextField';
import { updateRPMDevice, clearErrors } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';



const UpdateRPMDevice = (props) => {

    let deviceInfo = props?.location?.state?.deviceDetails;

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const {message, error } = useSelector(state => state.common);

    useEffect(() => {
       
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message) {
            alert.success(message);
            props.history.push('/devices');
        }

    }, [dispatch, alert, message, error])

    const { _id, imei, modelNumber, deviceType, broken, firmwareVersion, hardwareVersion} = deviceInfo;

    const [dvcId, setDvcId] = useState(_id);
    const [dvcimei, setDvcimei] = useState(imei);
    const [dvcModelNumber, setDvcModelNumber] = useState(modelNumber);
    const [dvcType, setDvcType] = useState(deviceType);
    const [dvcBroken, setDvcBroken] = useState(broken);
    const [dvcFirmwareVersion, setDvcFirmwareVersion] = useState(firmwareVersion);
    const [dvcHardwareVersion, setDvcHardwareVersion] = useState(hardwareVersion);

    const validate = Yup.object().shape({
		deviceId: Yup.string()
        .required('DeviceID is required')
        .min(6, 'Should be atleast 6 characters')
        .max(20, 'Should be less than 20 characters'),
		imei: Yup.string() 
		  .min(4, 'Should be atleast 4 characters')
		  .max(20, 'Should be less than 20 characters'),
        modelNumber: Yup.string()
        .min(4, 'Should be atleast 6 characters')
        .max(20, 'Should be less than 20 characters')
        .required('Model Number is Required'),  
		deviceType:Yup.string().required('Select Device Type'),
        broken: Yup.boolean(),
        firmwareVersion: Yup.string(),
        hardwareVersion: Yup.string()
	  });

      const initialValues = {
        deviceId: _id, 
        imei: imei, 
        modelNumber: modelNumber, 
        deviceType: deviceType,
        broken: broken,
        firmwareVersion: firmwareVersion,
        hardwareVersion:hardwareVersion
      }

      const updateHandler = () => {
        dispatch(updateRPMDevice(dvcId, dvcimei, dvcModelNumber, dvcType, dvcBroken, dvcFirmwareVersion, dvcHardwareVersion));
    }


  return <Fragment>
        <MetaData title="Update Device"/>
                    <Sidebar />    

                    <section className="home-section">
                    {/* TopBar */}
                    <TopBar />

                    <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                        <div className="home-content">
                            <div className="row-display">
                                <h5 style={{color: '#02C39A'}}>
                                    <i className="bx bx-device"></i> <strong>&nbsp;Edit Device Details </strong>
                                </h5>

                                <div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></button> &nbsp;
                                    <Link to="/adminDashboard" className="btn btn-secondary btn-sm">
                                        <i className='bx bx-home'></i>
                                    </Link> &nbsp;
                                </div>
                            </div>
                            <hr className="blue-hr"/>

                            <Formik initialValues={initialValues}
                            enableReinitialize={true}
                            validationSchema={validate}
                            onSubmit={updateHandler}
                            >
                            { formik  => (
                                <div>
                                    <Form>
                                        <div className="row">
                                            {/* DeviceId */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label htmlFor="deviceId" className="form-label mt-3">DeviceId</label>
                                                <input
                                                    type="text" 
                                                    name="deviceId"
                                                    className='form-control shadow-none'
                                                    placeholder="Device ID"
                                                    value={dvcId}
                                                    disabled
                                                    onChange={(e) => setDvcId(e.target.value)} 
                                                />
                                            </div>

                                            {/* imei */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField  
                                                    label="IMEI" 
                                                    name="imei" 
                                                    type="text" 
                                                    placeholder="IMEI"
                                                    value={dvcimei} 
                                                    onChange={(e) => setDvcimei(e.target.value)}
                                                />
                                            </div>

                                            {/* modelNumber */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Model Number" 
                                                    name="modelNumber" 
                                                    type="text" 
                                                    placeholder="Model Number"
                                                    value={dvcModelNumber} 
                                                    onChange={(e) => setDvcModelNumber(e.target.value)}
                                                />
                                            </div>

                                            {/* deviceType */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label htmlFor="deviceId" className="form-label mt-3">Device Type</label>
                                                <select
                                                        label="Device Type"
                                                        name="deviceType"
                                                        className="form-control"
                                                        defaultValue={dvcType}
                                                        onChange={(e) => setDvcType(e.target.value)}
                                                >
                                                <option value="bp">Cuff</option>
                                                <option value="weight">Weight</option>
                                                <option value="spO2">Spo2</option>  
                                                </select>
                                            </div>

                                            {/* broken */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label htmlFor="deviceId" className="form-label mt-3">Physical Status</label>
                                                <select 
                                                        name="broken"
                                                        className="form-control"
                                                        defaultValue={dvcBroken}
                                                        onChange={(e) => setDvcBroken(e.target.value)}
                                                >
                                                    <option value="false">Unbroken</option>
                                                    <option value="true">Broken</option>
                                                </select>
                                            </div>

                                            {/* firmwareVersion */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Firmware Version" 
                                                    name="firmwareVersion" 
                                                    type="text" 
                                                    placeholder="Firmware Version"
                                                    value={dvcFirmwareVersion} 
                                                    onChange={(e) => setDvcFirmwareVersion(e.target.value)}
                                                />
                                            </div>

                                            {/* hardwareVersion */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Hardware Version" 
                                                    name="hardwareVersion" 
                                                    type="text" 
                                                    placeholder="Hardware Version"
                                                    value={dvcHardwareVersion} 
                                                    onChange={(e) => setDvcHardwareVersion(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="row mr-3" style={{ float: 'right'}}>
                                            <button className="submit-btn ml-3" type="submit" >Update</button>
                                        </div>

                                        <br/><br/><br/>
                                    </Form>
                                </div>
                                )}              
                            </Formik>
                        </div>
                    </div>
        </section>
  </Fragment>;
};

export default UpdateRPMDevice;
