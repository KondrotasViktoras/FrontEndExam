import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientBooking from "../ClientBooking/ClientBooking";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "../Bookings/Bookings.module.css";

const endpoint = "http://localhost:3001/clients";

export default function Bookings() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(endpoint)
      .then(({ data }) => setClients(data))
      .catch(() => alert("Klaida"));
  }, []);

  // Function to compare registration dates and times
  const compareRegistrationDates = (a, b) => {
    const dateA = new Date(a.registrationDate);
    const dateB = new Date(b.registrationDate);

    if (dateA.getTime() === dateB.getTime()) {
      // If dates are equal, compare registration times
      const timeA = a.registrationTime;
      const timeB = b.registrationTime;
      return timeA.localeCompare(timeB);
    }

    // If dates are not equal, compare only by dates
    return dateA - dateB;
  };

  // Sort the clients array by registration date and time
  const sortedClients = [...clients].sort(compareRegistrationDates);

  return (
    <div className={styles.container}>
      {" "}
      <Button onClick={(e) => navigate("/")} buttonName={"NAMAI"} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>VARDAS</th>
            <th>EMAIL</th>
            <th>DATA</th>
            <th>LAIKAS</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => {
            return (
              <ClientBooking
                setClients={setClients}
                client={client}
                key={client._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
