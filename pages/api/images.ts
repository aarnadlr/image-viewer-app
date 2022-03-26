import type { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../utils/cloudinary';

const images = async (req: NextApiRequest, res: NextApiResponse) => {
  const { resources } = await cloudinary.search
    .expression('folder:img-folder1')
    // include context metadata
    .with_field('context')
    .sort_by('uploaded_at', 'desc')
    .max_results(50)
    .execute();
  // .then((result: any) => console.log(result));

  // publicId: path string ie "img-folder1/z1zds5je9ccglocehekm"
  // const publicIds = resources.map(
  //   (file: { public_id: string }) => file.public_id
  // );

  res.send(resources);
};

export default images;
