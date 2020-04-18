import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './DropZone.scss'

export default function MyDropzone(props) {
    const {uploadFormFile} = props
        let dropWrapper = "dropZone",
            fileName;
            
        const onDrop = useCallback(acceptedFiles => {
            uploadFormFile(acceptedFiles)
        }, [uploadFormFile])

        const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})

        if (acceptedFiles[0] !== undefined) {
            fileName = acceptedFiles[0].name
        } else {
            fileName = "Drag 'n' drop some files here, or click to select files"
        }
        if (isDragActive) {
            dropWrapper = "dropZone dropZone--active "
        }

        return (
            <div {...getRootProps()} className={dropWrapper}>
                <input {...getInputProps()}/> {isDragActive
                    ? <p
                            style={{
                            color: 'white'
                        }}>Drop the files here ...</p>
                    : <p >{fileName}</p>
}
            </div>
        )
    }