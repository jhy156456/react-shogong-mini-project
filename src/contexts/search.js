import React, { createContext, useState } from "react";

const SearchInputContext = createContext({
  state: { input: "" },
  actions: {
    setInput: () => {},
  },
});

const SearchInputContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const value = {
    state: { input },
    actions: { setInput },
  }
  return (
    <SearchInputContext.Provider value={value}>
      {children}
    </SearchInputContext.Provider>
  );
};

const SearchInputConsumer = SearchInputContext.Consumer;

export { SearchInputContextProvider, SearchInputConsumer };
export default SearchInputContext;
