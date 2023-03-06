import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Modal, Alert } from 'react-bootstrap';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import {useAlert} from 'react-alert';
import { Formik, Form } from 'formik';
import { submitCCMConsent, getPatientCCMConsent, deleteCCMConsent } from '../../actions/HRActions';
import moment from 'moment';
import notFound from '../../assets/Images/notFound.png';



const PatientCCMConsent = ({patientId, isNurse}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  // const {error : commonError, message} = useSelector(state => state.common);
  const {ccmConsent} = useSelector(state => state.patientCCMConsent);

  const [carePlanShow ,setCarePlanShow] = useState(false);
  const [fileName, setFileName] = useState({});
  const [error, setError] = useState('');
  const [type, setType] = useState('Written');
  const [description, setDescription] = useState('');
  
  
  useEffect(() => {
    // if(commonError) {
    //   alert.error(commonError);
    //   dispatch({ type: CCM_CONSENT_RESET})
    // }

    // if(message){
    //   alert.success(message);
    //   dispatch({ type: CCM_CONSENT_RESET})
    // }

    dispatch(getPatientCCMConsent(patientId));

    },[dispatch]);


  const handleCarePlanModalClose = () => setCarePlanShow(false);
  const handleCarePlanModalShow = () => setCarePlanShow(true);


  const handleFileChange = e => {
    setFileName(e.target.files[0]);
  }

  const downloadFile = (fileName) => {
    // local link
    // window.open(`http://localhost:5000/v1/uploadFiles/${fileName}`);
    // live link
    window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
  }



  const submitConsent = () => {

    if(fileName.name === '' || fileName.name === undefined){
      setError('Please attach a file');
      return;
    }

    if(error !== '' || error !== undefined){
      setCarePlanShow(true);
    }

    if(type === "Verbal"){
      if(!description){
        alert.error('Please add description');
        return
      }
    }

    dispatch(submitCCMConsent(fileName, user, patientId, type, description));
       setFileName({});
       setError('');
       setCarePlanShow(false);
    }

  const deleteHandler = (consentId) => {
    var confirmation = window.confirm('Are you sure you want to delete CCM Consent for this patient ?');

    if(confirmation) {
      dispatch(deleteCCMConsent(consentId));
      return;
    }
    return;
  }

  const onOptionChange = e => {
    setType(e.target.value)
  }

  return (
    <div>  
      <div className="row-display">  
        <b>CCM Consent</b>
            {ccmConsent ? <>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteHandler(ccmConsent?._id)}>
                <i className="bx bx-minus mr-2"> Delete </i>
              </button>
            </> : <>
              {isNurse === true ? <>
                <button className="btn btn-sm btn-outline-primary" onClick={handleCarePlanModalShow}> 
                  <i className="bx bx-plus-medical mr-2"> Add Consent  </i>
                </button>
              </> : null}
            </>
            }
      </div> 
      <hr className="white-hr" />

        {ccmConsent ? <>
          <div className="row">
           
          <button className="btn link" 
            onClick={() => downloadFile(ccmConsent?.fileName)}>
              {ccmConsent && ccmConsent?.fileName}
          </button>
        

          <small>
            <p className="pt-3"><b>{ccmConsent && ccmConsent?.type}</b></p>
          </small>
          </div>
          
          {ccmConsent?.type === "Verbal" ? <p>
            {ccmConsent?.description}
          </p> : null}

            <div className="row-display-secondary">
              <div>
                <Image src={doctorIcon} style={{width: '60px', height: '60px'}} />
              </div>

              <div className="pl-2">
                <small><i>Added By:</i></small><br/>
                  <b>{ccmConsent?.addedBy}</b>
                  <p>
                    <small>{moment(ccmConsent?.createdAt).format('MM/DD/YYYY')}</small>
                  </p>
              </div> 
            </div>
        </> : 
        <div className="text-center">
          <img src={notFound} style={{width: '40px', height: '40px'}} alt="not found" />
              <p><small>No records found</small></p>
          </div>
      }      
        

           {/* Add CCM Careplan Modal */}
           <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
            <Modal.Header >
                <h5>
                  Add CCM Consent
                </h5> 
                <button onClick={handleCarePlanModalClose} className="btn btn-danger">
                  <i className='bx bx-x'></i>
                </button>
            </Modal.Header>

                <Modal.Body>
                  <Alert key="danger" variant="danger">
                    Please attach a file
                  </Alert>
                  

                    <Formik initialValues={{ 
                        fileName: ''
                    }}
                    onSubmit={() => {submitConsent()}}>
                        <div>
                            <Form>
                                <input 
                                    label="File" 
                                    name="fileName" 
                                    type="file"
                                    accept=".doc, .docx, .pdf"
                                    className="form-control"
                                    style={{border: 'none'}} 
                                    onChange={handleFileChange}
                                />

                                <br/>

                                <div className="container">
                                  <label className='profile-label'>Select Type</label>
                                  <br/>

                                  <input type="radio" 
                                    id="written" 
                                    name="fav_language" 
                                    value="Written"
                                    checked={type === "Written"}
                                    onChange={onOptionChange}
                                  />
                                   <label for="written">Written</label>

                                  &nbsp;&nbsp;
                                   <input 
                                    type="radio" 
                                    id="verbal" 
                                    name="fav_language" 
                                    value="Verbal"
                                    checked={type === "Verbal"}
                                    onChange={onOptionChange}
                                  />
                                   <label for="verbal">Verbal</label>
                                

                                
                                {type === "Verbal" ? <>
                                <br />
                                   <label className="profile-label">Consent Description</label>
                                  <textarea
                                    name="description" 
                                    className='form-control'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}  
                                    placeholder="Type description ..."
                                    >
                                  </textarea>
                                </> : null}
                                </div>
                                <br />

                            <div className="row-class" style={{justifyContent: 'space-between'}}>
                                <button className="btn btn-outline-primary btn-sm" type="submit"> Save Consent</button>
                            </div>
                            </Form>
                        </div>
                    
                    </Formik>   
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default PatientCCMConsent