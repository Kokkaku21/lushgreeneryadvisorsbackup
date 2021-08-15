import React, { useState,useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Modal } from "react-bootstrap";
import axios from 'axios';
import config from '../../config';

function CustomerItems(data) {
    const [buttonChange, setButtonChange] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [contacts, setContacts] = useState([]);
    const [mobiledetails, setMobileDetails] = useState("N/A");
    const [whatsappdetails, setWhatsappDetails] = useState("N/A");
    const [zoomdetails, setZoomDetails] = useState("No");
    const [teledetails, setTeleDetails] = useState("N/A");




    const visitorid = data.data.visitor_id
    const getCustomersContacts = () => {

        axios.get(`${config.baseUrl}/visitors/${visitorid}/contacts`)
            .then((response) => {
                console.log(response.data)
                return response.data;
            })
            .then((data)=>{
                const contactArray = [];
                for (let i = 0; i < data.length; i++) {
                    contactArray.push(data[i].visitor_contact_type);
                    console.log(data[i].contact_details)
                    if (data[i].visitor_contact_type === "WhatsApp") {
                        setWhatsappDetails(data[i].contact_details);
                    }
                    if (data[i].visitor_contact_type === "Mobile") {
                        setMobileDetails(data[i].contact_details);
                    }
                    if (data[i].visitor_contact_type === "Zoom") {
                        setZoomDetails("Yes");
                    }
                    if (data[i].visitor_contact_type === "Telegram") {
                        setTeleDetails(data[i].contact_details);
                    }
                }
                setContacts(contactArray);
            })
            .catch(error => console.log(`Error: ${error}`));
    }
    
    const handleResolved=() =>{
        axios.put(`${config.baseUrl}/users/resolved/${visitorid}`, {resolved: "Yes"}).catch(error => console.log(`Error: ${error}`));
    }
    useEffect(() => {
        getCustomersContacts();
    }, [])

  


    

    const resolveButton = (
        <div class="extra">
            <Button.Group>
                <Button color="green" onClick={handleShow}>Resolved</Button>
                <Button.Or />
                <Button color="red" onClick={() => setButtonChange(false)} >Not Resolved</Button>
            </Button.Group>

        </div>

    )
    const acceptButton = (
        <div class="extra">
            <Button color="green" onClick={() => setButtonChange(true)}>Resolve</Button>
        </div>
    )

    
    return (

        <div class="item">
            <div class="content">
                <i class="user icon"></i>
                <div class="header">{data.data.fullname}</div>
                <div class="description">
                    <p>{data.data.fullname} has requested for {data.data.policy_name}</p>
                    <p>Email: {data.data.email} </p>
                    <p>Prefered contacts: {contacts.toString()}</p>
                    <p>Mobile: {mobiledetails}, WhatsApp: {whatsappdetails}, Telegram ID: {teledetails}, Zoom: {zoomdetails}</p>
                </div>
                <div className="extra">
                {data.data.requested_help_on}
                </div>

                {buttonChange ? resolveButton : acceptButton}

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
                    Are you sure this customer's request has been resolved?
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        No
                    </Button>
                    <Button primary onClick={()=>{
                        handleClose();
                        handleResolved();
                    }}>Yes! Proceed</Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}

export default CustomerItems;
