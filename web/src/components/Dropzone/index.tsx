import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ? <p>Solte o arquivo aqui ...</p> : 
          <p>
            <FiUpload />
            Arraste ou clique aqui para inserir uma foto do estabelecimento...
          </p>
      }
    </div>
  )
}

export default Dropzone;
