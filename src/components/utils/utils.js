import rekognition from '../../apis/rekognition';
import myGuestBookAPI from '../../apis/appServer';

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

export const checkIsGuest = async (eventId, phoneNumber) => {
  let phone = phoneNumber.replace(/ /g, '');
  phone = phone.replace('+', '%2B');

  const response = await myGuestBookAPI.get(
    `/events/${eventId}/searchGuest?phone=${phone}`
  );

  if (response.data.results === 1) return true;
  return false;
};

export const getCode = async (phone) => {
  const phoneNumber = phone.replace(/ /g, '');

  const response = await myGuestBookAPI.get(
    `/users/getPhoneCode?phonenumber=${phoneNumber}&channel=sms`
  );
  return response.data.status === 'success' ? true : false;
};

export const verifyCode = async (code, phone) => {
  const phoneNumber = phone.replace(/ /g, '');

  const response = await myGuestBookAPI.get(
    `/users/verifyPhoneCode?phonenumber=${phoneNumber}&code=${code}`
  );

  return response.data.data.status === 'approved' ? true : false;
};
