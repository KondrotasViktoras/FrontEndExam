import React, { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import styles from "./RegistrationForm.module.css";

const ENDPOINT = "http://localhost:3001/clients";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeSlotError, setTimeSlotError] = useState("");

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    return selectedDate >= currentDate;
  };

  const validateTimeSlot = async () => {
    try {
      // Tikrinam ar yra kita registracija pasirinktu laiku
      const response = await axios.get(ENDPOINT, {
        params: {
          registrationDate,
          registrationTime,
        },
      });

      if (response.data.length > 0) {
        setTimeSlotError(
          "Sis laikas yra rezervuotas. Prasome pasirinkti kita laika"
        );
        return false;
      } else {
        setTimeSlotError("");
        return true;
      }
    } catch (error) {
      console.error("error:", error);
      return false;
    }
  };

  const registerClient = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setDateError("");
    setTimeSlotError("");

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

    // Check if the selected time slot is available
    const isTimeSlotAvailable = await validateTimeSlot();
    if (!isTimeSlotAvailable) {
      setTimeSlotError("Laikas uzimtas");
      return;
    }

    try {
      const { data } = await axios.post(ENDPOINT, {
        name,
        email,
        registrationDate,
        registrationTime,
      });
      alert("UZREGISTRUOTA");
      setName("");
      setEmail("");
      setRegistrationDate("");
      setRegistrationTime("");
    } catch (error) {
      alert("KAZKAS BLOGAI");
      console.log(error.response.data);
    }
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
        {timeSlotError && <p className={styles.errorText}>{timeSlotError}</p>}
        <br />
        <Button type="submit" buttonName={"Register"} />
      </form>
    </div>
  );
}
