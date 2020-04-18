import React, {Component} from 'react'
import classes from './UploadForm.module.scss';
import firebase from "../../../firebase";
import uploadFormData from '../../../helpers/UploadFormData';
import DropZone from '../DropZone/DropZone'
import InputsInPost from '../InputsInPost/InputsInPost';
import Button from '../../Button/Button'

export default class UploadForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadFormData,
            uploadFormFile: '',
            uploadStatus: ''
        }
    }
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
        console.log(this.state)
        const uniqueId = "_" + Math
            .random()
            .toString(36)
            .substr(2, 9);

        const uploadFirebase = firebase
            .storage()
            .ref(`fx_images/${uniqueId}`);
        const uploadTask = uploadFirebase.put(this.state.uploadFormFile[0]);
        const that = this;

        uploadTask.on("state_changed", function progress(snapshot) {
            that.setState({uploadStatus: "In progress"});
        }, function error(err) {
            that.setState({uploadStatus: "Error"});
        }, function complete() {
            that.uploadTradeDB(uniqueId)
            that.setState({ uploadStatus: "Complete"});
        });
    };

    setFile = fileData =>{
        this.setState({uploadFormFile : fileData })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedUploadFormData = {
            ...this.state.uploadFormData
        };
        const updatedFormElement = {
            ...updatedUploadFormData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedUploadFormData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedUploadFormData) {
            formIsValid = updatedUploadFormData[inputIdentifier].valid && formIsValid;
        }
        this.setState({uploadFormData: updatedUploadFormData, formIsValid: formIsValid});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.uploadTrade} className={classes.uploadForm}>
                    <DropZone uploadFormFile={this.setFile}/>
                    <InputsInPost
                        uploadFormData={this.state.uploadFormData}
                        inputChangedHandler={this.inputChangedHandler}/>
                    <Button btnClass="Upload" >Upload</Button>
                </form>
            </div>
        )
    }
}
