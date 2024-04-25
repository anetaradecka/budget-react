import Container from "../../components/layout/Container";
import styles from "./TransactionsGrid.module.css";
import ButtonSecondary from "../../components/UI/buttons/ButtonSecondary";
import { useState } from "react";
import Modal from "../../components/UI/Modal";

const AddTransaction = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClick = () => {
    setModalVisible(false);
  };

  const handleTransactionSubmit = (data) => {
    props.onTransactionSubmit(data);
    setModalVisible(false);
  };

  return (
    <>
      <Container>
        <Modal
          onModalClose={handleModalClick}
          modalVisible={modalVisible}
          onTransactionSubmit={handleTransactionSubmit}
        />
        <section className={styles["add-transaction"]}>
          <div className={styles["grid-2-columns"]}>
            This is your transactions section, where you can add new inflows and
            outflows to take controle over your budget. Click the button to
            start.
          </div>
          <div className={styles["grid-2-columns"]}>
            <ButtonSecondary onClick={handleButtonClick}>
              + Add transaction
            </ButtonSecondary>
          </div>
        </section>
      </Container>
    </>
  );
};

export default AddTransaction;
