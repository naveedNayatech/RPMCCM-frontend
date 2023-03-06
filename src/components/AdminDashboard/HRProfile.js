import React, { useEffect } from 'react';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import { resetpasswordById } from '../../actions/authActions';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';

const HRProfile = ({ hrprofile }) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, message} = useSelector(state => state.common);

    const validate = Yup.object().shape({
        password: Yup.string()
        .required('Password is Required')
        .min(8, 'password should be 8 characters long')
        .max(20, 'password should be less than 20 characters'),
      });
    

      const submitHandler = (values) => {
        dispatch(resetpasswordById( values.password ,hrprofile._id))
      }

    useEffect(() => {
        if(message){
            alert.success(message);
        }

        if(error){
            alert.error(error)
        }
    }, [message, error])


  return (
    <div className="row">

    <div className="col-md-8">
    {hrprofile && <>
            <br />
        <div className="col-md-12">
            <div className="row">
                <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                <p className="profile-name pl-3 pb-2">HR. {hrprofile?.firstname} {hrprofile?.lastname} <br />
                <small className="profile-value-text pl-3">{hrprofile?.email}</small>
                </p>
            </div>

            <hr />
            <small style={{color: 'dodgerblue'}}>Please type new password.</small>
            <br/><br/>
            <Formik initialValues={{
                password: '',
                }}
                validationSchema={validate}
                onSubmit={values => {
                submitHandler(values)
                }}
                >
                { formik => (
                <div>
                    <Form>
                    <TextField 
                        label="New Password" 
                        name="password" 
                        type="password" 
                        placeholder="New Password"
                    />
                    <small>Password must contain atleast one letter and one number</small>
                    <br/><br/>
                    

                    <div className="row-class" style={{justifyContent: 'space-between'}}>
                        <button className="submit-btn ml-3" type="submit">Reset</button>
                    </div>
                    </Form>
                </div>
                )}
            </Formik>
        <br />
</div>
                            
        </>}
    </div>
    </div>
  )
}

export default HRProfile