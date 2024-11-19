import React, { createContext, useState } from 'react';

export const EmailContext = createContext({
  email: '', 
  setEmail: () => {}
});

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};