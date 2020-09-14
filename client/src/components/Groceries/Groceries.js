import React from 'react';
import Products from '../Products/Products';
import './Groceries.css';

const Groceries = ( props ) => {
    const productExists = (cart, product) => {
        return cart.find(x => x.name == product)
      }
    
    const cartCounterInc = (product) => {
        let updateCart = props.cart.items;
        if(!productExists(updateCart, product.name)){
            let setProduct = {
                "category": product.type,
                "name": product.name,
                "display": product.display,
                "count": 1,
                "supply": product.supply - 1,
                "details": {
                    "img": product.img,
                    "price": parseFloat(product.price),
                    "weight": parseFloat(product.weight),
                    "discount": product.discount
                }
            }
            updateCart.push(setProduct)
        }   
        else {
            updateCart.filter(x => x.name == product.name).map(x => {x.count++; x.supply--})
        }
        let amount = parseFloat((props.cart.amount + product.weight * (product.price - product.discount*0.1*product.price)).toFixed(2))
        let cart = {
            amount: amount,
            count: props.cart.count + 1,
            items: updateCart,
            delivery: amount < 50 ? props.cart.delivery : 30
        }
        props.setCart(cart)
    }

    const cartCounterDec = (product) => {
        let updateCart = props.cart.items;
        let idxProduct = updateCart.findIndex(x=>x.name == product.name)
    
        if(idxProduct != -1){
            if(updateCart[idxProduct].count > 1){
                updateCart[idxProduct].count -= 1;
                updateCart[idxProduct].supply += 1;
            } else {
                updateCart.splice(idxProduct, 1);
            }
            let amount = parseFloat((props.cart.amount - product.weight * (product.price - product.discount*0.1*product.price)).toFixed(2))
            let cart = {
                amount: amount,
                count: props.cart.count - 1,
                items: updateCart,
                delivery: amount > 50 ? props.cart.delivery : 50
            }
            props.setCart(cart)
        }
    }

    const products = <Products 
            products = {props.products}
            cart = {props.cart}
            counterInc={(p) => cartCounterInc(p)}
            counterDec={(p) => cartCounterDec(p)}
        />

    return (
        <div>
          {products}
        </div>
    )
}

export default Groceries;