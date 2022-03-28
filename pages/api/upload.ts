import type { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../utils/cloudinary';

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fileStr = req.body.data;
    const title = req.body.title;
    const description = req.body.description;

    await cloudinary.uploader.upload(
      fileStr,
      {
          upload_preset: 'ml_default',
          context: `title=${title}|description=${description}`
      },
      function (error: {}, result: {}) {
        console.log(error, result);
      }
    );

    res.json({ msg: 'success' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

export default upload;
