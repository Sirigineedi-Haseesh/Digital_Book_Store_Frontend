import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Added PropTypes for type-checking

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'John Doe', cart: [] }); // Initialize cart as an empty array

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Added PropTypes for UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
