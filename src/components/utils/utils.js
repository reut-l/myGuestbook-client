import rekognition from '../../apis/rekognition';
import myGuestBookAPI from '../../apis/appServer';

// Check for my pictures in the collection using the AWS Rekognition API
export const recognizeMe = async (blob, collectionName) => {
  const formData = new FormData();
  formData.append('photo', blob, 'Face');

  try {
    const response = await rekognition.post(
      `/collections/${collectionName}/face`,
      formData
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

// Check if a user is a guest by checking if his phone number is in an event guests phones list
export const checkIsGuest = async (eventId, phoneNumber) => {
  let phone = phoneNumber.replace(/ /g, '');
  phone = phone.replace('+', '%2B');

  const response = await myGuestBookAPI.get(
    `/events/${eventId}/searchGuest?phone=${phone}`
  );

  if (response.data.results === 1) return true;
  return false;
};

// Phone verification Step 1: Send a code to the phone number via an SMS
export const getCode = async (phone) => {
  const phoneNumber = phone.replace(/ /g, '');

  const response = await myGuestBookAPI.get(
    `/users/getPhoneCode?phonenumber=${phoneNumber}&channel=sms`
  );
  return response.data.status === 'success' ? true : false;
};

// Phone verification Step 2: Verify the inserted code (check if matched the code sent to this phone number)
export const verifyCode = async (code, phone) => {
  const phoneNumber = phone.replace(/ /g, '');

  const response = await myGuestBookAPI.get(
    `/users/verifyPhoneCode?phonenumber=${phoneNumber}&code=${code}`
  );

  return response.data.data.status === 'approved' ? true : false;
};
