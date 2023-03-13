import React, {useEffect, Fragment} from 'react';
import { addHR } from '../../actions/adminActions';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import ConsentRoleSelectBox from '../../components/Form/ConsentRoleSelectBox';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const HRAdd = (props) => {

    const dispatch = useDispatch();
    const {message, error } = useSelector(state => state.common);
    const alert = useAlert();

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(message){
            alert.success(message);
            props?.history?.push('/hrlist');
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
        email: Yup.string().email('Invalid email').required('Email is required'),  
		password: Yup.string()
        .required('Passowrd is required')
        .min(6, 'Minimum 8 characters')
        .max(20, 'Maximum 20 characters')
        .required('Password is Required'),
        DOB:Yup.string().required('DOB is required'),
        mobileNo: Yup.string(),
        phone1: Yup.string(),
        gender: Yup.string().required('Gender is Required')
	  });

      const submitHandler = (values) => {
		dispatch(addHR(values));
    }


  return <Fragment>
      <MetaData title="Add HR"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <div className="row-display">
                        <h5 style={{color: '#8FBB2C'}}>
                            <i className='bx bx-add'></i> <strong>&nbsp;Add New Nurse </strong>
                        </h5>
                        <div className="row-display">
                                <Link to="/hrlist">
                                    <button className="btn btn-secondary">
                                        <i className='bx bx-arrow-back'></i>
                                    </button>
                                </Link>
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
                            DOB: '',
                            email: '',
                            gender: '',
                            password: ''
                        }}
                         validationSchema={validate}
                         onSubmit={values => {
                            submitHandler(values)
                        }}>
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

                                     {/* Consent Role */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <ConsentRoleSelectBox 
                                            label="Consent Role"
                                            name="consentRole"
                                        />
                                    </div>

                                   </div> {/* row ends here*/}

                                   <br/><br/>
                                   {/* Buttons */}
                                   <div className="row mr-3" style={{ float: 'right'}}>
                                        <button className="submit-btn" type="reset">Reset</button>
                                        <button className="submit-btn ml-3" type="submit">Add Nurse</button>
                                    </div>

                                    <br/><br/>

                                </Form>
                            </div>
                        )}
                        </Formik>


                    </div>
                </div>
                </section>
  </Fragment>;
};

export default HRAdd;
