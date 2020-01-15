{
  /*import React, {useCallback} from './node_modules/react'
import {useDropzone} from './node_modules/react-dropzone'

function FileDropzone(props) {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    
    acceptedFiles.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            //gjør det vi vil med filinnhold
            const binaryStr = reader.result
            console.log(binaryStr)
        }
        reader.readAsArrayBuffer(file)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}*/
}
