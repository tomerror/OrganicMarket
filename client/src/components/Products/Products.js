import React from 'react';
import Product from '../Product/Product';

const products = (props) => props.products.map((product, index) => {
    return <Product 
        item={product}
        inCart={
          props.cart.items.find(x => x.name == product.name) ? 
            props.cart.items.filter(x => x.name == product.name)[0].count : 0
        }
        counterInc={(p) => props.counterInc(p)}
        counterDec={(p) => props.counterDec(p)}
        key={index} />
})

export default products;