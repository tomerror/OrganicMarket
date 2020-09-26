import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/user-context';
import Products from '../Products/Products';
import styles from './Groceries.module.css';

const Groceries = (props) => {
    const userContext = useContext(UserContext);
    
    if (userContext.user.username == undefined) {
        return <Redirect to="/login" />
    }
    
    const productExists = (cart, product) => {
        return cart.find(x => x.name == product)
    }

    const cartCounterInc = (product) => {
        let updateCart = props.cart.items;
        if (!productExists(updateCart, product.name)) {
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
            updateCart.filter(x => x.name == product.name).map(x => { x.count++; x.supply-- })
        }
        let amount = parseFloat((props.cart.amount + product.weight * (product.price - product.discount * 0.1 * product.price)).toFixed(2))
        let cart = {
            amount: amount,
            count: props.cart.count + 1,
            items: updateCart,
            delivery: props.cart.delivery
        }
        props.setCart(cart)
    }

    const cartCounterDec = (product) => {
        let updateCart = props.cart.items;
        let idxProduct = updateCart.findIndex(x => x.name == product.name)

        if (idxProduct != -1) {
            if (updateCart[idxProduct].count > 1) {
                updateCart[idxProduct].count -= 1;
                updateCart[idxProduct].supply += 1;
            } else {
                updateCart.splice(idxProduct, 1);
            }
            let amount = parseFloat((props.cart.amount - product.weight * (product.price - product.discount * 0.1 * product.price)).toFixed(2))
            let cart = {
                amount: amount,
                count: props.cart.count - 1,
                items: updateCart,
                delivery: props.cart.delivery
            }
            props.setCart(cart)
        }
    }

    let products = []
    if (props.products.length != undefined) {
        let productView = [];
        if (props.filter != '') {
            productView = props.products.filter(product => product.display.toLowerCase().includes(props.filter))
        } else {
            productView = props.products.filter(product => product.type == props.match.params.category.toLowerCase())
        }
        products = <Products
            products={productView}
            cart={props.cart}
            counterInc={(p) => cartCounterInc(p)}
            counterDec={(p) => cartCounterDec(p)}
        />
    }

    return (
        <div className={styles.frame}>
            {products}
        </div>
    )
}

export default Groceries;