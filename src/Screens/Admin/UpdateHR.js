import React, {Fragment, useState, useEffect} from 'react';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import TextField from '../../components/Form/TextField';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlert } from 'react-alert';
import { updateHR } from '../../actions/adminActions';

const UpdateHR = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated} = useSelector(state => state.hrslist);
    const {message, error: hrUpdateError } = useSelector(state => state.common);

    let hrInfo = props?.location?.state?.hr;

    const { _id, firstname, lastname, email, gender, DOB, phone1, mobileNo, consentRole } = hrInfo;

    const [hrId, setHRId] = useState(_id);
    const [hrfirstName, setHRFirstName] = useState(firstname);
    const [hrlastName, setHRLastName] = useState(lastname);
    const [hrEmail, setHREmail] = useState(email);
    const [hrgender, setHRGender] = useState(gender);
    const [hrDOB, setHRDOB] = useState(DOB);
    const [hrphone1, setHRPhone1] = useState(phone1);
    const [hrMobileNo, setHRMobileNo] = useState(mobileNo);
    const [hrConsentRole, setHrConsentRole] = useState(consentRole);

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(hrUpdateError) {
            return alert.error(hrUpdateError);
        }


        if(message){
            alert.success(message);
            props?.history?.push('/hrlist');
        }

    }, [dispatch, error, message, hrUpdateError]);

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
        DOB:Yup.string(),
        mobileNo: Yup.string(),
        phone1: Yup.string(),
        gender: Yup.string().required('Gender is Required')
	  });

      const initialValues = {
        firstname: firstname, 
        lastname: lastname, 
        email: email, 
        DOB: '',
        gender: gender,
        phone1: phone1,
        mobileNo: mobileNo
      }

      const updateHandler = () => {
        dispatch(updateHR(hrId, hrfirstName, hrlastName, hrEmail, hrgender, hrDOB, hrphone1, hrMobileNo, hrConsentRole));
    }

  return <Fragment>
       <MetaData title="Update HR"/>
                <Sidebar />    

            <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                    <h5 style={{color: '#02C39A'}}>
                        <i className='bx bx-edit'></i> <strong>&nbsp;Update Nurse Details </strong>
                    </h5>
                    <hr />
                        
                        <Formik initialValues={initialValues}
                            enableReinitialize={true}
                            validationSchema={validate}
                            onSubmit={updateHandler}
                            >
                        { formik  => (
                            <div>
                                <Form>
                                    <div className="row">
                                        
                                        {/* First Name */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                type="text"
                                                label="First" 
                                                name="firstname"
                                                className='form-control shadow-none'
                                                placeholder="First Name"
                                                value={hrfirstName}
                                                onChange={(e) => setHRFirstName(e.target.value)} 
                                            />
                                        </div>


                                        {/* Last Name */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Last Name"
                                                type="text" 
                                                name="lastname"
                                                className='form-control shadow-none'
                                                placeholder="Last Name"
                                                value={hrlastName}
                                                onChange={(e) => setHRLastName(e.target.value)} 
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <TextField
                                                label="Email"
                                                type="text" 
                                                name="email"
                                                className='form-control shadow-none'
                                                placeholder="Email Address"
                                                value={hrEmail}
                                                onChange={(e) => setHREmail(e.target.value)} 
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="gender" className="form-label mt-3">Gender</label>
                                            <select
                                                label="Gender"
                                                name="gender"
                                                className="form-control"
                                                defaultValue={hrgender}
                                                onChange={(e) => setHRGender(e.target.value)}
                                                >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>  

                                    {/* DOB */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label htmlFor="DOB" className="form-label mt-3">DOB</label>
                                        <input 
                                                label="DOB" 
                                                name="DOB"
                                                className="form-control" 
                                                type="date"
                                                onChange={(e) => setHRDOB(e.target.value)} 
                                        />
                                     </div>

                                     {/* Phone 1 */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Phone 1" 
                                                name="phone1" 
                                                type="text"
                                                value={hrphone1}
                                                onChange={(e) => setHRPhone1(e.target.value)} 
                                        />
                                     </div>

                                     {/* Mobile Number */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Mobile Number" 
                                                name="mobileNo" 
                                                type="text"
                                                value={hrMobileNo}
                                                onChange={(e) => setHRMobileNo(e.target.value)} 
                                        />
                                     </div>

                                     {/* consent Status */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label htmlFor="consentStatus" className="form-label mt-3">Consent Role</label>
                                        <select 
                                            name="consentStatus"
                                            className="form-control" 
                                            value={hrConsentRole}
                                            onChange={e => setHrConsentRole(e.target.value)}
                                        >
                                            <option value="RPM">RPM</option>
                                            <option value="CCM">CCM</option>
                                            <option value="Both">RPM & CCM Both</option>
                                        </select>
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

export default UpdateHR;
