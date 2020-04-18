import React from "react";
import MyDropzone from './UploadPopupDropZone/UploadPopupDropZone';

import './UploadPopup.scss'

export default function UploadPopup(props) {
    return (
        <div className="uploadPopup" onClick={props.closeUpload}>
            <div className="uploadPopup__wrapper">
                <MyDropzone fileInput={props.fileInput}/>

                <form
                    className="uploadForm"
                    encType="multipart/form-data"
                    onSubmit={props.uploadTrade}>
                    <button type="submit" className="uploadForm__button">Upload!</button>
                </form>
                <div className="uploadForm__status">
                    {props.uploadStatus}
                </div>

            </div>
        </div>
    );
}
