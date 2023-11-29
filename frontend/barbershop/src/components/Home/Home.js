import React, { useState } from "react";
import Button from "../Button/Button";
import Registration from "../Modals/Registration/Registration";
import { useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleRegButton() {
    setIsModalOpen((prev) => !prev);
  }

  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>MEN'S CAVE</h1>
      <div className={styles.makingGap}>
        <Button onClick={handleRegButton} buttonName={"REGISTRACIJA"} />
        <Registration
          open={isModalOpen}
          title={Registration}
          onClose={() => setIsModalOpen(false)}
        />
        <Button onClick={(e) => navigate("/clients")} buttonName={"DKDT"} />
      </div>
    </div>
  );
}
