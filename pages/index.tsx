import ImageCard from '@/components/ImageCard';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Header } from '../components/Header';
import { Oval } from 'react-loader-spinner';
import { Flex } from '@chakra-ui/react';
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

  // Array of checked image objects
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
          checkedImagesArr={checkedImagesArr}
        />

        {resourceObjectsArr ? (
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
              <p>No images yet.</p>
            )}
          </FlexParent>
        ) : (
          <Flex justify='center'>
              <Oval
                ariaLabel="loading-indicator"
                height={80}
                width={80}
                strokeWidth={3}
                color="#d6bcfa"
                secondaryColor="gray"
              />
          </Flex>
        )}
      </main>
    </>
  );
}
