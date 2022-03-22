import ImageCard from '@/components/ImageCard';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
// import { useRouter } from 'next/router';
interface ResourceObjectInterface {
  context: { title: string; description: string };
  public_id: string;
}

const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default function Home() {
  // const router = useRouter();
  const [resourceObjectsArr, setResourceObjectsArr] = useState<[]>();

  // const reloadPage = () => {
  //   router.reload(window.location.pathname)
  // }

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
    <>
      <Head>
        <title>Image Viewer App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
    </>
  );
}
