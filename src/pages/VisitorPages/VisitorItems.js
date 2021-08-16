import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Modal } from "react-bootstrap";
import axios from 'axios';
import {getTokenFromLocalStore} from "../../utils/Common"
import config from "../../config"

function VisitorItems({props, userid}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [contacts, setContacts] = useState([]);
    const [mobiledetails, setMobileDetails] = useState("N/A");
    const [whatsappdetails, setWhatsappDetails] = useState("N/A");
    const [zoomdetails, setZoomDetails] = useState("No");
    const [teledetails, setTeleDetails] = useState("N/A");


    const visitorid = props.visitor_id
    console.log(visitorid)
    const token = getTokenFromLocalStore()
    const getCustomersContacts = () => {

        axios.get(`${config.baseUrl}/visitors/contacts/${visitorid}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
            .then((response) => {
                console.log(response.data)
                return response.data;
            })
            .then((data) => {
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
    console.log(userid)

    const handleUpdate = () =>{
        axios.put(`${config.baseUrl}/users/help/${visitorid}`, {helped_by: userid})
        .catch(error => console.log(`Error: ${error}`));
    }
    useEffect(() => {
        getCustomersContacts();
    }, [])



    return (

        <div class="item">
            <div class="content">
                <i class="user icon"></i>
                
                <div class="header">{props.fullname}</div>
                <div class="description">
                    <p>{props.fullname} has requested for {props.policy_name}</p>
                    <p>Email: {props.email} </p>
                    <p>Prefered contacts: {contacts.toString()}</p>
                    <p>Mobile: {mobiledetails}, WhatsApp: {whatsappdetails}, Telegram ID: {teledetails}, Zoom: {zoomdetails}</p>
                </div>
                <div className="extra">
                    {props.requested_help_on}
                </div>

                <div class="extra">
                    <Button color="green" onClick={handleShow}>Accept</Button>
                </div>

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
                    Are you sure you want to take on this customer's request?
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        No
                    </Button>
                    <Button primary onClick={()=>{
                        handleClose();
                        handleUpdate();
                    }}>Yes! Proceed</Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}

export default VisitorItems;