import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./UpdateForm.module.css";

const ENDPOINT = "http://localhost:3001/clients";

export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const validateDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    return selectedDate >= currentDate;
  };

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  useEffect(() => {
    axios.get(`${ENDPOINT}/${id}`).then(({ data }) => {
      setName(data.name);
      setEmail(data.email);
      setRegistrationDate(data.registrationDate.replace("T", "").split(" ")[0]);
      setRegistrationTime(data.registrationTime);
    });
  }, [id]);

  const registerClient = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setDateError("");

    // Frontend validations
    if (!name.trim()) {
      setNameError("Reikalingas vardas");
      return;
    }

    if (!email.trim()) {
      setEmailError("Reikalingas email");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Neteisingas formatas");
      return;
    }

    if (!registrationDate) {
      setDateError("Registracijos data reikalinga");
      return;
    } else if (!validateDate(registrationDate)) {
      setDateError("Pasirinkite busima data");
      return;
    }

    if (!registrationTime) {
      setDateError("Registracijos laikas reikalingas");
      return;
    }
    await axios
      .put(`${ENDPOINT}/${id}`, {
        name,
        email,
        registrationDate,
        registrationTime,
      })
      .then(() => {
        alert("Atnaujinta sekmingai");
        navigate("/clients");
      })
      .catch(() => alert("Nepavyko"));
  };

  const handleCancelButtonClick = () => {
    // Use navigate to go to the "/clients" page
    navigate("/clients");
  };

  return (
    <div className={styles.container}>
      <form className={styles.formlol} onSubmit={registerClient}>
        <label htmlFor="name">Vardas</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kliento vardas"
        />
        {nameError && <p className={styles.errorText}>{nameError}</p>}
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Kliento email"
        />
        {emailError && <p className={styles.errorText}>{emailError}</p>}
        <br />
        <label htmlFor="date">Rezervacijos data</label>
        <input
          type="date"
          value={registrationDate}
          onChange={(e) => setRegistrationDate(e.target.value)}
        />
        {dateError && <p className={styles.errorText}>{dateError}</p>}
        <br />
        <label htmlFor="time">Rezervacijos laikas</label>
        <input
          type="time"
          value={registrationTime}
          onChange={(e) => setRegistrationTime(e.target.value)}
        />
        <br />
        <Button type="submit" buttonName={"ATNAUJINTI"} />
        <button
          className={styles.regFormButton}
          onClick={handleCancelButtonClick}
        >
          Close
        </button>
      </form>
    </div>
  );
}
