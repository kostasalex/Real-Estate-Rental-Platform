import axios from 'axios';

const api_key = "356718767956265";
const cloud_name = "drijmbypg";

const uploadToCloudinary = async (file) => {
  const signatureResponse = await axios.get("https://localhost:8443/get-signature");

  const data = new FormData();
  data.append("file", file);
  data.append("api_key", api_key);
  data.append("signature", signatureResponse.data.signature);
  data.append("timestamp", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return cloudinaryResponse.data;
};

export { uploadToCloudinary };
