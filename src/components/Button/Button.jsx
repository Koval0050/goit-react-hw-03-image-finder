// LoadMore.js
import React from 'react';

const Button = ({ onClick }) => {
  return (
    <div className="LoadMore">
      <button onClick={onClick} className="Button">
        Load More
      </button>
    </div>
  );
};

export default Button;
