import React, {useState, useEffect, Fragment} from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { updatePatient } from '../../actions/adminActions';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_PATIENT_RESET} from '../../constants/adminConstants';
import {useAlert} from 'react-alert';
import { Button, Form as CheckboxForm } from 'react-bootstrap';


const EditPatient = (props) => {

const alert = useAlert();
const dispatch = useDispatch();
const history = useHistory();

let patientInfo = props?.location?.state?.patientDetails;

const { _id, emrId, firstname, lastname, email, DOB, gender, phone1, address, city, line2, state, zipCode, ssn, diseases, insurancecompany, patientType} = patientInfo;

const [pEmrId, setEmrId] = useState(emrId);
const [pFirstName, setPFirstName] = useState(firstname);
const [pLastName, setPLastName] = useState(lastname);
const [pEmail, setPEmail] = useState(email);
const [pDOB, setPDOB] = useState(DOB);
const [pGender, setPGender] = useState(gender);
const [pPhone1, setPPhone1] = useState(phone1);
const [pAddress, setPAddress] = useState(address);
const [pCity, setPCity] = useState(city);
const [pLine2, setPLine2] = useState(line2);
const [pState, setPState] = useState(state);
const [pSSN, setPSSN] = useState(ssn);
const [pDiseases, setPDiseases] = useState(diseases);
const [pInsurance, setPInsurance] = useState(insurancecompany);
const [pPatientType, setPPatientType] = useState(patientType);

const { error, isUpdated} = useSelector(state => state.admin);

    useEffect(() => {
        if(error){
            alert.error(error)
        }

        if(isUpdated){
            alert.success('Patient Updated');
            dispatch({ type: UPDATE_PATIENT_RESET});
            props.history.goBack();
        }
    },[error, isUpdated])

const initialValues = {
    deviceId: _id,
    emrId: emrId, 
    firstname: firstname, 
    lastname: lastname, 
    email: email,
    DOB: DOB,
    gender: gender,
    phone1:phone1,
    address:address,
    city:city,
    state:state,
    zipCode: zipCode,
    ssn:ssn,
    diseases:diseases,
    insurancecompany:insurancecompany,
    patientType: patientType,
  }

  const updateHandler = () => {
      dispatch(updatePatient(_id, pEmrId, pFirstName, pLastName, pEmail, pDOB, pGender, pPhone1, pAddress, pCity, pLine2, pState, pSSN, pDiseases, pInsurance, pPatientType));
  }

return (
    <Fragment>
        <MetaData title="Edit Patient"/>
            <Sidebar />    

            <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded-card">
                <div className="home-content">

                <div className="row-display">
                    <div className="col-md-11">
                        <h5 style={{color: '#02C39A'}}>
                            <i className="bx bx-edit"></i> <strong>&nbsp;
                                Edit Details - <span style={{color: '#222'}}>{patientInfo?.firstname} {patientInfo?.lastname} </span>
                             </strong>
                        </h5>
                    </div>

                <Button className="btn btn-secondary" onClick={() => history.goBack()}><i className='bx bx-arrow-back' ></i></Button> &nbsp;
                <Link to="/adminDashboard" className="btn btn-secondary"><i className='bx bx-home'></i></Link> &nbsp;


                </div>

                <hr />

                    
                    <Formik initialValues={initialValues}
                            enableReinitialize={true}
                            // validationSchema={validate}
                            onSubmit={updateHandler}
                    >
                    { formik  => (
                        <div>
                            <Form>
                                <div className="row">

                                    {/* EMR ID */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="firstname" className="form-label mt-3">EMR ID</label>
                                            <input
                                                type="text" 
                                                name="emdId"
                                                className='form-control shadow-none'
                                                placeholder="EMR ID"
                                                value={pEmrId}
                                                onChange={(e) => setEmrId(e.target.value)} 
                                            />
                                    </div>

                                    {/* First Name */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="firstname" className="form-label mt-3">First Name</label>
                                            <input
                                                type="text" 
                                                name="firstname"
                                                className='form-control shadow-none'
                                                placeholder="First Name"
                                                value={pFirstName}
                                                onChange={(e) => setPFirstName(e.target.value)} 
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
                                                value={pLastName}
                                                onChange={(e) => setPLastName(e.target.value)} 
                                            />
                                    </div>

                                    {/* Email Address */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="email" className="form-label mt-3">Email Address</label>
                                            <input
                                                type="text" 
                                                name="email"
                                                className='form-control shadow-none'
                                                placeholder="Email Address"
                                                value={pEmail}
                                                onChange={(e) => setPEmail(e.target.value)} 
                                            />
                                    </div>

                                    {/* DOB */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="dob" className="form-label mt-3">D.O.B</label>
                                            <input
                                                type="date" 
                                                name="dob"
                                                className='form-control shadow-none'
                                                placeholder="D.O.B"
                                                value={pDOB}
                                                onChange={(e) => setPDOB(e.target.value)} 
                                            />
                                    </div>

                                    {/* Gender */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label htmlFor="gender" className="form-label mt-3">Gender</label>
                                            <select
                                                label="Gender"
                                                name="gender"
                                                className="form-control"
                                                defaultValue={pGender}
                                                onChange={(e) => setPGender(e.target.value)}
                                                >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                    </div>

                                    {/* Phone 1 */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="phone1" className="form-label mt-3">Phone 1</label>
                                            <input
                                                type="text" 
                                                name="phone1"
                                                className='form-control shadow-none'
                                                placeholder="Phone 1"
                                                value={pPhone1}
                                                onChange={(e) => setPPhone1(e.target.value)} 
                                            />
                                    </div>

                                    {/* Address */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="address" className="form-label mt-3">Address</label>
                                            <input
                                                type="text" 
                                                name="address"
                                                className='form-control shadow-none'
                                                placeholder="Address"
                                                value={pAddress}
                                                onChange={(e) => setPAddress(e.target.value)} 
                                            />
                                    </div>

                                    {/* City */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="city" className="form-label mt-3">City</label>
                                            <input
                                                type="text" 
                                                name="city"
                                                className='form-control shadow-none'
                                                placeholder="City"
                                                value={pCity}
                                                onChange={(e) => setPCity(e.target.value)} 
                                            />
                                    </div>

                                    {/* Line 2 */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="line2" className="form-label mt-3">Line 2</label>
                                            <input
                                                type="text" 
                                                name="line2"
                                                className='form-control shadow-none'
                                                placeholder="Line 2"
                                                value={pLine2}
                                                onChange={(e) => setPLine2(e.target.value)} 
                                            />
                                    </div>

                                    {/* State */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="state" className="form-label mt-3">State</label>
                                            <input
                                                type="text" 
                                                name="state"
                                                className='form-control shadow-none'
                                                placeholder="State"
                                                value={pState}
                                                onChange={(e) => setPState(e.target.value)} 
                                            />
                                    </div>

                                    {/* SSN */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="ssn" className="form-label mt-3">SSN</label>
                                            <input
                                                type="text" 
                                                name="ssn"
                                                className='form-control shadow-none'
                                                placeholder="SSN"
                                                value={pSSN}
                                                onChange={(e) => setPSSN(e.target.value)} 
                                            />
                                    </div>

                                    {/* Diseases */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="ssn" className="form-label mt-3">Diseases</label>
                                            <input
                                                type="text" 
                                                name="diseases"
                                                className='form-control shadow-none'
                                                placeholder="Diseases"
                                                value={pDiseases}
                                                onChange={(e) => setPDiseases(e.target.value)} 
                                            />
                                    </div>

                                    {/* Insurance Company */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <label htmlFor="insurancecompany" className="form-label mt-3">Insurance Company</label>
                                            <input
                                                type="text" 
                                                name="insurancecompany"
                                                className='form-control shadow-none'
                                                placeholder="Insurance Company"
                                                value={pInsurance}
                                                onChange={(e) => setPInsurance(e.target.value)} 
                                            />
                                    </div>
                                    
                                    {/* isCCM */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label htmlFor="isCCM" className="form-label mt-3">Patient Type</label>
                                        <select
                                            label="isCCM"
                                            name="isCCM"
                                            className="form-control"
                                            defaultValue={pPatientType}
                                            onChange={(e) => setPPatientType(e.target.value)}
                                            >
                                            <option value="RPM">RPM Patient</option>
                                            <option value="CCM">CCM Patient</option>
                                            <option value="Both">RPM & CCM</option>
                                        </select>
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
        </section>
    </Fragment>
  )
}

export default EditPatient