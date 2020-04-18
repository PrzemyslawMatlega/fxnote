import React, {Component} from 'react'
import PostsListsItem from './PostsListItem/PostsListsItem';
import classes from './PostsLists.module.scss'

export default class PostsLists extends Component {
    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.allPosts.length !== nextProps.allPosts.length) {
            return true
        }
        if (this.props.postsLoader !== nextProps.postsLoader) {
            return true
        }
        if (this.props.postsListGridView !== nextProps.postsListGridView) {
            return true
        }
        return false
    }

    render() {
        let wrapperClassName = classes.postsList
        if (this.props.postsListGridView) {
            wrapperClassName = [classes.postsList, classes.postsList__grid].join(' ')
        }
    
        return (
            <div className={wrapperClassName}>
                {this.props.postsLoader === true
                    ? <p>Loading ...</p>
                    : this
                        .props
                        .allPosts
                        .map((singlePost, index) => {
                            return <PostsListsItem key={singlePost.imgName} url={singlePost.url} postsListGridView={this.props.postsListGridView} />
                        })
}
            </div>
        )
    }
}
