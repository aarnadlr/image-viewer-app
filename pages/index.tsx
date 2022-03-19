import Head from 'next/head';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

export default function Home() {
  const [imageIds, setImageIds] = useState<string[]>();

  const loadImages = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImageIds(data);
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
          {imageIds ? (
            imageIds.map((imageId: string, index: number) => (
              <Image
                key={index}
                src={`http://res.cloudinary.com/aarncloud/image/upload/v1647660835/${imageId}.jpg`}
                width="300"
                height="300"
                alt="gallery image"
              />
            ))
          ) : (
            <p>No images</p>
          )}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
