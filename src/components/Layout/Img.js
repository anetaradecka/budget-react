import styles from "./Layout.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Image = () => {
  return (
    <div className={styles["grid-cell"]}>
      <FontAwesomeIcon icon={faImage} className={styles.fontawesome} />
    </div>
  );
};

export default Image;
