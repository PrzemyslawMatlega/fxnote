import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './UploadPopupDropZone.scss'
export default function MyDropzone(props) {
    const fileInput = props.fileInput
    const onDrop = useCallback(acceptedFiles => {
        fileInput(acceptedFiles)
    }, [fileInput])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    let dropWrapper = "dropZone"
    if(isDragActive){
        dropWrapper = "dropZone dropZone--active "
    }
    return (
        <div {...getRootProps()} className={dropWrapper}>
            <input {...getInputProps()}/> {isDragActive
                ? <p style={{color : 'white'}} >Drop the files here ...</p>
                : <p >Drag 'n' drop some files here, or click to select files</p>
}
        </div>
    )
}