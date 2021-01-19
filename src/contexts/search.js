import React, { createContext, useState } from "react";

const SearchInputContext = createContext({
  state: { input: "", username: "" },
  actions: {
    setInput: () => {},
    setUserName:()=>{},
  },
});

const SearchInputContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [username , setUserName] = useState("");
  const value = {
    state: { input,username },
    actions: { setInput,setUserName },
  };
  return (
    <SearchInputContext.Provider value={value}>
      {children}
    </SearchInputContext.Provider>
  );
};

const SearchInputConsumer = SearchInputContext.Consumer;

export { SearchInputContextProvider, SearchInputConsumer };
export default SearchInputContext;
