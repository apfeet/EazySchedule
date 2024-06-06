import React from 'react';
import '../style.css';
import { FaBeer } from "react-icons/fa";

const Button = ({ buttonText = 'Click me', icon = <FaBeer />, action }) => {
    return (
        <button id='button_component' onClick={action}>
            {buttonText}
            <div className='button_component_FreeGap' />
            {icon}
        </button>
    );
};

export default Button;
