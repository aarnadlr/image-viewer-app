import React, { useState } from 'react';
import Alert from '../components/Alert';
import Image from 'next/image';
export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
  };

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
      // reader.result is a DataURL/base64EncodedImage string ie `data:image/jpeg;base64,/9j/4AA..`
      setPreviewSource(reader.result as string);
      
    };
  };

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
      uploadImageAndMetadata(reader.result as string, title, description);
    };

    reader.onerror = () => {
      console.error('Error occurred');
      setErrMsg('Something went wrong!');
    };
  };

  const uploadImageAndMetadata = async (base64EncodedImage: string, title: string, description: string) => {
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage, title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image and data uploaded successfully.');
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong.');
    }
  };
  return (
    <div>
      <h1 className="title">Upload an Image</h1>

      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />

      <form onSubmit={handleSubmitFile} className="form">
        
        <label htmlFor="fileInput" className="form-label">
          File
        </label>
        <br />
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />

        <br />
        <br />

        <label htmlFor="title">Title</label>
        <br />
        <input id="title" name="title" value={title} onChange={handleTextInputChange} type="text" />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <input id="description" name="description" value={description} onChange={handleTextInputChange} type="text" />
        
        <br />
        <br />

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
