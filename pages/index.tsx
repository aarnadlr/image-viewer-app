import Head from 'next/head';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

interface ResourceObjectType {
  context: { alt: string; caption: string };
  public_id: string;
}
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
        <div className="gallery">
          {resourceObjectsArr ? (
            resourceObjectsArr.map(
              (resourceObject: ResourceObjectType, index: number) => (
                <div key={index}>
                  <Image
                    key={index}
                    src={`http://res.cloudinary.com/aarncloud/image/upload/v1647660835/${resourceObject.public_id}.jpg`}
                    width="300"
                    height="300"
                    alt="gallery image"
                  />
                  <p>{resourceObject.context.alt}</p>
                  <p>{resourceObject.context.caption}</p>
                </div>
              )
            )
          ) : (
            <p>No images</p>
          )}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
