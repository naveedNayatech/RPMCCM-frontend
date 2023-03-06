import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { getAdmins, deleteAdminAccount, clearErrors } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import AddNewAdminForm from '../../components/Form/AddNewAdminForm';
import ReactTooltip from "react-tooltip";

const Admins = () => {

    const [smShow, setSmShow] = useState(false); //small confirm modal

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, admins } = useSelector(state => state.adminsList);
    const { user } = useSelector(state => state.auth);
    const {message, error: adminError } = useSelector(state => state.common);

    const id = user?._id;

    useEffect(() =>{
        if(message){
            alert.success(message);
            clearErrors();
        }

        if(error){
            alert.error(error);
            clearErrors();
        }

        if(adminError){
            alert.error(adminError);
            clearErrors();
        }

        dispatch(getAdmins());
    }, [dispatch, message, error, adminError]);

    const deleteHandler = (id) => {
        var confirmation = window.confirm(`Are you sure you want to delete this admin ?`);
        if(confirmation == true){
            dispatch(deleteAdminAccount(id));
            return;
        }
    }

  return (
    <>
        <MetaData title="Admins"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card">
                    <div className="home-content">
                        <div className="row-display">
                        <h5 style={{color: '#02C39A'}}>
                            <i className="bx bx-user"></i> <strong>&nbsp;Admins </strong>
                        </h5>
                            <span className="manage_logs_btn" onClick={() => setSmShow(true)}> 
                                <i className='bx bx-user'></i> Add New Admin</span>
                            </div>
                        <hr />

                        {loading ? <Loader /> : ( 
                            <>
                            <div className="row">
                            {admins && admins.map((admin, index) => ( 
                            <>
                                <div className="col-md-3" key={index}>
                                    <div className="card card-bordered-01 mt-4">
                                        <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />
                                        
                                        <b className="mt-3">{admin.name}  </b>
                                        <Link to="/admins" className="link" style={{marginLeft: "10%", fontSize: "14px", marginTop: "7px", wordWrap: 'break-word'}}>{admin.email}</Link>
                                        
                                        <small className="mt-3"> <span style={{ 
                                            backgroundColor: '#02C39A',
                                            color: '#FFF',
                                            padding: '5px', 
                                            borderRadius: '5px'
                                        }}>Admin</span></small>

                                        <span className="text-center mt-2"><small><b>Account Created At: </b></small></span>                                    
                                        <span className="text-center "><small>{moment(admin.createdAt).format("lll")}</small></span>
                                        
                                        <hr/>

                                        <ReactTooltip id="cannotdelete" type="dark" effect="solid">
                                                    You cannot delete your own account
                                        </ReactTooltip>

                                        <div className="text-center">
                                            {admin?._id === id ? <>
                                            <button className="btn btn-danger btn-sm m-2" data-tip data-for="cannotdelete">
                                                <i className="bx bx-trash" style={{opacity: 0.6}}> Delete Account</i>
                                            </button>
                                            </> : <>
                                            <button className="btn btn-danger btn-sm m-2" 
                                                    onClick={() => deleteHandler(admin?._id)}
                                                >
                                                <i className="bx bx-trash"> Delete-Account</i>
                                            </button>
                                            </>}
                                            
                                        </div>

                                    </div>
                                </div>
                            </>
                            ))}
                           </div>
                          </>
                        )}
                        {/* admin cards */}
                    </div>
                </div>
                
                {/* Add new admin form component */}
                    <Modal
                        size="md"
                        show={smShow}
                        onHide={() => setSmShow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header>
                            Add New Admin
                        </Modal.Header>
                        
                        <Modal.Body>
                            <AddNewAdminForm onHandleClose={setSmShow} />  
                        </Modal.Body>
                    </Modal>  
                </section>
                {/* Add new admin form component */}
    </>
  )
}

export default Admins