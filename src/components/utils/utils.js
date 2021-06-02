import rekognition from '../../apis/rekognition';

export const recognizeMe = async (blob, collectionName) => {
  const formData = new FormData();
  formData.append('photo', blob, 'Face');

  const response = await rekognition.post(
    `/collections/${collectionName}/face`,
    formData
  );

  console.log(response);
  if (response.status !== 200) {
    return {
      success: false,
      data: `Request failed with status code ${response.status}`,
    };
  }

  return response.data;
};
