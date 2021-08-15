import React, { useState, useEffect } from 'react';
import Title from '../../components/title'
import NavBar from '../../components/header'
import { Row, Col, Container } from 'react-bootstrap'
import DashieCards from './DashieCards';
import axios from "axios";
import {getUsernameFromLocalStore, getUserIDFromLocalStore} from "../../utils/Common";
import config from "../../config"


function Dashie() {
    const username = getUsernameFromLocalStore();
    const [data, setData] = useState([]);
    const id = getUserIDFromLocalStore();
    const GetDashieInfo = () => {

        axios.get(`${config.baseUrl}/customers/${id}`)
            .then((response) => {
                console.log(response.data)
                setData(response.data);

            }).catch(error => console.log(`Error: ${error}`));
    }


    useEffect(() => {
        GetDashieInfo();
    }, [])


    return (
        <div>
            <Title title="Home" />
            <NavBar />
            <div class="ui container">
                <h1 class="welcome">Welcome {username}!</h1>
                <div class="ui container">

                    <h3>Customers Currently Serving</h3>
                    <div class="ui divider"></div>
                    <Row>
                        <Col sm={8}>
                            <div class="ui cards">
                                <DashieCards data={data}/>
                            </div>
                        </Col>
                        <Col>
                            <div class="ui card">
                                <div class="content">
                                    <div class="header">Announcements</div>
                                </div>
                                <div class="content">
                                    <h4 class="ui sub header">No Announcements so far</h4>

                                </div>

                            </div>
                        </Col>
                    </Row>



                </div>
            </div>

        </div>
    )
}

export default Dashie;