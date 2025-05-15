import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    message && (
      <div className="alert alert-danger text-center">
        {message}
      </div>
    )
  );
};

export default ErrorAlert;