import React, {useEffect, Fragment} from 'react';
import HRSidebar from '../../components/HR/HRSidebar';
import HRTopbar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { addPatient } from '../../actions/adminActions';
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import ConsentRoleSelectBox from '../../components/Form/ConsentRoleSelectBox';
import { Link } from 'react-router-dom';


const HRAddPatient = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {message, error } = useSelector(state => state.common);

    useEffect(() => {
        if(error){
            alert.error('Patient Not Added');
            props?.history.push('/Nurse/Patients');
        }

        if(message) {
            alert.success(message);
            props?.history.push('/Nurse/Patients');   
        }

    }, [dispatch, alert, error, message]);


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
		DOB:Yup.string().required('DOB is required'),
        phone1: Yup.string(),
        gender: Yup.string(),
        zipCode:Yup.string(),
        address:Yup.string(),
        city:Yup.string(),
        state:Yup.string(),
        line2: Yup.string(),
        ssn:Yup.string(),
        diseases: Yup.string(),
        insurancecompany: Yup.string(),
	  });

    const submitHandler = (values) => {
        var count = values.diseases.split(',').length;
        
        if(count < 2 ){
            alert.error('Add atleast two diseases');
            return
        }

        dispatch(addPatient(values));
    }


  return <Fragment>
       <MetaData title="My Patients"/>
                <HRSidebar />    

                <section className="home-section">
                {/* TopBar */}
                <HRTopbar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                    <div className="row-display">
                        <h5 style={{color: '#02C39A'}}>
                        <i className="fas fa-user" style={{color: '#ED553B', fontSize: '24px'}}></i>
                            <strong>&nbsp;&nbsp;Add New Patient </strong>
                        </h5>

                        <div className="row-display"> 
                            <Link to="/Nurse/Dashboard" className="btn btn-secondary pt-2"><i className='bx bx-arrow-back'>
                                </i>
                            </Link> &nbsp;     
                        </div>
                    </div>
                    <hr />

                <span className="notes-header p-2 m-2"><b>Note: </b> You can add new patient, but only admin can assigned patient a nurse.</span>

                        <Formik initialValues={{
                             firstname: '',
                             lastname:'',
                             email: '',
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
                                    {/* EMR ID */}
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

                                    {/* Diseases */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Diseases" 
                                                name="diseases" 
                                                type="text" 
                                                placeholder="Diseases"
                                        />
                                    </div>

                                    {/* Insurance Company */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Insurance Company" 
                                                name="insurancecompany" 
                                                type="text" 
                                                placeholder="Insurance Company"
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
                                 <br/>
                                 <div className="row mr-3" style={{ float: 'right'}}>
                                    <button className="btn btn-outline-danger btn-sm" type="reset">Reset</button> &nbsp;&nbsp;
                                    <button className="btn btn-outline-primary btn-sm" type="submit">Add Patient</button>
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
};

export default HRAddPatient;
