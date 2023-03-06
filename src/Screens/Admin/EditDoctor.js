import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { updateDoctor, clearErrors } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';


const EditDoctor = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    let doctorInfo = props?.location?.state?.id;

    const {_id, firstname, lastname, gender, DOB, email, phone1, mobileNo, npinumber, licensenumber} = doctorInfo;

    const [docfirstname, setDocFirstName] = useState(firstname);
    const [doclastname, setDocLastName] = useState(lastname);
    const [docDOB, setDocDOB] = useState(DOB);
     const [docemail, setDocEmail] = useState(email);
    const [docgender, setDocGender] = useState(gender); 
    const [docphone1, setDocPhone1] = useState(phone1);
    const [docmobileno, setDocMobileNo] = useState(mobileNo);
    const [docnpi, setDocNpi] = useState(npinumber);
    const [doclicenseNumber, setDocLicenseNumber] = useState(licensenumber);
    
    const {message, error } = useSelector(state => state.common);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message){
            alert.success(message);
            props.history.push('/doctors');
        }
            
    }, [dispatch, error, message]);


    const updateHandler = () => {
        dispatch(updateDoctor(_id, docfirstname, doclastname, docDOB, docemail, docgender, docphone1, docmobileno, docnpi, doclicenseNumber));
    }


    return (
        <Fragment>
            <MetaData title="Edit Doctor"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

              <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card">
                    <div className="home-content">
                        <h5 className="pt-2 mt-2">Update <span style={{color: '#F95800'}}>Dr. {firstname} {lastname} </span></h5>
                        <hr />

                        <Formik initialValues={{ }}
                            enableReinitialize={true}
                            // validationSchema={validate}
                            onSubmit={updateHandler}
                        >

                        { formik  => (
                        <div>
                            <Form>
                            {/* First Name */}
                            <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="firstname" className="form-label mt-3">First Name</label>
                                    <input
                                        type="text" 
                                        name="firstname"
                                        className='form-control shadow-none'
                                        placeholder="First Name"
                                        value={docfirstname}
                                        onChange={(e) => setDocFirstName(e.target.value)} 
                                    />
                            </div>

                            {/* Last Name */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="lastname" className="form-label mt-3">Last Name</label>
                                    <input
                                        type="text" 
                                        name="lastname"
                                        className='form-control shadow-none'
                                        placeholder="Last Name"
                                        value={doclastname}
                                        onChange={(e) => setDocLastName(e.target.value)} 
                                    />
                            </div>

                            {/* Email */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="email" className="form-label mt-3">Email</label>
                                    <input
                                        type="email" 
                                        name="email"
                                        className='form-control shadow-none'
                                        placeholder="Email Address"
                                        value={docemail}
                                        onChange={(e) => setDocEmail(e.target.value)} 
                                    />
                            </div>

                            {/* Gender */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="gender" className="form-label mt-3">Gender</label>
                                <select
                                    label="Gender"
                                    name="gender"
                                    className="form-control"
                                    defaultValue={docgender}
                                    onChange={(e) => setDocGender(e.target.value)}
                                    >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* DOB */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="gender" className="form-label mt-3">DOB</label>
                                <input
                                    type="date"
                                    label="Gender"
                                    name="gender"
                                    className="form-control"
                                    defaultValue={docDOB}
                                    onChange={(e) => setDocDOB(e.target.value)}
                                />
                            </div>

                            {/* Phone1 */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="phone1" className="form-label mt-3">Phone1</label>
                                <input
                                    type="text"
                                    label="phone1"
                                    name="phone1"
                                    className="form-control"
                                    defaultValue={docphone1}
                                    onChange={(e) => setDocPhone1(e.target.value)}
                                />
                            </div>

                            {/* Mobile No */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="mobileno" className="form-label mt-3">Mobile No</label>
                                <input
                                    type="text"
                                    label="mobileno"
                                    name="mobileno"
                                    className="form-control"
                                    defaultValue={docmobileno}
                                    onChange={(e) => setDocMobileNo(e.target.value)}
                                />
                            </div>

                            {/* NPI Number */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="npinumber" className="form-label mt-3">NPI</label>
                                <input
                                    type="text"
                                    label="npinumber"
                                    name="npinumber"
                                    className="form-control"
                                    defaultValue={docnpi}
                                    onChange={(e) => setDocNpi(e.target.value)}
                                />
                            </div>

                            {/* License Number */}
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <label htmlFor="licensenumber" className="form-label mt-3">License Number</label>
                                <input
                                    type="text"
                                    label="licensenumber"
                                    name="licensenumber"
                                    className="form-control"
                                    defaultValue={doclicenseNumber}
                                    onChange={(e) => setDocLicenseNumber(e.target.value)}
                                />
                            </div>
                        </div> 

                        <br/>
                        {/* Buttons */}
                        <div className="row mr-3" style={{ float: 'right'}}>
                            <button className="reset-btn ml-3" type="submit" >Update</button>
                        </div>

                        <br/><br/><br/>
                    </Form>
                </div>
                )}
                </Formik>

                    
                    </div>
                </div>
                </Fragment> 


                </section>
        </Fragment>
    )
}

export default EditDoctor
