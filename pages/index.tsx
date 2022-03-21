import ImageCard from '@/components/ImageCard';
import Head from 'next/head';
import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface ResourceObjectInterface {
  context: { title: string; description: string };
  public_id: string;
}

const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default function Home() {
  const [resourceObjectsArr, setResourceObjectsArr] = useState<[]>();

  const loadImages = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setResourceObjectsArr(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <Head>
        <title>Image Viewer App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Image Viewer App - Gallery</h1>

        <FlexParent className="gallery">
          {resourceObjectsArr ? (
            resourceObjectsArr.map(
              (resourceObject: ResourceObjectInterface, index: number) => {
                return (
                  <ImageCard key={index} resourceObject={resourceObject} />
                );
              }
            )
          ) : (
            <p>No images</p>
          )}</FlexParent>
      </main>
      <footer></footer>
    </div>
  );
}
