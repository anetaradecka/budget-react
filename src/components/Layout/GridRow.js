// styles
import styles from "./Layout.module.css";
// components
import Img from "./Img";
import Edit from "./Edit";
import Delete from "./Delete";
// utils
import { currencyFormatter, convertToLocaleDate } from "../../utils/formatting";

const GridRow = (props) => {
  return (
    <div className={styles["grid-row"]}>
      <Img />
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.description}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.category}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.subcategory}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {String(convertToLocaleDate(props.transaction.date))}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.type === "inflow"
          ? `+ ${currencyFormatter.format(props.transaction.value)} `
          : ""}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.type === "outflow"
          ? `- ${currencyFormatter.format(props.transaction.value)} `
          : ""}
      </div>
      <div className={`${styles["cell-edit"]} ${styles["grid-cell"]}`}>
        <Edit itemId={props.transaction._id} />
        <Delete itemId={props.transaction._id} onItemDelete={props.onDelete} />
      </div>
    </div>
  );
};

export default GridRow;
