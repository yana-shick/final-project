import React from 'react';
import Logo from './img/smart home.svg';
import Sun from './img/sun.svg';

export default function Title() {
    return (
        <div className="title">

            <img src={Sun} alt=" HomeIcon" />
            <img src={Logo} alt="LogoIcon" />

        </div >
    )
}
