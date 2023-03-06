import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import { adminSignup } from '../../actions/authActions';
import { useDispatch} from 'react-redux';



const AddNewAdminForm = ({onHandleClose}) => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);


    const validate = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
		email: Yup.string().email('Invalid email').required('Email is Required'),
		password: Yup.string() 
		  .min(6, 'Too Short!')
		  .max(20, 'Too Long!')
		  .required('Password is Required'),
	  });

    const submitHandler = (values) => {
        dispatch(adminSignup(values));
        onHandleClose(false);
    }

  return (
    <div>
        <Formik initialValues={{
            name: '',
            email: '',
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
                        label="Name" 
                        name="name"  
                        placeholder="Enter Name"
                    />

                    <TextField 
                        label="Email" 
                        name="email" 
                        type="email"	
                        placeholder="Enter Email"
                    />

                    <TextField 
                        label="Password" 
                        name="password" 
                        type={showPassword ? 'text' : 'password'}	
                        placeholder="Enter Password"
                    />             

                    <div className="custom-control custom-checkbox">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="defaultUnchecked"
                            onClick={() => setShowPassword(!showPassword)} 
                            />
                        <label className="custom-control-label" for="defaultUnchecked">Show Password</label>
                    </div>       
                    <br/><hr/>
                    <button className="reset-btn" type="submit">Save</button>
                </Form>
            </div>
            )}
        </Formik>
    </div>
  )
}

export default AddNewAdminForm