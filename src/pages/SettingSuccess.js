import React, { useState } from 'react';
import Title from '../components/title'
import NavBar from '../components/header'
import { Button, Segment, Grid} from "semantic-ui-react"
import { Link } from 'react-router-dom';

function SettingSuccess() {
    return (
        <div>
            <Title title="Success!" />
            <NavBar />
            <div class="ui container">
                <div class="ui placeholder raised segment">
                    <div class="ui icon header">
                        <i class="check icon" />
                        <h2>Updating Success!</h2>
                        
                        <Button primary as={Link} to="/profile">Return to Profile</Button>

                    </div>
                </div>
            </div>
                
            

        </div>
    )
}

export default SettingSuccess