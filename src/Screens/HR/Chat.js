import React, {useState, useEffect} from 'react';
import HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import {useAlert} from 'react-alert';
import moment from 'moment';
import { getHRPatients, getPatientChat, submitPatientChat } from '../../actions/HRActions';
import patientImg from '../../assets/Images/defaultUser.png';

const Chat = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [text, setText] = useState('');
    const [patientId, setPatientId] = useState('');
    const [activeUser, setActiveUser] = useState('');


    const { user} = useSelector(state => state.auth);
    const {  error, hrpatients} = useSelector(state => state.hrPatients);
    const {loading, chat, error: chatError} = useSelector(state => state.chatHistory);
    const {error:commonError, message} = useSelector(state => state.common);

    
    let id = user._id;

    useEffect(() => {
        if(commonError){
            alert.error(commonError);
        }

        if(message){
            alert.success(message);
        }

        if(error){
            alert.error(error);
        }

        dispatch(getHRPatients(id));

    }, [dispatch, error, message, commonError])

    const getChatHandler = (PatientId) => {
        dispatch(getPatientChat(PatientId, id));
    }

    const submitHandler = () => {
        dispatch(submitPatientChat(patientId, id, text));
        setText('');
    }

  return (
    <>
    <MetaData title="Chat" />
        <HRSidebar />

        <section className="home-section">
            {/* TopBar */}  
            <HRTopBar />
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4 borderedSection">
                    <h5 style={{color: '#8FBB2C'}}>
                        <i className="bx bx-conversation"></i> <strong>&nbsp;Assigned Patients </strong>
                        <p><small style={{paddingTop: '-10px'}}>Start a chat with RPM patients</small></p>

                    </h5>
                    <hr />

                    {hrpatients?.length > 0 ? <>
                        {hrpatients && hrpatients.map((patient, index) => (
                        <div className={`row m-2 ${patientId === patient?._id ? 'activeChat' : null}`} key={index} onClick={() => {setActiveUser(patient?.firstname +" "+ patient?.lastname); setPatientId(patient?._id); getChatHandler(patient?._id)}}>                           
                            <div style={{width: '100%'}}>
                                <img src={patientImg} className="roundedImage" /> 
                                <b className="pl-3">{patient?.firstname + " " + patient?.lastname}</b>
                                <br />
                            </div>
                        </div>    
                        ))}   
                    </> : <>
                       Not Patients assigned. 
                    </>}
                    </div>

                    <div className="col-md-7 borderedSection ml-3">
                        <div>
                            {activeUser ? <>
                                <img src={patientImg} className="roundedImage" /> 
                                <b className="pl-3">{activeUser}</b>
                                <hr />
                                {chat && chat.map((chatHistory, index) => ( 
                                    <div className="bubble bubble-alt" key={index}>                      
                                        <b className="text-white" style={{letterSpacing: '1px'}}> {chatHistory?.nurse_id?.firstname + " " + chatHistory?.nurse_id?.lastname}</b><br/>                  
                                        <p className="mt-1 mr-3">{chatHistory?.message} <br/> 
                                        <p className="mt-1"><b>{moment(chatHistory?.createdAt).tz('America/New_York').format("MM/DD/YYYY")}</b></p>
                                    </p>
                                </div>    
                                ))}
                            </> : <div className="text-center mt-5">
                                Please select patient to start chat.
                                </div>}
                            

                            <div className="chatTextaArea">    
                                <div className="row-display">
                                    <input type="text" 
                                        className="form-control textMessageArea" 
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        placeholder="Type a message"
                                    />

                                    <button className="btn btn-outline-secondary btn-sm ml-1" onClick={submitHandler}>
                                        <i className='bx bx-send'></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>        
        </section>
    </>
  )
}

export default Chat