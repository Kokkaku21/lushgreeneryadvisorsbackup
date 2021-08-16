import React, { useState, useEffect } from 'react';
import Title from '../../components/title';
import Headers from '../../components/header'
import { Button } from 'semantic-ui-react';
import VisitorItems from './VisitorItems';
import axios from 'axios';
import {getUserIDFromLocalStore, getTokenFromLocalStore} from '../../utils/Common';
import config from '../../config';


function Visitor() {
    const [data, setData] = useState([]);

    const userid = getUserIDFromLocalStore();
    const token = getTokenFromLocalStore();
    const getCustomers = () => {

        axios.get(`${config.baseUrl}/visitors`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
            .then((response) => {
                console.log(response.data[0].visitor_id)
                setData(response.data)
                
            })
            .catch(error => console.log(`Error: ${error}`));
    }
    console.log(data);

    useEffect(() => {
        getCustomers();
    }, [])

    const visitorItems = (props) =>{
        //console.log(props)
        if (props.length > 0) {
            return(
                props.map((info)=>{
                    return(
                        <VisitorItems props={info} userid={userid}/>
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
        <div>
            <Title title="View Customers" />
            <Headers />
            <div class="ui container">
                <h1 class="welcome">View Customers</h1>
                <div class="ui raised segment divided items">
                    {visitorItems(data)}
                </div>
            </div>

        </div>
    )
}

export default Visitor;