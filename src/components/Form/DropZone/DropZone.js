import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './DropZone.scss'

export default function MyDropzone(props) {
    const {setFormFile, uploadStatus, uploadFormFile} = props
        let dropWrapper = "dropZone",
            fileName;
        const onDrop = useCallback(acceptedFiles => {
            setFormFile(acceptedFiles)
        }, [setFormFile])

        let {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})

        if (uploadStatus === 'Complete'  ) {
            acceptedFiles = []
        }

        if (acceptedFiles[0] !== undefined && uploadFormFile !== '') {
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