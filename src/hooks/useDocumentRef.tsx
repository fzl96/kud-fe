import { useRef } from "react";
import MyDocument from "../components/document";

const useDocumentRef = () => {
  const componentRef = useRef<any>(null);

  return { componentRef };
};
export default useDocumentRef;
