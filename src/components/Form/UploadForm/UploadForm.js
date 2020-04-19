import React, {Component} from 'react'
import classes from './UploadForm.module.scss';
import firebase from "../../../firebase";
import uploadFormDataTemplate from '../../../helpers/UploadFormDataTemplate';
import DropZone from '../DropZone/DropZone'
import InputsInPost from '../InputsInPost/InputsInPost';
import Button from '../../Button/Button'

export default class UploadForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadFormData: uploadFormDataTemplate,
            uploadFormFile: '',
            uploadStatus: '',
            formError: ''
        }
    }

    componentDidUpdate() {
        if (this.state.uploadStatus === 'Error' || this.state.uploadStatus === 'Complete') {
            setTimeout(() => {
                this.setState({uploadStatus: ''})
            }, 500);
        }

        if(this.state.formError !== ''){
            setTimeout(() => {
                this.setState({formError: ''})
            }, 500);
        }
    }

    uploadTradeDB = (uniqueId) => {
        const formData = {};
        for (let formElementIdentifier in this.state.uploadFormData) {
            formData[formElementIdentifier] = this.state.uploadFormData[formElementIdentifier].value;
        }

        firebase
            .database()
            .ref(`posts/${uniqueId}`)
            .set({
                imgName: uniqueId,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                formData
            }, (error) => console.log(error))
            .then(() => {
                this.setState({uploadStatus: "Complete", uploadFormData: uploadFormDataTemplate, uploadFormFile: ''});
            })
    }

    uploadTrade = event => {
        event.preventDefault();
        if(this.state.uploadFormFile !== ''){

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
                that.setState({uploadStatus: "Error", uploadFormData: uploadFormDataTemplate, uploadFormFile: ''});
            }, function complete() {
                that.uploadTradeDB(uniqueId)
            });
        
        }
        else{
            this.setState({formError: 'Please fill form'})
        }
    };

    setFile = fileData => {
        this.setState({uploadFormFile: fileData})
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
                    <DropZone setFormFile={this.setFile} uploadStatus={this.state.uploadStatus} uploadFormFile={this.state.uploadFormFile}/>
                    <InputsInPost
                        uploadFormData={this.state.uploadFormData}
                        inputChangedHandler={this.inputChangedHandler}/>
                    <Button
                        btnClass="Upload"
                        disabled={this.state.uploadStatus === ''
                        ? false
                        : true}>Upload</Button>
                    <div className={classes.statusMsg}>
                        <h3 className={classes.statusMsg__txt} >{this.state.uploadStatus} {this.state.formError}</h3>
                    </div>
                </form>
            </div>
        )
    }
}
