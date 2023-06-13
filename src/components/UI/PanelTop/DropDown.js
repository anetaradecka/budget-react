import { useState, useEffect } from "react";

const DropDown = (props) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  console.log(selectedMonth + " from DropDown.js");

  // useEffect(() => {
  //   dropdownChangeHandler(selectedMonth);
  // }, []);

  const dropdownChangeHandler = (event) => {
    setSelectedMonth(event.target.value);
    const newSelectedMonth = event.target.value;
    props.onFilterChange(newSelectedMonth);
  };

  return (
    <div className="custom-select">
      <select onChange={dropdownChangeHandler}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="Mai">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="Oktober">Oktober</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <span className="custom-arrow"></span>
    </div>
  );
};

export default DropDown;
