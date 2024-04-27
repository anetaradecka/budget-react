import styles from "./Main.module.css";

const Main = (props) => {
  return (
    <section id={styles.main}>{props.children}</section>
  );
};

export default Main;