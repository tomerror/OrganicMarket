import React from 'react';
import Order from '../Order/Order';
import './History.css';

const History = (props) => props.orders.map((order, key) => {
    return <Order order={order} key={key} />
})

export default History;