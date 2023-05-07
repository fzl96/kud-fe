import { createContext, useContext, useState } from "react";

interface CategoriesContextProps {
  categories: any;
  setCategories: React.Dispatch<React.SetStateAction<any>>;
}

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: null,
  setCategories: () => {},
});

export function CategoriesProvider({ children }: any) {
  const [categories, setCategories] = useState<any>(null);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
