import { useState } from "react";
import API from "../api";

export default function CreateTicket() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTicket = async () => {

    const token = localStorage.getItem("token");

    try {

      await API.post(
        "tickets/",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ticket Created");

      window.location.href = "/dashboard";

    } catch (err) {
      alert("Error Creating Ticket");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Ticket</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        rows="5"
        cols="40"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createTicket}>
        Submit Ticket
      </button>
    </div>
  );
}