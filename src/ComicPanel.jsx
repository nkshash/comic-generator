import React, { useState } from 'react';
const ComicPanel = ({ image, altText, panelText }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
      {image && (
        <img
          src={image}
          alt={altText}
          style={{ maxWidth: '100%' }}
          onLoad={handleImageLoad}
        />
      )}
      {isImageLoaded && panelText && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '1px',
            borderRadius: '5px',
          }}
        >
          {panelText}
        </div>
      )}
    </div>
  );
};
export default ComicPanel;