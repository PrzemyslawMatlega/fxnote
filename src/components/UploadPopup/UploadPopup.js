import React from "react";
import './UploadPopup.scss'

export default function UploadPopup(props) {
  return (
    <div className="uploadPopup" onClick={props.closeUpload}>
      <div className="uploadPopup__wrapper">
        <form 
        className="uploadForm" 
        encType="multipart/form-data"
        onSubmit={props.uploadTrade}
        >
          <div className="uploadForm__fileName">
          <span>File Name: {props.fileName}</span>
          </div>

          <label htmlFor="uploadedFile" className="uploadForm__label">
            Choose a file...
          </label>

          <input
            type="file"
            name="uploadedFile"
            id="uploadedFile"
            className="uploadForm__input"
            accept="image/*"
            onChange={(event) => props.fileInput(event)}
          />

          <button 
            type="submit" 
            className="uploadForm__button"
          >Upload!
          </button>

        <div className="uploadForm__status"> { props.uploadStatus}</div>
        </form>
      </div>
    </div>
  );
}
