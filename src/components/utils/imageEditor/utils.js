import rekognition from '../../../apis/rekognition';

export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const getImageFromUrl = (url) => {
  const img = url.substr(url.lastIndexOf('/') + 1);
  return img;
};

// Fetch image from AWS S3, when our app server serves as a proxy (to match CORS policy) and convert to local url
export const fetchImageLocalUrl = (url) => {
  const imageId = getImageFromUrl(url);

  return rekognition
    .get(`/image/${imageId}`, { responseType: 'blob' })
    .then((response) => {
      const url = URL.createObjectURL(new Blob([response.data]));
      return url;
    })
    .catch((er) => {
      console.error(er);
    });
};
