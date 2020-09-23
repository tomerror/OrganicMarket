import React from 'react';
import './Logo.css';

const Logo = () => {
    return (
        <div className="title">
            <img src={require('../../assets/wide4.png')} alt="" className="titleImage"/>
        </div>
    )
}

export default Logo;