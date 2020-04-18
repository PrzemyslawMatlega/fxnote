import React from 'react'
import classes from './PostsListsItem.module.scss'

export default function PostsListsItem(props) {
    let postClassName = classes.singlePost
    if (props.postsListGridView) {
        postClassName = classes.singlePost_grid
    }

    return (
        <div className={postClassName}>
            <img src={props.url} alt=""/>
        </div>
    )
}
