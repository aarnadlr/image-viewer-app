import Head from 'next/head';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function Home() {
  const [imageIds, setImageIds] = useState();

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
          {imageIds &&
            imageIds.map((imageId: string, index: number) => (
                <Image
                  key={index}
                  cloudName={'aarncloud'}
                  publicId={imageId}
                  width="300"
                  crop="scale"
                />
            ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
