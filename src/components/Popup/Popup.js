import React from "react";
import './Popup.scss'

export default function Popup(props) {
    return (
        <div className="popup" onClick={(event) => props.closeFoo(event)}>
            <div className="popup__wrapper">
                {props.children}
            </div>
        </div>
    );
}
