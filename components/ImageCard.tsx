import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

type Props = {
  resourceObject: {
    context: {
      title: string;
      description: string;
    };
    public_id: string;
  };
};

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 0 0.5rem 0.5rem 0;
  display: flex;
  flex-direction: column;
  width: 400px;
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
  &:hover {
    border: 1px solid blue;
  }
`;

const Title = styled.h3`
  margin: 0.75rem 0 0 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const downloadImage = async (url: string, title: string) => {
  const res = await fetch(url);

  const imageBlob = await res.blob();
  const imageURL = URL.createObjectURL(imageBlob);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = `${title}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ImageCard({
  resourceObject: {
    context: { title, description },
    public_id,
  },
}: Props) {
  const handleDownloadClick = () => {
    const url = `https://res.cloudinary.com/aarncloud/image/upload/v1598424868/${public_id}.jpg`;
    downloadImage(url, title);
  };

  return (
    <Container>
      <Image
        src={`http://res.cloudinary.com/aarncloud/image/upload/v1598424868/${public_id}.jpg`}
        width="300"
        height="300"
        alt="gallery image"
        priority
      />
      <Title>{title}</Title>
      <p>{description}</p>

      <Button
        leftIcon={<DownloadIcon />}
        onClick={handleDownloadClick}
        size="xs"
        colorScheme="gray"
        variant="outline"
        width='100px'
        margin='2rem 0 0 0'
      >
        Download
      </Button>
    </Container>
  );
}
