import React, { useState } from 'react';
import Title from '../components/title'
import NavBar from '../components/header'
import { Button, Segment, Grid} from "semantic-ui-react"
import { Link } from 'react-router-dom';

function Setting() {
    return (
        <div>
            <Title title="Settings" />
            <NavBar />
            <div class="ui container">
                <h1 class="welcome">Settings</h1>
                <div class="ui container">
                    <Segment placeholder>
                        <Grid columns={2} stackable textAlign='center'>
                            <div class="ui vertical divider">Or</div>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                    <div class="ui icon header">
                                        <i class="address book icon"></i>
                                        Change Contacts

                                    </div>
                                    <Button primary animated color='google plus' as={Link} to="/contacts">
                                        <div class="visible content">Change Contacts</div>
                                        <div class="hidden content">
                                            <i class="right arrow icon"></i>
                                        </div>
                                    </Button>
                                </Grid.Column>

                                <Grid.Column>
                                    <div class="ui icon header">
                                        <i class="user icon"></i>
                                        Change Profile
                                    </div>
                                    <Button primary animated color='google plus' as={Link} to="/settingprofile">
                                        <div class="visible content">Change Profile</div>
                                        <div class="hidden content">
                                            <i class="right arrow icon"></i>
                                        </div>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>


                    </Segment>

                </div>
            </div>

        </div>
    )
}

export default Setting