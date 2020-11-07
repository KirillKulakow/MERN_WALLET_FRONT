import React from "react";
import styles from "./AddButton.module.css";
const AddButton = ({ modalOpener }) => {
  return (
    <button className={styles.button} onClick={() => modalOpener()}>
      +
    </button>
  );
};

export default AddButton;
