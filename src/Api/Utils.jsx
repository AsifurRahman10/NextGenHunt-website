import axios from "axios";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "test_01");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dsa8ooidh/image/upload`,
    formData
  );
  return data.url;
  //   const response = await axios.post("", formData);
  //   const image = response.data.url;
};
