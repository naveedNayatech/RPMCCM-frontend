import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { Image, Modal, Alert } from 'react-bootstrap';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import {useAlert} from 'react-alert';
import { Formik, Form } from 'formik';
import { submitCCMCareplan, getPatientCCMCareplan, deleteCCMCareplan } from '../../actions/HRActions';
import moment from 'moment';
import notFound from '../../assets/Images/notFound.png';

// import { CCM_CAREPLAN_RESET } from '../../constants/HRConstants';


const PatientCareplans = ({ patientId }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [carePlanShow ,setCarePlanShow] = useState(false);
  const [fileName, setFileName] = useState({});
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  // const {error : commonError, message} = useSelector(state => state.common);
  const { ccmCareplan } = useSelector(state => state.patientCCMCareplan);
  const { user } = useSelector(state => state.auth);

  const downloadFile = (fileName) => {
    // local link
    // window.open(`http://localhost:5000/v1/uploadFiles/${fileName}`);
    // live link
    window.open(`https://vitalsportal.com/v1/uploadFiles/${fileName}`);
  }

  const handleCarePlanModalClose = () => setCarePlanShow(false);
  const handleCarePlanModalShow = () => setCarePlanShow(true);

  useEffect(() => {
    // if(commonError) {
    //   alert.error(commonError);
    //   dispatch({ type: CCM_CAREPLAN_RESET})
    // }

    // if(message){
    //   alert.success(message);
    //   dispatch({ type: CCM_CAREPLAN_RESET})
    // }

    dispatch(getPatientCCMCareplan(patientId));

    },[dispatch]);


  const handleFileChange = e => {
    setFileName(e.target.files[0]);
  }

  const submitCarePlan = () => {
    if(description === '' && fileName.name === undefined){
      setError('description and file required.');
      return;
    }

    if(error !== '' || error !== undefined){
      setCarePlanShow(true);
    }

    dispatch(submitCCMCareplan(fileName, user, patientId, description));
      setFileName({});
       setError('');
       setCarePlanShow(false);
  }

  const deleteHandler = (careplanId) => {
    var confirmation = window.confirm(`Are you sure you want to delete patient CCM careplan ?`);
        if(confirmation){
          dispatch(deleteCCMCareplan(careplanId));
        }
    }

  return (
    <div>
        <div className="row-display">
          <b>CCM Careplan</b>
            {ccmCareplan ? <>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteHandler(ccmCareplan?._id)}>
                <i className="bx bx-minus mr-2"></i> Delete
              </button> 
            </> : <>
            <button className="btn btn-sm btn-outline-primary" onClick={handleCarePlanModalShow}> 
              <i className="bx bx-plus-medical mr-2"></i> Add CCM Careplan
            </button>
            </>
            }   
        </div>

        <hr className="white-hr" />

        {ccmCareplan ? <>
          <div className="row">
            <button className="btn link" onClick={() => downloadFile(ccmCareplan?.fileName)}>
              {ccmCareplan?.fileName}
            </button>
          </div>
        
          <p>
            <small>{ccmCareplan?.description}</small>
          </p>
         
          <div className="row-display-secondary">
            <div>
              <Image src={doctorIcon} style={{width: '60px', height: '60px'}} />
            </div>

             <div className="pl-2 m-2">
              <small><i>Added By:</i></small><br/>
                <b>{ccmCareplan?.addedBy}</b>
                <p>{moment(ccmCareplan?.createdAt).format('MM/DD/YYYY')}</p>
             </div> 
          </div>        
        </> : <>
        <div className="text-center">
          <img src={notFound} style={{width: '40px', height: '40px'}} alt="not found" />
              <p><small>No records found</small></p>
          </div>
        </>}    
        

          {/* Add CCM Careplan Modal */}
          <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
            <Modal.Header >
                <h5>
                  Add CCM Careplan
                </h5> 
                <button onClick={handleCarePlanModalClose} className="btn btn-danger">
                  <i className='bx bx-x'></i>
                </button>
            </Modal.Header>

                <Modal.Body>
                    <Formik initialValues={{
                        description: '', 
                        fileName: ''
                    }}
                    onSubmit={() => {submitCarePlan()}}>
                        <div>
                          {error && <>
                            <Alert key="danger" variant="danger">
                              {error}
                            </Alert>
                          </>}
                          

                            <Form>                       
                            <label htmlFor="description" className="form-label mt-3">Description</label>
                                <textarea 
                                    label="Description" 
                                    name="description"
                                    className="form-control"
                                    rows="4"	
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type description here .... "
                                />
                                
                                <br />
                            <label htmlFor="description" className="form-label mt-3">Attachment</label>
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
                            <div className="row-class" style={{justifyContent: 'space-between'}}>
                                <button className="btn btn-outline-primary btn-sm" type="submit"> Save Careplan</button>
                            </div>
                            </Form>
                        </div>
                    
                    </Formik>   
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default PatientCareplans