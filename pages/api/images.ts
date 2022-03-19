import type { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../utils/cloudinary';

const images = async (req: NextApiRequest, res: NextApiResponse) => {
  const { resources } = await cloudinary.search
    .expression('folder:img-folder1')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map(
    (file: { public_id: string }) => file.public_id
  );
  res.send(publicIds);
};

export default images;
