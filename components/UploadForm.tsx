import React, { useState, useEffect } from 'react';
// import Alert from './Alert';
import { Input, FormControl,
  FormLabel, Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface Props {
  successResponse: boolean | null;
  setSuccessResponse: (successResponse: boolean) => void;
  onClose: () => void;
}
export function UploadForm({successResponse, setSuccessResponse, onClose}:Props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setisSubmitting] = useState(false);
  const router = useRouter();
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

    setisSubmitting(true);

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

  const reload = router.reload as any;

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
      setisSubmitting(false);
      setSuccessResponse(true);
      onClose();
      reload(window.location.pathname);
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong.');
    }
  };
  return (
    <div>

      {/* <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" /> */}

      <form onSubmit={handleSubmitFile} className="form">
        
        <FormLabel htmlFor="fileInput" className="form-label">
          File
        </FormLabel>

        <input
          className="custom-file-input"
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          style={{margin:"0 0 2rem 0"}}
        />


        <FormLabel htmlFor="title">Title</FormLabel>

        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTextInputChange}
          placeholder="Add a title here"
          size="lg"
          // ref={ref}
          style={{margin:"0 0 1rem 0"}}
        />

        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          name="description"
          value={description}
          onChange={handleTextInputChange}
          placeholder="Add a description here"
          size="lg"
          style={{margin:"0 0 1rem 0"}}
        />

        <Button
          type="submit"
          leftIcon={<ArrowUpIcon />}
          // width="320px"
          margin="1rem 0"
          colorScheme={'purple'}
          size="lg"
          isFullWidth
        >
          Upload
        </Button>
      </form>

      {/* show preview image */}
      {previewSource && (
        // eslint-disable-next-line
        <img src={previewSource} alt="chosen" style={{ height: '100px' }} />
      )}
    </div>
  );
}
