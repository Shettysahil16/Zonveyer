import React, { createContext, useState, useContext } from "react";

const UserSearchContext = createContext();

export const UserSearchProvider = ({ children }) => {
  const [searchedUserDetails, setSearchedUserDetails] = useState([]);
  const [hasValue, setHasValue] = useState(false);

  return (
    <UserSearchContext.Provider
      value={{ searchedUserDetails, setSearchedUserDetails, hasValue, setHasValue }}
    >
      {children}
    </UserSearchContext.Provider>
  );
};

export const useUserSearch = () => useContext(UserSearchContext);
