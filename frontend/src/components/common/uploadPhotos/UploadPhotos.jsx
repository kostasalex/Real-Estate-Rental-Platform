import React from 'react'

const UploadPhotos = ({photos, setPhotos, numOfPhotos, title}) => {

	const [notification, setNotification] = React.useState(''); 

    const handlePhotosChange = (event) => {
        const selectedPhotos = Array.from(event.target.files);

        if (photos.length + selectedPhotos.length > numOfPhotos) {
            let msg;
            if (numOfPhotos === 1)msg = "Remove the image before adding new";
            else msg = `You can upload a maximum of ${numOfPhotos} photos` ;
            
            setNotification(msg);
            return;
        }

        const validPhotos = selectedPhotos.filter((file) => {
            if (!file.type.startsWith('image/jpeg')) {
                setNotification('Invalid image format. Please upload a .jpg file.');
                return false;
            } else if (file.size > 200 * 1024) {
                setNotification(
                    <>
                        Image too large. Maximum file size is 200KB. 
                        <a href="https://www.simpleimageresizer.com/resize-image-to-200-kb" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                            Resize your image.
                        </a>
                    </>
                );
                return false;
            }
            
            return true;
        });

        if (validPhotos.length !== selectedPhotos.length) return; // Do not proceed if there's an invalid photo

        setNotification(''); // Reset notification if everything is okay
        setPhotos([...photos, ...validPhotos]);
    };

    const setThumbnail = (index) => {
        if (index !== 0) {
            setPhotos(prevPhotos => {
                let newPhotos = [...prevPhotos];
                [newPhotos[0], newPhotos[index]] = [newPhotos[index], newPhotos[0]]; // Swap positions
                return newPhotos;
            });
        }
    };

	const removePhoto = (index) => {
		setPhotos((prevPhotos) => {
			const updatedPhotos = [...prevPhotos];
			updatedPhotos.splice(index, 1);
			return updatedPhotos;
		});
	};


    return (
        <div>
            <form className="mt-5">
                <div className="mb-4">
                    <label htmlFor="upload" className="my-2 block text-gray-700 font-medium">
                        {title}
                    </label>
                    <input
                        type="file"
                        id="upload"
                        accept="image/jpeg"
                        multiple
                        className="mt-1"
                        onChange={handlePhotosChange}
                    />
                    <p className="text-sm text-gray-500">Accepted file type: JPEG. Max size: 200KB</p>
                    {notification && <p className="text-sm text-red-600 mt-1">{notification}</p>}

                </div>
            </form>
            <div className="flex flex-row space-x-4 mt-4">
            {photos && photos.map((photo, index) => {
                // Determine the source of the image
                const src = typeof photo === 'string' ? photo : URL.createObjectURL(photo);

                return (
                    <div key={index} className="relative">
                        {index === 0 && photos.length >= 2 && (
                            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-sm py-1 px-2">Selected Thumbnail</div>
                        )}
                        <img
                            src={src}
                            alt={`Photo ${index + 1}`}
                            className={`object-cover w-full h-40 rounded-lg ${index === 0 ? 'border-4 border-blue-500' : ''}`}
                            onClick={() => setThumbnail(index)}
                        />
                        <div
                            className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full text-white text-xs cursor-pointer"
                            onClick={() => removePhoto(index)}
                        >
                            <span className="text-white">X</span>
                        </div>
                    </div>
                );
            })}

            </div>
        </div>
    )
}

export default UploadPhotos