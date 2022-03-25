import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';

const zip = new JSZip();
const count = 0;
const zipFilename = 'my-selected-images.zip';

export const zipFiles = (checkedImagesArr) => {

    checkedImagesArr.forEach(function (checkedImageObject) {
      
      let url = checkedImageObject.url;

      let filename = checkedImageObject.title;

      // load a file and add it to a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // handle the error
        }
        zip.file(filename+'.jpg', data, { binary: true });

        count++;

        if (count == checkedImagesArr.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
};
