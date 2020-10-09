import React from 'react';
import Item from '../Item/Item';

const Cart = (props) => props.cart.items.map((item, index) => {
    return <Item 
        item={item}
        category={item.category}
        display={item.display}
        image={item.image}
        price={item.price}
        weight={item.weight}
        count={item.count}        
        discount={item.discount}
        inCart={
          props.cart.items.find(x => x.name == item.name) ? 
            props.cart.items.filter(x => x.name == item.name)[0].count : 0
        }
        counterInc={(p) => props.counterInc(p)}
        counterDec={(p) => props.counterDec(p)}
        key={index}
        disable={props.disable}
        />
})

export default Cart;