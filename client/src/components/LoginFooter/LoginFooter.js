import React, { useState } from 'react';
import styles from '../../containers/Login/Login.module.css'

const LoginFooter = (props) => {
    const [checkboxState, setCheckboxState] = useState({
        checked: true
    })
    const remember = { fontSize: "14px", textAlign: "right", marginTop: "2%" }
    const text = { fontSize: "14px", textAlign: "left" }
    const frame = { margin: "4%" }

    const sendValue = () => {
        setCheckboxState({ checked: !checkboxState.checked })
        props.checkboxFunc(checkboxState.checked)
    }

    return (
        <div>
            <div style={text}>
                <input type="checkbox" id="remember" onClick={() => sendValue()} />
                <p className={styles.Checkbox}>{props.inputText}</p>
            </div>
            <div>
                <button className={styles.Button} onClick={() => props.click()}>{props.buttonText}</button>
            </div>
            <div className={styles.error}>
                {props.error}
            </div>
            <div style={remember}>
                <p className={styles.Text} onClick={props.sign}>{props.changeScreenText}</p>
            </div>
        </div>
    )
}

export default LoginFooter;