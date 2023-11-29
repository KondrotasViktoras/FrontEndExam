import React from "react";
import styles from "../Button/Button.module.css";

export default function Button({ buttonName, onClick }) {
  return (
    <button className={styles.mainButton} onClick={onClick}>
      {buttonName}
    </button>
  );
}
