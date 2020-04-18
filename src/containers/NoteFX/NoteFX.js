import React, {Component} from "react";
import Popup from "../../components/Popup/Popup";
import UploadForm from '../../components/Form/UploadForm/UploadForm'
import PostsLists from "../../components/PostsList/PostsLists";
import SwitchListButtons from "../../components/SwitchListButtons/SwitchListButtons";
import firebase from "../../firebase";

export default class NoteFX extends Component {
    state = {
        allPosts: [],
        allPostsNameList: [],
        postsLoader: false,
        postsListGridView: false,
    };

    componentDidMount() {

        const getImage = (newPosts) => {

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

        const checkForUpdates = (incomingPosts) => {
            const newPosts = incomingPosts.filter(incomingPost => !this.state.allPostsNameList.includes(incomingPost.imgName));
            getImage(newPosts);
        }

        const getPostsLists = () => {
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
                    checkForUpdates(incomingPosts)
                }, error => console.log(error));
        }
        getPostsLists()
    }

    switchStyleList = (value) => {
        if (value !== this.state.postsListGridView) {
            this.setState({postsListGridView: value})
        }
    }

    render() {
        return (
            <div>
                <SwitchListButtons switchStyleList={this.switchStyleList}/>
                 {this.props.uploadPopupSwitch
                    ? <Popup closeUpload={this.props.closeUpload}>
                            <UploadForm/>
                        </Popup>
                    // <UploadPopup     closeUpload={this.props.closeUpload}
                    // fileInput={this.updatePickedFile}     fileName={this.state.fileInput === ""
                    // || this.state.fileInput === undefined     ? ""     :
                    // this.state.fileInput.name}     uploadStatus={this.state.uploadStatus}
                    // uploadTrade={this.uploadTrade}> </UploadPopup>

                    : null}

                <PostsLists
                    allPosts={this.state.allPosts}
                    postsLoader={this.state.postsLoader}
                    postsListGridView={this.state.postsListGridView}/>
            </div>
        )
    }
}
