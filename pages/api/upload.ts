import type { NextApiRequest, NextApiResponse } from 'next';
import {cloudinary} from '../../utils/cloudinary'

const upload = async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default',
    }, function (error: any, result: any) { console.log(result, error); });
    
    console.log('uploadResponse:', uploadResponse);

    res.json({ msg: 'success' });

} catch (err) {
    console.error("Error:",err);
    res.status(500).json({ err: 'Something went wrong' });
}
};

export default upload;
