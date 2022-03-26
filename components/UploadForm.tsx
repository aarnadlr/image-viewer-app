import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface Props {
  loadImages: () => void;
}
export function UploadForm({ loadImages }: Props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // When a file is selected
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

    setIsLoading(true);

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
      uploadImageAndMetadata(reader.result as string, title, description);
    };

    reader.onerror = () => {
      console.error('Error occurred');
    };
  };

  const reload = router?.reload as any;

  const uploadImageAndMetadata = async (
    base64EncodedImage: string,
    title: string,
    description: string
  ) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage, title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('response:', response);
      if (response.ok) {
        setFileInputState('');
        setPreviewSource('');
        loadImages();

        setTimeout(() => {
          reload(window.location.pathname);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        data-testid="form"
        aria-label="form"
        onSubmit={handleSubmitFile}
        className="form"
      >
        <label
          data-testid="file-label"
          aria-label="file-label"
          htmlFor="fileInput"
          className="form-label"
        >
          File
        </label>

        <br />

        <input
          aria-label="file-input"
          className="custom-file-input"
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          style={{ margin: '.5rem 0 2rem 0' }}
          required
        />

        <br />

        <label data-testid="title-label" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTextInputChange}
          placeholder="Add a title here"
          size="lg"
          style={{ margin: '.5rem 0 1rem 0' }}
          required
        />

        <label data-testid="description-label" htmlFor="description">
          Description
        </label>
        <Input
          id="description"
          name="description"
          value={description}
          onChange={handleTextInputChange}
          placeholder="Add a description here"
          size="lg"
          style={{ margin: '.5rem 0 1rem 0' }}
          required
        />

        <Button
          type="submit"
          leftIcon={<ArrowUpIcon />}
          margin="1rem 0"
          colorScheme={'purple'}
          size="lg"
          isFullWidth
          isLoading={isLoading}
          loadingText="Uploading..."
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
