import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

const Dropzone = () => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');


  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    try {
      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
    } catch (error) {
      console.log(error);
    }
        
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl ? <img src={selectedFileUrl} alt="Point thumbnail" /> :
          <p>
            <FiUpload />
            Arraste ou clique aqui para inserir uma foto do estabelecimento...
          </p>
      }
    </div>
  )
}

export default Dropzone;
