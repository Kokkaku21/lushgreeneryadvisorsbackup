import React, { useState, useEffect } from "react";
import Title from "../../components/title";
import NavBar from "../../components/header"
import { Dropdown, Form, Label, Button, Message } from "semantic-ui-react"
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom"
import axios from "axios";
import { useForm } from "react-hook-form";


const contacts = [
    {
        key: 'WhatsApp',
        text: 'WhatsApp',
        value: 'WhatsApp'
    },
    {
        key: 'Zoom',
        text: 'Zoom',
        value: 'Zoom'
    },
    {
        key: 'Telegram',
        text: 'Telegram',
        value: 'Telegram'
    },
    {
        key: 'Mobile',
        text: 'Mobile',
        value: 'Mobile'
    },
]
const reg = new RegExp('^[0-9]+$')

function ContactSettings() {
    const [show, setShow] = useState(false);

    const [whatsApp, setWhatsApp] = useState("");
    const [tele, setTele] = useState("");
    const [mobile, setMobile] = useState("");
    const [zoom, setZoom] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const [deleteType, setDeleteType] = useState("");
    const [updateType, setUpdateType] = useState(""); //prepare state variable, asking react to begin monitoring the state array
    const [addType, setAddType] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const userid = 3;
    const url = "http://localhost:3030";

    const handleSubmit = function () {
        if (addType != "") {
            handlePostSubmit();
        }
        if (updateType != "") {
            handleUpdateSubmit();
        }
        if (deleteType !="") {
            handleDeleteSubmit();
        }
    }

    const handleUpdateSubmit = function () {
        let details = "Hello"
        if (updateType != "") {
            switch (updateType) {
                case "Mobile":
                    details = mobile;
                    break;
                case "WhatsApp":
                    details = whatsApp;
                    break;
                case "Telegram":
                    details = tele;
                    break;
                case "Zoom":
                    details = zoom;
                    break;
            }
            alert(details)
            axios.put(`${url}/advisors/${userid}/contacts`, { user_contact_type: updateType, contact_details: details }).catch(error => console.log(`Error: ${error}`))
        }
        
    }
    const handlePostSubmit = function () {
        let details = "Hello"
        if (addType != "") {
            switch (addType) {
                case "Mobile":
                    details = mobile;
                    break;
                case "WhatsApp":
                    details = whatsApp;
                    break;
                case "Telegram":
                    details = tele;
                    break;
                case "Zoom":
                    details = zoom;
                    break;
            }
            alert(details)
            axios.post(`${url}/advisors/${userid}/contacts`, { user_contact_type: addType, contact_details: details }).catch(error => console.log(`Error: ${error}`))
        }
        
    }
    const handleDeleteSubmit = function(){
        if (deleteType != "") {
            axios.delete(`${url}/advisors/${userid}/contacts`, {user_contact_type: deleteType}).catch(error => console.log(`Error: ${error}`))
        }
    }

    const handleCheckEmptyForm = function () {
        if(whatsApp != "" || mobile != "") {
            if (reg.test(whatsApp) == false) {
                setErrorMessage("WhatsApp field must only contain numbers!")
            } 
            else{
                if(whatsApp.length != 8){
                    setErrorMessage("WhatsApp field must have 8 numbers (For Singapore Only)!")
                }
                else {
                    setErrorMessage("");
                    handleShow()
                }
            }
            if (reg.test(mobile) == false) {
                setErrorMessage("Mobile field must only contain numbers!")
            } 
            else{
                if(mobile.length != 8){
                    setErrorMessage("Mobile field must have 8 numbers (For Singapore Only)!")
                }
                else {
                    setErrorMessage("");
                    handleShow()
                }
            }
        }
        if (zoom != "" || tele != "") {
            handleShow()
        }
    }


    
    return (
        <div>
            <Title title="Change Contacts" />
            <NavBar />
            <div class="ui container">
                <h1 class="welcome">Change Contacts</h1>
            </div>
            <div class="ui container raised segment">
                <Form class="ui large form">
                    <Form.Field>
                        <label>Update Contact Type Here</label>
                        <Form.Dropdown
                            selection
                            options={contacts}
                            value={updateType}
                            onChange={(e, { value }) => {
                                setUpdateType(value);
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Add Contact Type Here</label>
                        <Form.Dropdown
                            selection
                            options={contacts}
                            value={addType}
                            onChange={(e, { value }) => setAddType(value)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Add/Update Contact Details</label>
                        <div class="inline fields">
                            <Form.Field>

                                <label>WhatsApp</label>
                                <Form.Input type="text" placeholder="xxxxxxxx" name="whatsapp" value={whatsApp} maxLength="8" onChange={e => setWhatsApp(e.target.value)} />
                            </Form.Field>
                            <Form.Field>

                                <label>Mobile</label>
                                <Form.Input type="text" placeholder="xxxxxxxx"  name="mobile" value={mobile} maxLength="8" onChange={e => setMobile(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Telegram</label>
                                <Form.Input type="text" name='tele' value={tele} onChange={e => setTele(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Zoom ID</label>
                                <Form.Input type="text" name='zoom' value={zoom} onChange={e => setZoom(e.target.value)} />
                            </Form.Field>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <label>Delete Contact Type</label>
                        <Form.Dropdown
                            selection
                            options={contacts}
                            value={deleteType}
                            onChange={(e, { value }) => setDeleteType(value)}
                        />
                    </Form.Field>
                    <p></p>
                    {errorMessage && <div><Message color="red">
                        {errorMessage}
                        </Message>
                        </div>}
                        <p></p>
                    <Button color="green" onClick={handleCheckEmptyForm}>Update Contact</Button>
                </Form>
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
                        Do you want to update your contacts now?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="red" onClick={handleClose}>
                            No
                        </Button>
                        <Button primary onClick={() => {
                            handleClose();
                            handleSubmit(); 
                            
                        }}>Yes! Proceed</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export default ContactSettings;