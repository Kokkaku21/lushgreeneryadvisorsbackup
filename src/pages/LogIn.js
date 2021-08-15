import React, { useState } from 'react';
import Title from "../components/title";
import Helmet from "react-helmet";
import { Link, useHistory } from "react-router-dom"
import { Form, Button, Message } from "semantic-ui-react"
import axios from 'axios';
import {saveUserDataToLocalStorage} from '../utils/Common'


function Login() {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const url = "http://localhost:3030";

    const onSubmit = function () {
        axios.post(`${url}/users/login`, { username: username, password: password }).then(response => {
            console.log(response.data.token);
            console.log(response.data.user_id);
            console.log(response.data.username);
            saveUserDataToLocalStorage(response.data.token, response.data.username, response.data.user_id)
            history.push('/home')
        })
    }


    return (
        <div class="ui container">
            <Title title="Welcome!" />
            <Helmet bodyAttributes={{ style: 'background-color : #ACD1AF' }} />
            <div class="ui large container center aligned grid">
                <div class="column">


                    <h2>
                        <div class="content" id="headlogin" style={{ color: "white" }}>Lush Greenery For Financial Advisors</div>
                    </h2>

                    <Form class="ui large form">
                        <div class="ui raised segment">
                            <h4 class="ui left floated">Login</h4>
                            <Form.Field>
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                                </div>

                            </Form.Field>
                            <Form.Field>
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input >
                                </div>
                            </Form.Field>


                        </div>
                        <Form.Field class="ui large container center aligned grid">
                            <Button color="teal" floated="left" onClick={()=>{
                                onSubmit()
                            }}>
                                <div class="visible content">Login!</div>
                            </Button>
                            <Button color="green" floated="right" animated>
                                <div class="visible content">Register!</div>
                                <div class="hidden content">
                                    <i class="right arrow icon"></i>
                                </div>
                            </Button>
                        </Form.Field>
                    </Form>




                </div>
            </div>


        </div>
    )
}

export default Login