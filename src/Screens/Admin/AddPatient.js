import React, { useEffect, Fragment, useState } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/AdminDashboard/TopBar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { addPatient, getDoctors, getHrLists } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import ConsentRoleSelectBox from '../../components/Form/ConsentRoleSelectBox';


const AddPatient = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { message, error } = useSelector(state => state.common);
    const { doctors } = useSelector(state => state.doctor);
    const { hrs } = useSelector(state => state.hrslist);
    const [doctorId, setDoctorId] = useState('')
    const [hrId, setHrId] = useState('');

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getDoctors());
        dispatch(getHrLists())

        if (message) {
            alert.success(message);
            props?.history.push('/patients');
        }

    }, [dispatch, error, message]);

    const validate = Yup.object().shape({
        firstname: Yup.string()
            .required('First Name is required')
            .min(2, 'Should be atleast 2 characters')
            .max(20, 'Should be less than 20 characters'),
        lastname: Yup.string()
            .min(2, 'Should be atleast 2 characters')
            .max(20, 'Should be less than 20 characters')
            .required('Last Name is Required'),
        email: Yup.string(),
        DOB: Yup.string().required('DOB is required'),
        phone1: Yup.string(),
        gender: Yup.string().required('Gender is required'),
        zipCode: Yup.string().min(2, 'should be atleast two characters').max(10, 'should not br more than ten characters'),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        line2: Yup.string(),
        ssn: Yup.string(),
        insurancecompany: Yup.string(),
        diseases: Yup.string().required('Diseases Required'),
    });

    const submitHandler = (values) => {
        if(doctorId !== '')
        values = {...values,assigned_doctor_id:doctorId}

        if(hrId !== '')
        values = {...values,assigned_hr_id:hrId}

        var count = values.diseases.split(',').length;
        
        if(count < 2 ){
            alert.error('Add atleast two diseases');
            return
        }

        function makeid() {
            var result           = '';
            var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 5; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result = values.firstname + result;
        }

        if(!values.email){
            values.email = makeid()+'@gmail.com';
        }

        dispatch(addPatient(values));
    }

    const assignDr =(dr) =>{
        setDoctorId(dr.value)
    }

    const assignHr =(hr) =>{
        setHrId(hr.value)
    }

    const optionsForDoc = []
    doctors && doctors.map((doc, index) => (
        optionsForDoc.push({ value: doc?._id, label: [doc?.firstname, doc?.lastname].join(" ") })
    ))

    const optionsForHr = []
    hrs && hrs.map((hr, index) => (
        optionsForHr.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ") })
    ))

    return <Fragment>
        <MetaData title="Add Patient" />
        <Sidebar />

        <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{ backgroundColor: '#FAFAFA' }}>
                <div className="home-content">
                    <div className="row-display">
                    <h5 style={{color: '#8FBB2C'}}>
                        <i className="bx bx-user"></i> <strong>&nbsp;Add New Patient </strong>
                    </h5>
                        <div className="row-display">
                            
                                <button className="btn btn-secondary btn-sm" onClick={() => history.goBack()}>
                                    <i className='bx bx-arrow-back'></i>
                                </button>
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
                        firstname: '',
                        lastname: '',
                        DOB: '',
                        gender: ''
                    }}
                        validationSchema={validate}
                        onSubmit={values => {
                            submitHandler(values)
                        }}
                    >
                        {formik => (
                            <div>
                                <Form>
                                    <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                            label="EMR ID" 
                                            name="emrId"  
                                            placeholder="EMR ID (if any)"
                                        />
                                    </div>

                                        {/* First Name */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="First Name"
                                                name="firstname"
                                                type="text"
                                                placeholder="First Name"
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Last Name"
                                                name="lastname"
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>

                                        {/* DOB */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="DOB"
                                                name="DOB"
                                                type="date"
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <GenderSelectbox
                                                label="Gender"
                                                name="gender"
                                            />
                                        </div>

                                        {/* phone1 */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Phone 1"
                                                name="phone1"
                                                type="text"
                                                placeholder="Phone Number"
                                            />
                                        </div>


                                        {/* address */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Address"
                                                name="address"
                                                type="text"
                                                placeholder="Address"
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="City"
                                                name="city"
                                                type="text"
                                                placeholder="City"
                                            />
                                        </div>

                                        {/* State */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="State"
                                                name="state"
                                                type="text"
                                                placeholder="State"
                                            />
                                        </div>

                                        {/* line2 */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Line 2"
                                                name="line2"
                                                type="text"
                                                placeholder="Line 2"
                                            />
                                        </div>

                                        {/* Zip Code */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Zip Code "
                                                name="zipCode"
                                                type="text"
                                                placeholder="Zip Code"
                                            />
                                        </div>

                                        {/* SSN */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="SSN"
                                                name="ssn"
                                                type="text"
                                                placeholder="SSN"
                                            />
                                        </div>

                                        {/* Disease */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Diseases"
                                                name="diseases"
                                                type="text"
                                                placeholder="Diseases"
                                            />
                                        </div>

                                        {/* Insurance Company */}
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <TextField
                                                label="Insurance Company"
                                                name="insurancecompany"
                                                type="text"
                                                placeholder="Insurance Company"
                                            />

                                        </div>

                                        {/* Insurance Company */}
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <label className="form-label mt-3">Select Doctor</label>
                                            <Select
                                                options={optionsForDoc}
                                                onChange={assignDr}
                                            />
                                        </div>

                                        {/* Insurance Company */}
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <label className="form-label mt-3">Select Nurse</label>
                                             <Select
                                                options={optionsForHr}
                                                onChange={assignHr}
                                            />
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <ConsentRoleSelectBox
                                                label="Consent Role"
                                                name="patientType"
                                            />
                                        </div>


                                    </div>{/* row ends here */}

                                    {/* Buttons */}
                                    <br />
                                    <div className="row mr-3" style={{ float: 'right' }}>
                                        <button className="btn btn-outline-danger btn-sm" type="reset">Reset</button> &nbsp;&nbsp;
                                        <button className="btn btn-outline-primary btn-sm" type="submit">Add Patient</button>
                                    </div>

                                    <br /><br /><br />
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>

        </section>
    </Fragment>;
};

export default AddPatient;
