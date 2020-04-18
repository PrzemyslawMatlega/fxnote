import React, { Component } from "react";
import NoteFX from "../../containers/NoteFX/NoteFX";
import Navbar from "../Navbar/Navbar";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadPopupSwitch: false
    };
  }

  toggleUploadPopup = () => {
      this.setState(prevState => {
      return { uploadPopupSwitch: !prevState.uploadPopupSwitch };
    });
  };
  closeUpload = (event) => {
    if(event.target.classList[0] === "popup"){
      this.setState({ uploadPopupSwitch: false})
    }
  }

  render() {
    return (
      <div className="Layout">
        <Navbar toggleUploadPopup={ this.toggleUploadPopup} />
        <NoteFX 
          uploadPopupSwitch={this.state.uploadPopupSwitch} 
          closeUpload= {this.closeUpload}
          />
      </div>
    );
  }
}
