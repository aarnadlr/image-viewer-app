import React, { useState } from 'react';
import Alert from '../components/Alert';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

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
    
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(target.value);
  };

  const previewFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
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

  const uploadImageAndMetadata = async (
    base64EncodedImage: string,
    title: string,
    description: string
  ) => {
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
          className="custom-file-input"
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />

        <br />
        <br />

        <label htmlFor="title">Title</label>
        <br />
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTextInputChange}
          placeholder="Add a title here"
          size="lg"
          width="320px"
        />
        <br />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <Input
          id="description"
          name="description"
          value={description}
          onChange={handleTextInputChange}
          placeholder="Add a description here"
          size="lg"
          width="320px"
        />

        <br />
        <br />

        <Button
          type="submit"
          leftIcon={<ArrowUpIcon />}
          width="320px"
          margin="1rem 0"
        >
          Upload
        </Button>
      </form>

      {/* show preview image */}
      {previewSource && (
        // eslint-disable-next-line
        <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
      )}
    </div>
  );
}
