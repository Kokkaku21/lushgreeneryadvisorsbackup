import React, { useState } from 'react';
import Title from "../components/title";
import Helmet from "react-helmet";
import { Link } from "react-router-dom"
import { Label, Form, Button, Segment, Header, Icon } from 'semantic-ui-react';

function Succ() {
    return (
        <div class="ui container">
            <Title title="Success!" />
            <Helmet bodyAttributes={{ style: 'background-color : #ACD1AF' }} />
            <div class="ui container">
                <div class="ui placeholder raised segment">
                    <div class="ui icon header">
                        <i class="check icon" />
                        <h2>You have been registered!</h2>
                        <p>Please wait for an email confirmation along your way</p>
                        <Button primary as={Link} to="/login">Return to Login page</Button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Succ;