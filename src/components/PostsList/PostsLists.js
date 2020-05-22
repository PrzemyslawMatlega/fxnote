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
        const dateEnd = parseFloat(this.props.appliedFilters.dateEnd.value.split("-").join(''))
        const dateStart = parseFloat(this.props.appliedFilters.dateStart.value.split("-").join(''))
        const headLineWithDates = `Posts from ${this.props.appliedFilters.dateStart.value} to ${this.props.appliedFilters.dateEnd.value}`
        const subheadLine = `Categories: ${this
            .props
            .appliedFilters
            .categoryName
            .value
            .join(', ')}`
        let contentClassName = classes.content
        if (this.props.postsListGridView) {
            contentClassName = [classes.content, classes.content__grid].join(' ')
        }

        const validatePost = singlePost => {
            const validateDateStart = parseFloat(singlePost.date) >= dateStart,
                validateDateEnd = parseFloat(singlePost.date) <= dateEnd,
                validateCategory = this
                    .props
                    .appliedFilters
                    .categoryName
                    .value
                    .includes(singlePost.formData.categoryName)

            return (validateDateStart && validateDateEnd && validateCategory)
        }

        let postsToDisplay = this
            .props
            .allPosts
            .map((singlePost) => {
                let toReturn = null;
                if (validatePost(singlePost)) {
                    toReturn = <PostsListsItem
                        key={singlePost.imgName}
                        url={singlePost.url}
                        formData={singlePost.formData}
                        date={singlePost.date}
                        postsListGridView={this.props.postsListGridView}/>
                }
                return toReturn

            })
            .filter(element => element !== null)

        return (
            <div className={classes.postsList}>
                <div className={classes.postsList__top}>
                    <h1 className={classes.postsList__head}>{headLineWithDates}</h1>
                    <span className={classes.postsList__subhead}>{subheadLine}</span>
                </div>
                <div className={contentClassName}>
                    {this.props.postsLoader === true
                        ? <p>Loading ...</p>
                        : postsToDisplay
}
                </div>
            </div>
        )
    }
}
