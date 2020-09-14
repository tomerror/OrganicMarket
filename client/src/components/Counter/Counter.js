import React from 'react';

const Counter = ( props ) => {    
    return (
        <div className="addRmProduct">
            {props.disable ? null: <button className="button plus" onClick={() => props.counterInc()}>+</button>}
            
                <div className="cart-status">
                    x {props.inCart}
                </div>

            {props.disable ? null: <button className="button minus" onClick={() => props.counterDec()}>-</button>}
        </div>
    )
}

export default Counter;