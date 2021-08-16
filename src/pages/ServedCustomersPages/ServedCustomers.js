import React, { useState, useEffect } from 'react';
import Title from '../../components/title';
import Headers from '../../components/header'
import { getUserIDFromLocalStore, getTokenFromLocalStore } from '../../utils/Common'
import CustomerItems from './ServedCustomersItems';
import axios from 'axios';
import config from '../../config';

function Served() {
    const [data, setData] = useState([]);

    const userid = getUserIDFromLocalStore();
    const token = getTokenFromLocalStore();
    const getCustomers = () => {

        axios.get(`${config.baseUrl}/visitors/helpedby/${userid}`, {

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

    const customerItems = (props) => {
        //console.log(props)
        if (props.length > 0) {
            return (
                props.map((info) => {
                    return (
                        <CustomerItems data={info} />
                    )
                })
            )
        } else {
            return (
                <div>
                    <h4>Sorry, you don't have any customers as of now</h4>
                </div>
            )
        }
    }

    return (
        <div>
            <Title title="Customers currently serving" />
            <Headers />
            <div class="ui container">
                <h1 class="welcome">Customers currently serving</h1>
                <div class="ui raised segment divided items">
                    {customerItems(data)}
                </div>
            </div>

        </div>
    )
}

export default Served;