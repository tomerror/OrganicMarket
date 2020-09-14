import React from 'react';
import styles from './Order.module.css';
import moment from 'moment';
import Cart from '../Cart/Cart';

const order = (props) => {
    const products = <Cart
            cart = {props.order}
            disable = {true}
    />

    return (
        <div className={styles.historyBulk}>
            <div>
                <div className={styles.historyDate}>
                    {moment(`${props.order.time}`,"YYYYMMDDHHmmss").format("YYYY/MM/DD HH:mm:ss")}
                </div> 
                <div>{products}</div>
                <div className={styles.total}>
                    <div className={styles.text}>
                        total:
                    </div>
                    <div className={styles.price}>
                        &#8362;{parseFloat(props.order.amount).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default order;