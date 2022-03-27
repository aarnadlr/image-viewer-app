import type { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../utils/cloudinary';

const images = async (req: NextApiRequest, res: NextApiResponse) => {
  
  // fetch resources
  const { resources } = await cloudinary.search
    // in this folder
    .expression('folder:img-folder1')
    // include context metadata
    .with_field('context')
    .sort_by('uploaded_at', 'desc')
    .max_results(50)
    .execute();

  res.send(resources);
};

export default images;
