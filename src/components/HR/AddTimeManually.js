    import React, {useState} from 'react';
    import { timeSpentOnPatient } from '../../actions/HRActions';
    import { useDispatch } from 'react-redux';
    import moment from 'moment';
    import {Modal, Button, Form as BootstrapForm} from 'react-bootstrap';
    import {useAlert} from 'react-alert';
    

    const AddTimeManually = ({hrId, patientId, patientCCMNurse, patientRPMNurse}) => {
        const alert = useAlert();
        let minutes;
    
        // Form Fields
        const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
        const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
        const [startTime, setStartTime] = useState(moment().tz("America/New_York").format("HH:mm"));
        const [endTime, setEndTime] = useState(moment().tz("America/New_York").add(4, 'minutes').format("HH:mm"));
        const [isCCM, setIsCCM] = useState(patientCCMNurse === hrId && patientRPMNurse !== hrId ? true : patientCCMNurse !== hrId && patientRPMNurse === hrId ? false : false);
        const [interactiveMinutes, setInteractiveMinutes] = useState(false);
        const [note, setNote] = useState('');
        const [fileName, setFileName] = useState({});
        const [confirmationModal, setConfirmationModal] = useState(false);

        const handleClose = () => setConfirmationModal(false);
        const handleShow = () => setConfirmationModal(true);    


        // Calculating time duration starts
        var timeStart = moment(startTime, 'HH:mm:ss a');
        var timeEnd = moment(endTime, 'HH:mm:ss a');
        var duration = moment.duration(timeEnd.diff(timeStart));
        minutes = parseInt(duration.asMinutes()) % 60;
        // Calculating time duration ends


        const dispatch = useDispatch();  

        const handleFileChange = e => {
            setFileName(e.target.files[0]);
        }

        const handleSubmit = (e) => {
            e.preventDefault();

            if(startDate && endDate && startTime && endTime && note !== "" || undefined){
                handleShow(true);
            }
            // alert.error('Please fill out required fields');
            return
        }


        const submitTimeSpent = () => {
            
            if (fileName.size > 10e6) {
                alert.error("Please upload a file smaller than 10 MB");
                return;
            }
            
            if(minutes > 0 && minutes < 30){
                dispatch(timeSpentOnPatient(patientId, 
                    hrId,
                    startDate, 
                    endDate,
                    startTime,
                    endTime, 
                    isCCM, 
                    interactiveMinutes,
                    minutes,
                    note,
                    fileName
                    ));
                }       
            } 

    return (
        <>
            <div>   
                    <div>    
                        <BootstrapForm>
                            <div className="row">
                                <div className="col-md-6">
                                <label className="form-label mt-3">Start Date</label>
                                    <input type="date" 
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        max={moment().format("YYYY-MM-DD")}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                <label className="form-label mt-3">End Date</label>
                                    <input type="date" 
                                        className="form-control"
                                        defaultValue={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        max={moment().format("YYYY-MM-DD")}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label mt-3">Start Time</label>
                                        <input type="time" 
                                            className="form-control"
                                            value={startTime}
                                            onChange={e => setStartTime(e.target.value)} 
                                            required
                                        />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label mt-3">End Time</label>
                                        <input type="time" 
                                            className="form-control" 
                                            value={endTime}
                                            onChange={e => setEndTime(e.target.value)} 
                                            required
                                        />
                                </div>

                                <i className='bx bx-info-circle pl-2 pt-4 pb-2' style={{fontSize:'26px'}}></i>
                                <p className="pl-3">
                                    By default, start time and end time duration is four minutes
                                </p>
                                <br/>
                                
                            
                                <div className="col-md-6">
                                    <input  
                                        checked={isCCM}
                                        value={isCCM}
                                        onChange={(e) => setIsCCM(e.target.checked)}
                                        type="checkbox"
                                        id="IsCCM"
                                        disabled={patientCCMNurse === hrId && patientRPMNurse !== hrId ? true : patientCCMNurse === hrId && patientRPMNurse === hrId ? false : true}
                                    />
                                    <label htmlFor="IsCCM"> <b>&nbsp;&nbsp;Is CCM ? </b></label>    
                                </div> 
                                
                                <div className="col-md-12">
                                    <label>Note :</label>    
                                    <textarea 
                                        className="form-control" 
                                        rows="4" 
                                        placeholder="Enter notes here ..."
                                        value={note}
                                        onChange={e => setNote(e.target.value)}
                                        >
                                    </textarea>
                                </div>

                               <div className="col-md-12">
                                <br/>     
                                <span>
                                    <input 
                                        label="File" 
                                        name="fileName" 
                                        type="file" 
                                        accept=".doc, .docx, .pdf"
                                        onChange={handleFileChange}
                                    />
                                </span>
                               </div>

                                </div>

                                <br />

                            <div className="row-class" style={{justifyContent: 'space-between'}}>
                                <button className="add-staff-btn ml-3" onClick={handleSubmit}>Submit</button>
                            </div>
                            </BootstrapForm>
                        </div>
                
                    
                    {/* Modal to add interactive minutes */}
                    <Modal show={confirmationModal} onHide={handleClose}>
                        <Modal.Body>
                        <h5 style={{color: '#8FBB2C'}}>
                            <i class='bx bx-bell'></i> <strong>&nbsp;Alert </strong>
                        </h5>
                        <br />

                        <div className="text-center">
                            <p> Are you sure you want to mark this patient as reviewed and add {minutes} minutes ? </p>  
                            
                            <br />
                            <BootstrapForm.Check
                                inline
                                label="Mark as Interactive Minutes "
                                type='checkbox'
                                value={interactiveMinutes}
                                onChange={e => setInteractiveMinutes(e.target.checked)}
                                id='inline-checkbox-1'
                            /> 
                        </div>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button className="add-staff-btn" onClick={submitTimeSpent}>
                            Submit minutes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                </>
            )
        }

        

    export default AddTimeManually