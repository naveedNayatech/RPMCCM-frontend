import React, {Fragment, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import { Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { resetpassword } from '../actions/authActions';
import TDW_logo from '../assets/Images/official_logo.png';


const ResetPassword = (props) => {
	
	// function useQuery() {
	// 	return new URLSearchParams(useLocation().search);
	//   }
	  
    // let query = useQuery();
    const queryToken = props?.match?.params?.token;

	console.log('Token is ' + queryToken);

  
    const alert = useAlert();
	const dispatch = useDispatch();
    const {error, message} = useSelector(state => state.common);

    useEffect(() => {
        if(message){
            alert.success(message)
        }

        if(error){
            alert.error(error)
        }
    }, [message, error])


    const validate = Yup.object().shape({
		password: Yup.string()
        .min(8, 'Should be atleast 8 characters')
        .max(20, 'Should be less than 20 characters')
        .required('Password is Required'),
	  });

    const submitHandler = (values) => {
        const { password, confirm_password} = values;
        if(password === confirm_password){
            dispatch(resetpassword(values, queryToken));
        } else {
            alert.error('Passwords not matched');
            return
        }
    }

  return (
    <Fragment>
		<MetaData title="Login" />
		 <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="row content">
						<Image src={TDW_logo} style={{height:"80px"}} alt="logo"/>		
								
							<div className="col-md-12"  >
							<hr/>
							<div>
								<h3 style={{color: '#8FBB2C'}}>Reset Password.</h3>
								<h5 style={{color: '#999'}}>Please enter your new password.</h5>
							</div>
							
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
													placeholder="Enter new password"
												/>

                                                <TextField 
													label="Confirm Password" 
													name="confirm_password" 
													type="password" 
													placeholder="Confirm password"
												/>
												
												<br/><br/>
												

												<div className="row-class" style={{justifyContent: 'space-between'}}>
													<button className="submit-btn ml-3" type="submit">Save</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row-display">
													<Link to="/" style={{textDecoration: 'none'}}><small>TheDoctorWeb.com</small></Link>
													<Link to="/login" style={{textDecoration: 'none'}}><small>Go to Login</small></Link>
												</div>
										</div>
									)}
								</Formik>											
							</div>
						</div>
					</div>
				</div>
		</Fragment>
        
    </Fragment>
  )
}

export default ResetPassword