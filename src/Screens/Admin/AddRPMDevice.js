import React, { useEffect, Fragment } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../layouts/MetaData';
import { addRPMDevice } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import TextField from '../../components/Form/TextField';
import DeviceTypeSelectbox from '../../components/Form/DeviceTypeSelectbox';
import BrokenDeviceSelectbox from '../../components/Form/BrokenDeviceSelectbox';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const AddRPMDevice = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const validate = Yup.object().shape({
		_id: Yup.string()
        .required('DeviceID is required')
        .min(6, 'Should be atleast 6 characters')
        .max(20, 'Should be less than 20 characters'),
		imei: Yup.string() 
		  .min(4, 'Should be atleast 4 characters')
		  .max(20, 'Should be less than 20 characters')
          .required('IMEI is required'),
        modelNumber: Yup.string()
        .min(4, 'Should be atleast 6 characters')
        .max(20, 'Should be less than 20 characters')
        .required('Model Number is Required'),  
		deviceType:Yup.string("bp").required('Select Device Type'),
        broken: Yup.boolean().required('Device status is required'),
        firmwareVersion: Yup.string(),
        hardwareVersion: Yup.string()
	  });

    const {message, error } = useSelector(state => state.common);

    useEffect(() => {
       
        if(error){
            alert.error(error);
        }

        if(message) {
            alert.success(message);
            props.history.push('/devices');
        }

    }, [dispatch, message, error])

    
    const submitHandler = (values) => { 
        dispatch(addRPMDevice(values));
    }

    return (
        <Fragment>
            <MetaData title="Add Device"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {/* Header */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        <div className="row-display">
                            {/* <h5 className="pt-2 mt-2">Add <span style={{color: '#F95800'}}>Device </span></h5> */}
                            <h5 style={{color: '#8FBB2C'}}>
                                <i className='bx bx-devices'></i> <strong>&nbsp;Add New Device </strong>
                            </h5>

                            <div className="row-display">
                                <Link to="/adminDashboard">
                                    <button className="btn btn-secondary btn-sm">
                                        <i className='bx bx-arrow-back'></i>
                                    </button>
                                </Link>
                                &nbsp;&nbsp;
                                <Link to="/adminDashboard">
                                    <button className="btn btn-secondary btn-sm">
                                    <i className='bx bxs-home'></i>
                                    </button>
                                </Link>
                            </div>   
                        </div>
                        <hr />
                    
                         <Formik initialValues={{
                             _id: '',
                             imei: '',
                             modelNumber: '',
                             deviceType:'',
                             broken:'' 
                          }}
                         validationSchema={validate}
                         onSubmit={values => {
                            submitHandler(values)
                        }}
                         >   
                            { formik => (
                                <div>
                                    <Form>
                                        <div className="row">
                                            {/* DeviceId */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Device ID" 
                                                    name="_id" 
                                                    type="text" 
                                                    placeholder="Device ID"
                                                />
                                            </div>

                                            {/* imei */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="IMEI" 
                                                    name="imei" 
                                                    type="text" 
                                                    placeholder="Device IMEI"
                                                />
                                            </div>

                                            {/* modelNumber */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Model Number" 
                                                    name="modelNumber" 
                                                    type="text" 
                                                    placeholder="Model Number"
                                                />
                                            </div>

                                            {/* deviceType */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <DeviceTypeSelectbox 
                                                        label="Device Type"
                                                        name="deviceType"
                                                />
                                            </div>

                                            {/* broken */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <BrokenDeviceSelectbox 
                                                        label="Status"
                                                        name="broken"
                                                />
                                            </div>

                                            {/* firmwareVersion */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Firmware Version" 
                                                    name="firmwareVersion" 
                                                    type="text" 
                                                    placeholder="Firmware Version"
                                                />
                                            </div>

                                            {/* hardwareVersion */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                <TextField 
                                                    label="Hardware Version" 
                                                    name="hardwareVersion" 
                                                    type="text" 
                                                    placeholder="Hardware Version"
                                                />
                                            </div>

                                            {/* Empty Div */}
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                
                                            </div>

                                        </div> {/* row ends here */}

                                        
                                        {/* Buttons */}
                                        <div className="row mr-3" style={{ float: 'right'}}>
                                            <button className="btn btn-outline-danger btn-sm" type="reset">Reset</button> &nbsp;&nbsp;
                                            <button className="btn btn-outline-primary btn-sm" type="submit">Add Device</button>
                                        </div>

                                        <br/><br/><br/>
                                    </Form>
                                </div>
                            )}
                         </Formik>    
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default AddRPMDevice;
