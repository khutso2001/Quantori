import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Contact.css";
export default function Contact() {
  const { user } = useContext(AuthContext);

  return (
    <div className="aboutUser">
      {user && (
        <div className="user">
          <p>FirstName: {user.address.address}</p>
          <p>Currency: {user.bank.currency}</p>
          <p>City: {user.address.city}</p>
        </div>
      )}
    </div>
  );
}
