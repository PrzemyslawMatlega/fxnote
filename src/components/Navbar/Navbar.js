import React from "react";
import classes from "./Navbar.module.scss";

export default function Navbar(props) {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__logo}>NoteFX</div>
      <div className={classes.Navbar__button} onClick={props.toggleUploadPopup}>
        New Trade
      </div>
    </div>
  );
}
