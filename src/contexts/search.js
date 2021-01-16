import React, { createContext, useState } from "react";

const SearchInputContext = createContext({
  state: { input: "", headerColor: "white" },
  actions: {
    setInput: () => {},
  },
});

const SearchInputContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [headerColor , setHeaderColor] = useState("white");
  const value = {
    state: { input,headerColor },
    actions: { setInput,setHeaderColor },
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
