import { createContext, useContext, useState } from "react";

const InstituteContext = createContext();

export const InstituteProvider = ({ children }) => {
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  return (
    <InstituteContext.Provider
      value={{ selectedInstitute, setSelectedInstitute }}
    >
      {children}
    </InstituteContext.Provider>
  );
};

export const useInstitute = () => useContext(InstituteContext);