import React, { useState } from 'react';
import Alert from '../components/Alert';
import Image from 'next/image';
export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // Triggers when a file is selected
  const handleFileInputChange = (e: React.ChangeEvent) => {

    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    // const file = e.target.files[0];

    previewFile(file);
    setSelectedFile(file);
    setFileInputState(target.value);
  };

  const previewFile = (file: File) => {

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
      console.log('reader.result:',reader.result)
    };
  };

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit 1:',)

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
      uploadImage(reader.result as string);
    };

    reader.onerror = () => {
      console.error('Error occurred');
      setErrMsg('Something went wrong!');
    };
  };

  const uploadImage = async (base64EncodedImage: string) => {
    console.log('submit 2:',)
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
    }
  };
  return (
    <div>
      <h1 className="title">Upload an Image</h1>

      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />

      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      {/* show preview image */}
      {previewSource && (
        // eslint-disable-next-line
        <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
      )}

    </div>
  );
}
