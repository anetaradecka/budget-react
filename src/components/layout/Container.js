import styles from "./Container.module.css";

const Container = (props) => {
  return (
    <div class={styles.container}>{props.children}</div>
  );
};

export default Container;