import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, onClick }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={event => {
        event.stopPropagation(); // Prevent click event from propagating up to the parent elements
        onClick(); // Call the onClick function from the ImageGallery component
      }}
    >
      <img className="ImageGalleryItem-image" src={imageUrl} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired, // Add the onClick prop type
};

export default ImageGalleryItem;
