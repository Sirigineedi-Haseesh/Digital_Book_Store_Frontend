import React from 'react';

const PageHeader = ({ title }) => {
  return (
    <div className="text-start mb-4">
      <img src="logo.jpg" alt="Book Store" width="50" height="50" />
      <label style={{ fontFamily: 'Times New Roman', marginLeft: '10px' }}>{title}</label>
    </div>
  );
};

export default PageHeader;