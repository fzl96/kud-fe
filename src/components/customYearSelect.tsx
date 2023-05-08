import Select from "react-select";
import { useState } from "react";

interface Props {
  year: any;
  setYear: React.Dispatch<React.SetStateAction<any>>;
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    padding: "0.2rem 0.3rem 0 0.3rem",
  }),
  control: (provided: any) => ({
    ...provided,
    padding: "0.2rem 0.2rem",
    fontSize: "1rem",
    borderRadius: "20px",
    fontWeight: 600,
    border: "none",
    outline: "none",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#d7dde4" : "white",
    borderRadius: "0.2rem",
    marginBottom: "0.4rem",
    color: "black",
    "&:hover": {
      backgroundColor: "#d7dde4",
    },
  }),
};

export default function CustomYearSelect({ year, setYear }: Props) {
  const [selectedYear, setSelectedYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear().toString(),
  });

  // Handle select change event
  const handleSelectChange = (selectedOption: any) => {
    setSelectedYear(selectedOption);
    setYear(selectedOption.value);
  };

  // Create options for the past 10 years
  const yearOptions = [];
  for (let i = 0; i <= 10; i++) {
    const year = new Date().getFullYear() - i;
    yearOptions.push({
      value: year,
      label: year.toString(),
    });
  }

  return (
    <div className="z-[]">
      <Select
        value={selectedYear}
        options={yearOptions}
        onChange={handleSelectChange}
        styles={customStyles}
        isSearchable={false}
        className="rounded-md shadow-sm border-2 border-[#a285e1] bg-white text-gray-700 sm:text-sm text-lg focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
      />
    </div>
  );
}
