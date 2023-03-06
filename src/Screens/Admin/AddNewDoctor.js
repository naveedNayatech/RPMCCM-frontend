import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import  'react-multiple-select-dropdown-lite/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor, clearErrors } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';



const AddNewDoctor = () => { 

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();


    const {message, error } = useSelector(state => state.common);

    const validate = Yup.object().shape({
		firstname: Yup.string()
        .required('First Name is required')
        .min(2, 'Should be atleast 2 characters')
        .max(20, 'Should be less than 20 characters'),
		lastname: Yup.string() 
		  .min(2, 'Should be atleast 2 characters')
		  .max(20, 'Should be less than 20 characters')
		  .required('Last Name is Required'),
        email: Yup.string().email('Invalid email').required('Email is required'),  
		password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .max(20, 'Maximum 20 characters')
        .required('Password is Required'),
        DOB:Yup.string().required('DOB is required'),
        mobileNo: Yup.string(),
        phone1: Yup.string(),
        gender: Yup.string().required('Gender is required'),
        npinumber: Yup.string(),
        licensenumber: Yup.string()
	  });


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

    if(message){
        alert.success(message);
        history.push('/doctors');
    }

}, [dispatch, alert, error, message, history]);

    const submitHandler = (values) => {
		dispatch(addDoctor(values));
    }

    return (
        <Fragment>
            <MetaData title="Add Doctor"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />


                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <div className="row-display">
                            
                        <h5 style={{color: '#02C39A'}}>
                            <i className="bx bx-user"></i> <strong>&nbsp;Add New Doctor </strong>
                        </h5>

                            <div className="row-display">
                                    <button className="btn btn-secondary" onClick={() => history.goBack()}>
                                        <i className='bx bx-arrow-back'></i>
                                    </button>
                                &nbsp;&nbsp;
                                <Link to="/adminDashboard">
                                    <button className="btn btn-secondary">
                                        <i className='bx bxs-home'></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <hr />

                        <Formik initialValues={{ 
                            firstname: '',
                            lastname: '',
                            email: '',
                            gender:'',
                            password:'',
                            DOB: '' 
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

                                     {/* Gender */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <GenderSelectbox 
                                        label="Gender"
                                        name="gender"
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

                                     {/* Email */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Email" 
                                             name="email" 
                                             type="email" 
                                             placeholder="Email Address"
                                         />
                                     </div>

                                     {/* Password */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Password" 
                                             name="password" 
                                             type="text" 
                                             placeholder="Password"
                                         />
                                     </div>

                                     {/* Phone1 */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Phone 1" 
                                             name="phone1" 
                                             type="text" 
                                             placeholder="Phone 1"
                                         />
                                     </div>

                                     {/* Mobile Number */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Mobile Number" 
                                             name="mobileNo" 
                                             type="text" 
                                             placeholder="Mobile Number"
                                         />
                                     </div>

                                    {/* NPI Number */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <TextField 
                                            label="NPI Number" 
                                            name="npinumber" 
                                            type="text"
                                            placeholder="NPI Number" 
                                        />
                                    </div>

                                     {/* license Number */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="license Number" 
                                             name="licensenumber" 
                                             type="text" 
                                             placeholder="License Number"
                                         />
                                     </div>


                                    </div> {/* row ends here */}

                                    {/* Buttons */}
                                    <div className="row mr-3" style={{ float: 'right'}}>
                                        <button className="btn btn-outline-danger btn-sm" type="reset">Reset</button> &nbsp;&nbsp;
                                        <button className="btn btn-outline-primary btn-sm" type="submit">Add Doctor</button>
                                    </div>

                                    <br/><br/>
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

export default AddNewDoctor
