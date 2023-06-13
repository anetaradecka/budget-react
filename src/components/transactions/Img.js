import "./Transactions.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Image = () => {
  return (
    <div className="grid-cell">
      <FontAwesomeIcon icon={faImage} className="fontawesome" />
    </div>
  );
};

export default Image;
