import React from 'react';
// @ts-ignore
import logo from '../../assets/Logo_Sena.png'
import './LoadingIcon.style.scss'

const LoadingIcon = () => {
    return (
        <div className="lds-circle">
           <img src={logo} /> 
        </div>
    );
};

export default LoadingIcon;