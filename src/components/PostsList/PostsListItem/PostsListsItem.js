import React from 'react'
import classes from './PostsListsItem.module.scss'

export default function PostsListsItem(props) {
    let postClassName = classes.singlePost
    
    if (props.postsListGridView) {
        postClassName = classes.singlePost_grid
    }
    function convertDateToString(date){
        return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`
    }

    return (
        <div className={postClassName}>
            <img src={props.url} alt=""/> {postClassName === classes.singlePost
                ? <div className="data-block">
                    <h1><b>Date:</b> {convertDateToString(props.date)}</h1>
                    <h1><b>Category:</b> {props.formData.categoryName}</h1>
                    <h1><b>Numbers:</b> {props.formData.numberData1} / {props.formData.numberData2} / {props.formData.numberData3}</h1>
                </div>
                : null}
        </div>
    )
}
