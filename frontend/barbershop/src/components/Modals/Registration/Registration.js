import React from "react";
import { createPortal } from "react-dom";
import RegistrationForm from "../../RegistrationForm/RegistrationForm";
import styles from "./Registration.module.css";

export default function Registration({ open, onClose }) {
  if (!open) {
    return null;
  }
  return createPortal(
    <div className={styles.close}>
      <div>
        <RegistrationForm />
      </div>
      <button className={styles.regFormButton} onClick={onClose}>
        Close
      </button>
    </div>,
    document.body
  );
}
