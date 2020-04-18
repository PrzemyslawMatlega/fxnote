import React, {Component} from "react";
import UploadPopup from "../../components/UploadPopup/UploadPopup";
import PostsLists from "../../components/PostsList/PostsLists";
import SwitchListButtons from "../../components/SwitchListButtons/SwitchListButtons";
import firebase from "../../firebase";

export default class NoteFX extends Component {
    state = {
        fileInput: "",
        uploadStatus: "",
        allPosts: [],
        allPostsNameList: [],
        postsLoader: false,
        postsListGridView: false
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

    updatePickedFile = file => {
        console.log(file)
        // this.setState({fileInput: event.target.files[0]});
    };

    uploadTradeDB = (uniqueId) => {
        firebase
            .database()
            .ref(`posts/${uniqueId}`)
            .set({
                imgName: uniqueId,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            }, (error) => console.log(error));
    }

    uploadTrade = event => {
        event.preventDefault();

        const uniqueId = "_" + Math
            .random()
            .toString(36)
            .substr(2, 9);

        const uploadFirebase = firebase
            .storage()
            .ref(`fx_images/${uniqueId}`);
        const uploadTask = uploadFirebase.put(this.state.fileInput);
        const that = this;

        uploadTask.on("state_changed", function progress(snapshot) {
            that.setState({uploadStatus: "In progress"});
        }, function error(err) {
            that.setState({uploadStatus: "Error"});
        }, function complete() {
            that.uploadTradeDB(uniqueId)
            that.setState({fileInput: "", uploadStatus: "Complete"});
        });
    };

    switchStyleList = (value) => {
        if (value !== this.state.postsListGridView) {
            this.setState({postsListGridView: value})
        }
    }

    render() {
        return (
            <div>
                <SwitchListButtons switchStyleList={this.switchStyleList}/> {this.props.uploadPopupSwitch
                    ? (
                        <UploadPopup
                            closeUpload={this.props.closeUpload}
                            fileInput={this.updatePickedFile}
                            fileName={this.state.fileInput === "" || this.state.fileInput === undefined
                            ? ""
                            : this.state.fileInput.name}
                            uploadStatus={this.state.uploadStatus}
                            uploadTrade={this.uploadTrade}>
                        </UploadPopup>
                    )
                    : null}

                <PostsLists
                    allPosts={this.state.allPosts}
                    postsLoader={this.state.postsLoader}
                    postsListGridView={this.state.postsListGridView}/>
            </div>
        )
    }
}
