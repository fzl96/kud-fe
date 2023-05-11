import { useRef } from "react";
import MyDocument from "../components/document";
import { useReactToPrint } from "react-to-print";

const Reports = () => {
  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <button onClick={handlePrint}>Print</button>
      <div ref={componentRef}>
        <MyDocument />
      </div>
    </>
  );
};
export default Reports;
