import JSZip from 'jszip';
import { saveAs } from 'save-as';

const zip = new JSZip();
const count = 0;
const zipFilename = 'zippedImages.zip';

//checkedImagesArr
const checkedImagesArr = [
  {title: "Undersea Manta Ray", url: "https://res.cloudinary.com/aarncloud/image/upload/v1598424868/img-folder1/f4rnxftt1q1d37opnm72.jpg", public_id: "https://res.cloudinary.com/aarncloud/image/upload/v1598424868/img-folder1/f4rnxftt1q1d37opnm72.jpg"}
];

export const zipFiles = () => {

  // for each checkedImageObject
  checkedImagesArr.forEach(function (checkedImageObject) {

    let url = checkedImageObject.url

    let filename = 'filename';
    // loading a file and add it in a zip file

    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(filename, data, { binary: true });

      count++;

      if (count == checkedImagesArr.length) {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });
};
