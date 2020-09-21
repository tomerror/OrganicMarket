import React, { useEffect, useRef } from 'react';
import styles from '../../containers/Login/Login.module.css';

const Signin = ( props ) => {
    const userFocus = useRef(null)

    useEffect(() => {
        userFocus.current.focus()
    }, [])

    return (
        <div className={styles.form}>
            <div>
                <div className={styles.div}>
                    <input type="text" placeholder="Username" className={styles.LoginInput} ref={userFocus} onChange={(e) => props.onChange({ username: e.target.value })}/>
                </div>
                <div className={styles.div}>
                    <input type="password" placeholder="Password" className={styles.LoginInput} onChange={(e) => props.onChange({ password: e.target.value })}/>
                </div>
            </div>            
        </div>
    )
}

export default Signin;