import React from 'react';
import Item from '../Item/Item';

const Items = (props) => props.items.map((item, index) => {
    return <Item 
        category={item.category}
        display={item.display}
        image={item.image}
        price={item.price}
        weight='1'
        count='1'
        supply={item.supply}
        inCart= {item.supply}
        discount={item.discount}
        show={item.show}
        counterInc={(p) => props.counterInc(p)}
        counterDec={(p) => props.counterDec(p)}
        key={index}
        disable={props.disable}
        panel={props.panel}
        iconFunc1={(s) => props.iconFunc1(s)}
        iconFunc2={(s) => props.iconFunc2(s)}
        />
})

export default Items;