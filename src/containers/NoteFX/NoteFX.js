import React, { Component, Fragment } from "react";
import UploadPopup from "../../components/UploadPopup/UploadPopup";
import firebase from "../../firebase";

export default class NoteFX extends Component {
  state = {
    fileInput: "",
    uploadStatus: "",
  };
  updatePickedFile = event => {
    this.setState({ fileInput: event.target.files[0] });
  };

  uploadTradeDB = (uniqueId) =>{
    firebase.database().ref(`posts/${uniqueId}`).set({
      imgName: uniqueId,
      createdAt: firebase.database.ServerValue.TIMESTAMP
  }, (error) => console.log(error));
  }

  uploadTrade = event => {
    event.preventDefault();

    let uniqueId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
 
    const uploadFirebase = firebase.storage().ref(`fx_images/${uniqueId}`);
    const uploadTask = uploadFirebase.put(this.state.fileInput);
    const that = this;

    uploadTask.on(
      "state_changed",
      function progress(snapshot) {
        that.setState({ uploadStatus: "In progress" });
      },
      function error(err) {
        that.setState({ uploadStatus: "Error" });
      },
      function complete() {
        that.uploadTradeDB(uniqueId)
        that.setState({ fileInput: "",  uploadStatus: "Complete" });
      }
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.uploadPopupSwitch ? (
          <UploadPopup
            closeUpload={this.props.closeUpload}
            fileInput={this.updatePickedFile}
            fileName={
              this.state.fileInput === "" || this.state.fileInput === undefined
                ? ""
                : this.state.fileInput.name
            }
            uploadStatus={this.state.uploadStatus}
            uploadTrade={this.uploadTrade}
          />
        ) : null}
        
      </Fragment>
    );
  }
}
