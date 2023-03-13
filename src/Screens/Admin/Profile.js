import React, { useState, Fragment, useEffect } from 'react';
import MetaData from '../../layouts/MetaData';
import { Modal, Button } from "react-bootstrap";
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { updatePassword, logout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import profilePic from "../../assets/Images/defaultUser.png";
import { useAlert } from 'react-alert';

const Profile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(state => state.auth);
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [id, setId] = useState(user?._id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseEditModal = () => setShowEditModal(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(email === "" || password === "" || name === ""){
            alert.error('Please fill all fields.');
            handleCloseEditModal();
            return;
        }

         dispatch(updatePassword(id, name, email, password));
      };

    return (
        <Fragment>
            <MetaData title="Profile"/>
                <Sidebar />

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                
                <div className="jumbotron jumbotron-blur-img"></div> 
                  <small style={{
                    backgroundColor: '#8FBB2C',
                    padding: '8px',
                    color: '#FFF'
                  }}>Note: If you update admin details, you need to login again.</small>
                  <div>  

                    
                  <img src={profilePic} className="profile-img" alt="profileimg" />
  
                  <div className="d-flex justify-content-center">
                      <b style={{fontSize: 20, marginTop: 10}}> {user && user.name} - ( Admin ) 
                        <button className="btn btn-danger ml-2"onClick={handleShowEditModal}>
                            <i className='bx bx-edit-alt' data-toggle="tooltip" 
                            data-placement="top" title="Change Password">
                            </i>
                        </button>
                      </b>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                   <span className="profile-value-bottom-border"> <b>Email : </b> {user && user?.email}</span>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                   <span className="profile-value-bottom-border"><b>Role : </b> {user && user.role}</span>
                  </div>

                  <br />
                    <div className="d-flex justify-content-center">
                    <span className="profile-value-bottom-border"><b>Created At : </b>{moment(user?.createdAt).format("lll")}</span>
                    
                  </div>

                  

                <Modal show={showEditModal}>
                <form>
                   <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <label htmlFor="name">Name: </label>
                        <input
                            type="input"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />

                    <label htmlFor="name">Email Address: </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />


                        <label htmlFor="newPassword">Enter New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/*...*/}
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <button className="submit-btn" onClick={onFormSubmit}>Save</button>
                            
                        <Button className="submit-btn" onClick={handleCloseEditModal}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
                </div>
                

               </section>     
        </Fragment>
    )
}

export default Profile
