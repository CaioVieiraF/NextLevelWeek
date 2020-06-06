import React, { useCallback, useState, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload as Icon } from 'react-icons/fi';

import './styles.css';

interface Props{
    onFileUpload: (file: File) => void;
};

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileURL = URL.createObjectURL(file);

        setSelectedFileUrl(fileURL);
        onFileUpload(file);
    }, [onFileUpload])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept='image/*' />

            { selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point thumbnail" />
                : (
                    <p>
                        <Icon />
                        Imagem do estabelecimento
                        </p>
                    )
            }
        </div>
    )
}

export default Dropzone;
