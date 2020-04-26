import React from 'react'
import gridImg from './Images/001-grid.png'
import listImg from './Images/002-list.png';
import adjustImg from './Images/003-adjust.png';
import classes from './SwitchListButtons.module.scss'

export default function SwitchListButtons(props) {
    return (
        <div className={classes.wrapper}>
            <img onClick={() => props.switchStyleList(true)} src={gridImg} className={classes.wrapper__img} alt=""/>
            <img onClick={() => props.switchStyleList(false)} src={listImg} className={classes.wrapper__img} alt=""/>
            <img onClick={props.openFilterPopup} src={adjustImg} className={classes.wrapper__img} alt="" />      
        </div>
    )
}
