import { useState } from 'react';
import { uploadToCloudinary } from './UploadCloudinary';

const useCloudinaryUpload = () => {
  const [uploadedUrls, setUploadedUrls] = useState([]);
  
  const handleUpload = async (photos) => {
    let cloudinaryUrls = photos.length === 1 ? '' : []; 
    for (let photo of photos) {
        const cloudinaryResponse = await uploadToCloudinary(photo);
        if (cloudinaryResponse) {
            const photoData = {
                public_id: cloudinaryResponse.public_id,
                version: cloudinaryResponse.version,
                signature: cloudinaryResponse.signature,
                url: cloudinaryResponse.url
            };
            if (photos.length === 1) {
                cloudinaryUrls = photoData.url;
            } else {
                cloudinaryUrls.push(photoData.url);
            }
        }
    }
    setUploadedUrls(cloudinaryUrls);
    return cloudinaryUrls;
};


  return { uploadedUrls, handleUpload };
}

export default useCloudinaryUpload;
