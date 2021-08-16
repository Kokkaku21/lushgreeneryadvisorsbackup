import React, { useState } from "react";
import Title from "../components/title";
import NavBar from "../components/header"
import { Form, Button, Message } from "semantic-ui-react"
import { Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import config from "../config";
import {getTokenFromLocalStore, getUserIDFromLocalStore} from "../utils/Common"

const validator = require('validator');

function SettingsProfile() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userid = getUserIDFromLocalStore();

    const handleUpdateSubmit = function () {
        if (email != "") {
            axios.put(`${config.baseUrl}/users/email/${userid}`, { registered_email: email })
            .catch(error => console.log(`Error: ${error}`))
        }
        if (password != "") {
            axios.put(`${config.baseUrl}/users/password/${userid}`, {password: password})
        }
    }
    

    const handleFormValidation = function () {
        if (password != "") {
            if (confirmPassword == "") {
                setErrorMessage("Enter the confirm password field!")
            } else{
                if (password !== confirmPassword) {
                    setErrorMessage("Password must be the same!")
                }else{
                    setErrorMessage("")
                    handleShow();
                }
            }
            
        }
        if (email != "") {
            if (validator.isEmail(email) == false) {
                setErrorMessage("Must enter correct email!")
            } else {
                setErrorMessage("")
                handleShow();
            }
        }
    }



    return (
        <div>
            <Title title="Change Profile" />
            <NavBar />
            <div class="ui container">
                <h1 class="welcome">Change Profile</h1>
            </div>
            <div class="ui container raised segment">
                <Form class="ui form">
                    <Form.Field>
                        <label>Change Email</label>
                        <input type="text" name="email" placeholder="jamesjohan@gmail.com"
                            value={email} onChange={e => setEmail(e.target.value)}
                        ></input>
                    </Form.Field>
                    <div class="two fields">
                        <Form.Field>
                            <label>Update Password</label>
                            <input type="password" name="password" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)}
                            ></input>
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm Password</label>
                            <input type="password" name="password" placeholder="Password"
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>

                        </Form.Field>
                        
                    </div>
                    {errorMessage && <div><Message color="red">
                        {errorMessage}
                        </Message>
                        </div>}
                        <p></p>
                    <Button color="green" onClick={handleFormValidation}>Update Profile</Button>
                </Form>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Wait!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to update your profile now?
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        No
                    </Button>
                    <Button primary onClick={handleUpdateSubmit} as={Link} to="/settingsuccess">Yes! Proceed</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SettingsProfile;
