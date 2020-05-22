import React from "react";
import classes from "./Navbar.module.scss";

export default function Navbar(props) {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__logo}>MyApp</div>
    </div>
  );
}
