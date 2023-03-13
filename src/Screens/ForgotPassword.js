import React, {Fragment, useEffect} from 'react';
import { Link  } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { forgotpassword } from '../actions/authActions';
import TDW_logo from '../assets/Images/official_logo.png';
import { Image } from 'react-bootstrap';


const ForgotPassword = ({history}) => {

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
		email: Yup.string().email('Invalid email').required('Email is Required'),
	  });

    const submitHandler = (values) => {
        dispatch(forgotpassword(values));
    }

  return (
    <Fragment>
		<MetaData title="Login" />
		 <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="row content">
							<Image src={TDW_logo} style={{height:"80px"}} alt="logo"/>		
								
							<div className="col-md-12" >
							<br/>
							<div>
								<h3 style={{color: '#8FBB2C'}}>Forgot Password!</h3>
								<h5 style={{color: '#999'}}>Enter email to rest your password.</h5>
							</div>


								<Formik initialValues={{
									email: '',
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
												<br/>

												<div className="row-class" style={{justifyContent: 'space-between'}}>
													<button className="btn btn-outline-primary btn-block btn-sm" type="submit">Send Email</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row" style={{justifyContent: 'space-between'}}>
													<Link to="/" style={{textDecoration: 'none'}}><small>TheDoctorWeb.com</small></Link>
													<small><button className="btn btn-link" style={{textDecoration: 'none', fontSize: '12px'}} onClick={() => history.goBack()}>Go Back</button></small>
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

export default ForgotPassword