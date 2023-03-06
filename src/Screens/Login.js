import React, { Fragment, useEffect } from 'react'
import { Link  } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import Selectbox from '../components/Form/Selectbox';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Spinner, Image } from 'react-bootstrap';
import TDW_logo from '../assets/Images/official_logo.png';
import { login, staffLogin, hrLogin, clearErrors } from '../actions/authActions';
import LoginBackgroundImg from '../assets/Images/login_Background.png';



const Login = ({ history }) => {

	const alert = useAlert();
	const dispatch = useDispatch();

	const {error : loginError } = useSelector(state => state.common);
    
	const validate = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is Required'),
		password: Yup.string() 
		  .min(6, 'Too Short!')
		  .max(20, 'Too Long!')
		  .required('Password is Required'),
		role:Yup.string().required('Select Role')
	  });

	const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);

	useEffect(() => {
		
		if(isAuthenticated === true && user.role === 'admin') {
			history.push("/adminDashboard");
		}

		if(isAuthenticated === true && user.role === 'HrMedical'){
			history.push("/Nurse/Dashboard");
		}

		if(isAuthenticated === true && user.role === 'doctor'){
			history.push("/doctor/dashboard");
		}

		if(error){
			alert.error(error);
			dispatch(clearErrors());
		}

		if(loginError) {
			alert.error(loginError);
		}

	}, [dispatch, alert, isAuthenticated, error, loginError, history])
	
	
	const submitHandler = (values) => {
		if(values.role === 'admin'){
			dispatch(login(values));
		} else if (values.role === 'doctor'){
			dispatch(staffLogin(values));
		} else if(values.role === 'nurse'){
			dispatch(hrLogin(values));
		}	else {
			return
		}	
		// dispatch(login(values));
	}
	
    return (
    	<Fragment>
		<MetaData title="Login" />
		 <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="content">

							<div className="row">
								<div className="col-md-6">
									<Image src={LoginBackgroundImg} height="100%" width="100%" alt="logo"/>		
								</div>

								<div className="col-md-6">
								<div className='row-display'>	
									<Image src={TDW_logo} style={{height:"80px"}} alt="logo"/>		

									<div className="text-center">
										<Link to="/" style={{textDecoration: 'none', 
										color: "#02C39A", fontSize: '18px', marginTop: '10px'}}><small>Home</small></Link>
									</div>
								</div>

								<div className="col-md-12" >
									<br />
									<div>
										<h3 style={{color: '#02C39A'}}>Hello, Welcome Back!</h3>
										<p style={{color: '#999'}}>Login with your data that you entered during your registration.</p>
									</div>
									<Formik initialValues={{
										email: '',
										password: '', 
										role: 'admin'
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
														label="Email Address" 
														name="email" 
														type="email" 
														placeholder="Enter Email"
													/>
	
													<TextField 
														label="Password" 
														name="password" 
														type="password"	
														placeholder="Enter Password"
													/>
	
													<Selectbox 
														label="Select Your Role"
														name="role"
														placeholder="Select Role"
													/>
													
													{/* <Link to="/auth/forgot">
														<span className="forgot-password-link">Forgot Password ?</span>
													</Link> */}
													
													<br/>
													
														{/* <button className="reset-btn" type="reset"><i className='bx bx-reset' ></i></button> */}
														<button className="btn btn-sm btn-info" type="submit">
															{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 
															'Login'}
														</button>
												</Form>
													
											</div>
										)}
									</Formik>											
								</div>

								</div>

							</div>
						</div>
					</div>
				</div>
		</Fragment>
        
    </Fragment>
    )
}

export default Login
