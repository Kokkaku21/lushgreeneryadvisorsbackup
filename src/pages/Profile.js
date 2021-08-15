import React, { useState, useEffect } from "react";
import Title from "../components/title";
import NavBar from "../components/header"
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react"
import { Modal } from "react-bootstrap";
import {AdvancedImage, lazyload} from '@cloudinary/react';
import  {Cloudinary} from "@cloudinary/base";
import Axios from "axios";
import {fill} from "@cloudinary/base/actions/resize";
import config from "../config"
import {getUserIDFromLocalStore, getTokenFromLocalStore} from "../utils/Common"


function Profile() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [repcode, setRepCode] = useState(0);
    const [imageSelected, setImageSelected] = useState("")
    const [contactType, setContactType] = useState([]);
    const [mobiledetails, setMobileDetails] = useState("N/A");
    const [whatsappdetails, setWhatsappDetails] = useState("N/A");
    const [zoomdetails, setZoomDetails] = useState("N/A");
    const [teledetails, setTeleDetails] = useState("N/A");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const userid = getUserIDFromLocalStore();
    

    const cld = new Cloudinary({
        cloud:{
            cloudName:'dbphxknmh',
        }
    })

    const token = getTokenFromLocalStore();
    const getProfileId = function () {
        Axios.get(`${config.baseUrl}}/users/${userid}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then((response)=>{
            console.log(response.data[0]);
            return response.data[0]
        }).then((data)=>{
            console.log(data)

            setName(data.fullname);
            setUsername(data.username);
            setEmail(data.registered_email);
            setOrg(data.org_name);
            setRepCode(data.rep_code);
        })
    }
    useEffect(()=>{
        getProfileId();
    })
    const getContacts = function(){
        Axios.get(`${config.baseUrl}/users/${userid}/contacts`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then((response)=>{
            return response.data
        }).then((data)=>{
            const contactArray = [];
            for (let i = 0; i < data.length; i++) {
                contactArray.push(data[i].user_contact_type);
                if (data[i].user_contact_type == "WhatsApp") {
                    setWhatsappDetails(data[i].contact_details);
                }
                if (data[i].user_contact_type == "Mobile") {
                    setMobileDetails(data[i].contact_details);
                }
                if (data[i].user_contact_type == "Zoom") {
                    setZoomDetails(data[i].contact_details);
                }
                if (data[i].user_contact_type == "Telegram") {
                    setTeleDetails(data[i].contact_details);
                }
            }
            setContactType(contactArray);
            
        })
    }
    useEffect(()=>{
        getContacts();
    })
    console.log(name)
    
    const myImage = cld.image('elsa')
    const uploadImage = (files) =>{
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "upload_to_profile");

        Axios.post("https://api.cloudinary.com/v1_1/dbphxknmh/image/upload", formData).then((result)=>{
            console.log(result);
        })
    }
    

    myImage.resize(fill().width(500).height(500));

    return (
        <div>
            <Title title="Profile" />
            <NavBar />
            <div class="ui container">
                <h1 class="welcome">Profile</h1>
                <div class="ui segment">
                    <div class="ui container center aligned">
                        <h2 class="ui header">{username}</h2>
                        <p></p>
                        <AdvancedImage cldImg={myImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]}/>
                        <p></p>
                        <Button class="ui button" onClick={handleShow}>Change Photo</Button>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui container center aligned">
                        <h4 class="ui header">User Details</h4>
                        <div class="ui text container left aligned">
                            <p>Name: {name}</p>
                            <p>Username: {username}</p>
                            <p>Organisation: {org}</p>
                            <p>MAS Rep Code: {repcode}</p>
                            <p>Email: {email}</p>
                            <p></p>
                        </div>

                        <Button class="ui button" as={Link} to="/settingprofile">Change Details</Button>
                    </div>

                    <div class="ui divider"></div>

                    <div class="ui container center aligned">
                        <h4 class="ui header">Contact Details</h4>
                        <div class="ui text container left aligned">
                            <p>Contact Type(s): {contactType.toString()}</p>
                            <p>Contact Number(Mobile): {mobiledetails}</p>
                            <p>Contact Number(WhatsApp): {whatsappdetails}</p>
                            <p>Telegram Username: {teledetails}</p>
                            <p>Zoom ID: {zoomdetails}</p>
                            <p></p>
                        </div>

                        <p></p>
                        <Button class="ui button" as={Link} to="/contacts">Change Contact</Button>
                    </div>



                </div>

            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image Here!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p></p>
                    Upload your desired image or change your current one if you don't like it.
                    <p></p>
                    <div class="ui container center aligned">
                    <input type="file" onChange={(e)=>{
                        setImageSelected(e.target.files[0])
                    }} />
                    </div>
                    <strong>This is just a static website, you cannot insert pictures yet</strong>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button secondary onClick={()=>{
                        handleClose();
                        setImageSelected="";
                    }}>
                        Don't change
                    </Button>
                    <Button primary onClick={()=>{
                        handleClose();
                        uploadImage();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            




        </div >
    )
}
export default Profile;
