import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../ClientBooking/ClientBooking.module.css";

const endpoint = "http://localhost:3001/clients";

export default function ClientBOoking({ client, setClients }) {
  const navigate = useNavigate();

  function handleDelete() {
    axios
      .delete(`${endpoint}/${client._id}`)
      .then(() => {
        setClients((prev) => prev.filter((p) => p._id !== client._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdate() {
    navigate(`/clients/${client._id}`);
  }

  return (
    <tr className={styles.clientTable}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.registrationDate.split("T")[0]}</td>
      <td>{client.registrationTime}</td>
      <td>
        <button onClick={handleDelete}>ISTRINTI</button>
      </td>
      <td>
        <button onClick={handleUpdate}>ATNAUJINTI</button>
      </td>
    </tr>
  );
}
