import React, { useState, useRef } from 'react';

function PictureUploader() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      alert('Please upload a valid image file!');
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // open hidden file input
  };

  return (
    <div className="picture-uploader">

      <div className="avatar-preview" onClick={handleClick}>
        {image ? (
          <img src={image} alt="Profile Preview" />
        ) : (
          <div className="placeholder">Click to Upload</div>
        )}
      </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        style={{ display: 'none' }} // HIDE the input
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default PictureUploader;
