import React from 'react';
import Counter from '../Counter/Counter';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import './Item.css';

const Item = ( props ) => {
    return (
        <div>
            <div className="item">
                <div className="img">
                    <img src={`http://localhost:4000/img/${props.category}/${props.image}`} className="checkout-img" />
                </div>
                <div className="details">
                    {props.display}
                </div>
                <div className="counterFrame">
                    <Counter counterInc={() => props.counterInc(props)}
                        counterDec={() => props.counterDec(props)}
                        inCart={props.inCart}
                        disable={props.disable}
                    />
                </div>
                <div className={props.discount == 1 ? "sale" : "price"}>
                    &#8362;{((props.price - props.discount*0.1*props.price)*props.weight*props.count).toFixed(2)}
                    <p className="kg">(~{(props.weight*props.count).toFixed(2)} KG)</p>
                </div>
                { props.panel ?
                <div>
                    <TrendingDownIcon onClick={() => props.iconFunc1(props.display)} className={props.discount == 1 ? "available" : "unavailable"}/>
                    { props.show == "true" ? <VisibilityIcon className="eye" onClick={() => props.iconFunc2(props.display)}/> 
                    : <VisibilityOffIcon className="eye" onClick={() => props.iconFunc2(props.display)}/> }
                </div> : null}
            </div>
        </div>
    )
}

export default Item;