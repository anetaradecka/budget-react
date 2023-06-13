import SecondaryNav from "./SecondaryNav";
import DropDown from "./DropDown";

const PanelTop = (props) => {
  const dropdownChangeHandler = (selectedMonth) => {
    console.log(selectedMonth + ' from PanelTop.js');
    props.onFilterChange(selectedMonth);
  };

  return (
    <header>
      <div>
        <h1>Best Finance App</h1>
        <SecondaryNav />
      </div>
      <div>
        <h3>Transaction history</h3>
        <DropDown onFilterChange={dropdownChangeHandler} />
      </div>
    </header>
  );
};

export default PanelTop;
