import ImageCard from '@/components/ImageCard';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Header } from '../components/Header';
import { zipFiles } from '../utils/zipFiles';
import { Button, Heading } from '@chakra-ui/react';

import { DownloadIcon } from '@chakra-ui/icons';
interface ResourceObjectInterface {
  context: { title: string; description: string };
  public_id: string;
}

const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Home() {
  // Image data from cloudinary
  const [resourceObjectsArr, setResourceObjectsArr] = useState<[] | null>(null);

  // Array of checked images
  const [checkedImagesArr, setCheckedImagesArr] = useState<{}[]>([]);

  const loadImages = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setResourceObjectsArr(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // fetch images on mount
  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    console.log(checkedImagesArr);
  }, [checkedImagesArr]);

  const handleZipFiles = () => {
    zipFiles(checkedImagesArr);
  };

  return (
    <>
      <Head>
        <title>Image Viewer App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header
          resourceObjectsArr={resourceObjectsArr}
          loadImages={loadImages}
        />

        {
          <Button
            data-testid="download-button"
            leftIcon={<DownloadIcon />}
            onClick={handleZipFiles}
            size="md"
            colorScheme="gray"
            margin="0 0 1rem 0"
            disabled={checkedImagesArr.length > 0 ? false : true}
          >
            Download Selected Files
          </Button>
        }

        <FlexParent className="gallery">
          {resourceObjectsArr ? (
            resourceObjectsArr.map(
              (resourceObject: ResourceObjectInterface, index: number) => {
                return (
                  <ImageCard
                    key={index}
                    resourceObject={resourceObject}
                    setCheckedImagesArr={setCheckedImagesArr}
                    checkedImagesArr={checkedImagesArr}
                  />
                );
              }
            )
          ) : (
            <p>Loading...</p>
          )}
        </FlexParent>
      </main>
    </>
  );
}
