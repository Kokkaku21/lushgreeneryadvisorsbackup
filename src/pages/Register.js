import React, { useState } from 'react';
import Title from "../components/title";
import Helmet from "react-helmet";
import { Link } from "react-router-dom"
import { Label, Form, Button, Checkbox } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { axios } from "axios"

const organisations = [
    {
        key: 'Organisation A',
        text: 'Organisation A',
        value: 'Organisation A'
    },
    {
        key: 'Organisation B',
        text: 'Organisation B',
        value: 'Organisation B'
    },
    {
        key: 'Organisation C',
        text: 'Organisation C',
        value: 'Organisation C'
    },


]

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

function Reggies() {
    const [show, setShow] = useState(false);
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const checkBoxes = contacts.map((contact) => {
        return (
            <Checkbox
                label={contact.text}
            />
        )
    })














   


    return (
        <div class="ui large container">
            <Title title="Register with Lush" />
            <Helmet bodyAttributes={{ style: 'background-color : #ACD1AF' }} />
            <div class="ui container">
                <div class="ui raised container segment">
                    <Form class="ui large form">
                        <h4 class="ui dividing header">Register</h4>
                        <Form.Field required>
                            <label>Full Name</label>
                            <input type="text" name="fullname" placeholder="Full Name"></input>
                        </Form.Field>
                        <Form.Field required>
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username"></input>
                        </Form.Field>
                        <Form.Field required>
                            <label>Email</label>
                            <input type="text" name="email" placeholder="jamesjohan@gmail.com"></input>
                        </Form.Field>
                        <div class="two fields">
                            <Form.Field required>
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Password"></input>
                            </Form.Field>
                            <Form.Field required>
                                <label>Confirm Password</label>
                                <input type="password" name="password" placeholder="Password"></input>
                            </Form.Field>
                        </div>

                        <div class="field">
                            <label>Upload Photo</label>
                            <Button  onClick={handleShow}>Upload Photo</Button>
                        </div>
                        <Form.Field required>
                            <label>Enter your MAS Representative code</label>
                            <input type="text" name="rep_code" placeholder="xxx" pattern="[0-9]*" />
                        </Form.Field>
                        <Form.Field required>
                            <label>Select Your Organisation</label>
                            <Form.Dropdown
                                placeholder="Organisation"
                                options={organisations}
                                selection
                            />
                        </Form.Field>
                        <Form.Field required inline>
                            <label>Choose your Contact Type(s): </label>
                            {checkBoxes}
                        </Form.Field>
                        <div class="inline fields">
                            <Form.Field>
                                <label>WhatsApp</label>
                                <Form.Input type="text" placeholder="xxxxxxxx" pattern="[0-9]*" />
                            </Form.Field>
                            <Form.Field>
                                <label>Mobile</label>
                                <Form.Input type="text" placeholder="xxxxxxxx" />
                            </Form.Field>
                            <Form.Field>
                                <label>Telegram</label>
                                <Form.Input type="text" />
                            </Form.Field>
                            <Form.Field>
                                <label>Zoom ID</label>
                                <Form.Input type="text" />
                            </Form.Field>

                        </div>
                        <Button type="submit" as={Link} to="/success">Submit</Button>
                    </Form>




                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image Here!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p></p>
                    Upload your profile picture here if you have one!
                    <p></p>
                    <div class="ui container center aligned">
                        <input type="file" />
                    </div>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button primary onClick={() => {
                        handleClose();
                    }}>
                        Upload Photo
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Reggies
