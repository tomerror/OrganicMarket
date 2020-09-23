import React from 'react';

const cartContext = React.createContext({
    amount: 0,
    count: 0,
    items: [],
    delivery: 50
})

export default cartContext;