import React, {Component} from "react";
import Popup from "../../components/Popup/Popup";
import UploadForm from '../../components/Form/UploadForm/UploadForm'
import PostsLists from "../../components/PostsList/PostsLists";
import SwitchListButtons from "../../components/SwitchListButtons/SwitchListButtons";
import FilterForm from '../../components/Form/FilterForm/FilterForm';
import firebase from "../../firebase";
import cleanFilters from '../../helpers/CleanFilters'
import {Route} from 'react-router-dom';

export default class NoteFX extends Component {
    state = {
        allPosts: [],
        allPostsNameList: [],
        postsLoader: false,
        postsListGridView: false,
        showPopupFilter: false,
        filters: cleanFilters,
        appliedFilters: cleanFilters
    };

    getImage = (newPosts) => {

        this.setState({postsLoader: true})
        const newAllPosts = [...this.state.allPosts]

        newPosts.forEach(singlePost => {
            const newAllPostsNameList = [...this.state.allPostsNameList]
            newAllPostsNameList.push(singlePost.imgName)
            this.setState({allPostsNameList: newAllPostsNameList})

            const listRef = firebase
                .storage()
                .ref()
                .child(`fx_images/${singlePost.imgName}`);

            listRef
                .getDownloadURL()
                .then(url => {
                    newAllPosts.push({
                        ...singlePost,
                        url: url
                    })
                })
                .catch(error => {
                    switch (error.code) {
                        case "storage/object-not-found":
                            break;

                        case "storage/unauthorized":
                            break;

                        case "storage/canceled":
                            break;

                        case "storage/unknown":
                            break;
                        default:
                            break;
                    }
                });
        });

        setTimeout(() => {
            newAllPosts.sort((a, b) => a.createdAt - b.createdAt).reverse()
            this.setState({postsLoader: false, allPosts: newAllPosts})
        }, 1000);
    }

    checkForUpdates = (incomingPosts) => {
        const newPosts = incomingPosts.filter(incomingPost => !this.state.allPostsNameList.includes(incomingPost.imgName));
        this.getImage(newPosts);
    }

    getPostsLists = () => {
        firebase
            .database()
            .ref("/posts/")
            .once("value")
            .then(snapshot => {
                const postsFromDB = snapshot.val();
                const incomingPosts = [];

                for (const item in postsFromDB) {
                    incomingPosts.push(postsFromDB[item]);
                }
                this.checkForUpdates(incomingPosts)
            }, error => console.log(error));
    }

    switchStyleList = (value) => {
        if (value !== this.state.postsListGridView) {
            this.setState({postsListGridView: value})
        }
    }

    closeFilterPopup = (event) => {
        if (event.target.classList[0] === "popup" && this.props.location.pathname === '/filters') {
            this.props.history.push('/')
        }
    }
    closeUploadPopup = (event) => {
        if (event.target.classList[0] === "popup" && this.props.location.pathname === '/upload') {
            this.props.history.push('/')
        }
    }

    openFilterPopup = () => this.props.history.push('/filters')
    
    openUploadPopup = () => this.props.history.push('/upload')

    updateFilter = (event, id) => {
        const updatedFilters = {
            ...this.state.filters
        };
        
        if(id === 'categoryName'){
            if( this.state.filters.categoryName.value.includes(event.target.value) ){
                updatedFilters[id].value = updatedFilters[id].value.filter( item => item !== event.target.value )
            }
            else{
                updatedFilters[id].value.push(event.target.value)
            }
        }
        else{
            updatedFilters[id].value = event.target.value
        }

        this.setState({filters: updatedFilters});
    }

    applyFilters = (event) => {
        event.preventDefault();
        
        this.setState({appliedFilters: this.state.filters, postsLoader: true, showPopupFilter: false})

        setTimeout(() => {
            this.setState({postsLoader: false})
        }, 500);
    }


    componentDidMount() {
        this.getPostsLists()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.uploadPopupSwitch === true && this.props.uploadPopupSwitch === false) {
            this.getPostsLists()
        }
        
    }

    render() {
        return (
            <div>
                <SwitchListButtons
                    switchStyleList={this.switchStyleList}
                    openFilterPopup={this.openFilterPopup}
                    openUploadPopup={this.openUploadPopup}
                    />

                <Route path="/upload"  exact render={() => (
                     <Popup closeFoo={this.closeUploadPopup}>
                            <UploadForm/>
                        </Popup>
                )} />

                <Route path="/filters"  exact render={() => (
                    <Popup closeFoo={this.closeFilterPopup}>
                            <FilterForm
                                filterData={this.state.filters}
                                updateFilter={this.updateFilter}
                                applyFilters={this.applyFilters}/>
                    </Popup>
                )} />

                <PostsLists
                    allPosts={this.state.allPosts}
                    appliedFilters = {this.state.appliedFilters}
                    postsLoader={this.state.postsLoader}
                    postsListGridView={this.state.postsListGridView}/>
            </div>
        )
    }
}
