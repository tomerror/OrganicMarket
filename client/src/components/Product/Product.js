import React from 'react';
import PropTypes from 'prop-types'
import Counter from '../Counter/Counter';
import './Product.css';

const Product = (props) => {
    return (
        <div className="product-frame">
            {props.item.supply > 0 ?
            <div className="product-frame">
            {props.item.show == "true" ?
                <div  className="product" >
                    <div style={{ height: "70%" }} >
                        <img src={`http://localhost:4000/img/${props.item.type}/${props.item.img}`} className="product-img" />
                    </div>
                    <div className="product-name">
                        <p>{props.item.display}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className={props.item.discount == 1 ? "product-sale" : "product-price"}>
                            <p>(&#8362;</p>
                            <p>{(props.item.price - props.item.discount * 0.1 * props.item.price).toFixed(2)}</p>
                            <p> / kg)</p>
                        </div>
                        {props.inCart != 0 ?
                            <div className="cart-amount">
                                <p>{(props.inCart * ((props.item.price - props.item.discount * 0.1 * props.item.price) * props.item.weight)).toFixed(2)}</p>
                                <p>&#8362;</p>

                            </div> : null
                        }
                    </div>
                    <Counter counterInc={() => props.counterInc(props.item)}
                        counterDec={() => props.counterDec(props.item)}
                        inCart={props.inCart}
                         />
                    {props.item.supply <= 5 ? <div className="last-items">{props.item.supply} left!</div>: null}
                </div>
            : null} </div> : null}
        </div>
    )
}

Product.propTypes = {
    inCart: PropTypes.number
}

export default Product;