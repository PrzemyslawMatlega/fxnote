import React from "react";
import './Popup.scss'

export default function Popup(props) {
    return (
        <div className="popup" onClick={props.closeUpload}>
            <div className="popup__wrapper">
                {props.children}
            </div>
        </div>
    );
}
