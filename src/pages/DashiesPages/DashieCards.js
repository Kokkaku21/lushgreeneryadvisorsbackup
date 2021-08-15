import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function DashieCards(props) {
    const displayCards = (props) => {
        const { data } = props;

        if (data.length > 0) {
            return (
                data.filter((data, index)=> index < 6).map((data) => {
                    return (
                        <div class="card">
                            <div class="content">
                                <div class="header">
                                    {data.fullname}
                                </div>
                                <div class="description">
                                    {data.fullname} has requested for: <strong><p>{data.policy_name}</p></strong>
                                    
                                </div>
                                <div class="extra content">
                                    <Button color="green" floated="right" as={Link} to="/servedcustomers" animated>
                                        <Button.Content visible>
                                            Check
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="arrow right" />
                                        </Button.Content>


                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            return(
                <div>
                    <h4>Sorry, you don't have any customers as of now</h4>
                </div>
            
            )
        }
    }

    return (
       <>
       {displayCards(props)}
       </>
    )
}

export default DashieCards;