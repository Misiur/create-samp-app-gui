import React from 'react';

const CloseButton = ({ onClick }) => (
  <button
    type="button"
    className="close-button"
    onClick={onClick}
  ></button>
);

export default CloseButton;
