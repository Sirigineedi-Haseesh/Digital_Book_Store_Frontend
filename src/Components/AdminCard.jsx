import React from 'react';

const AdminCard = ({ imageSrc, title, buttonText, buttonLink }) => {
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-body">
          <img src={imageSrc} alt={title} width="150" height="150" style={{ borderRadius: '30px' }} />
          <h5 className="card-title">{title}</h5>
          <a href={buttonLink} className="btn btn-success w-100">{buttonText}</a>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;