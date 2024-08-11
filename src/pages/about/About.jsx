import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./About.css";
export default function About() {
  const { user } = useContext(AuthContext);

  return (
    <div className="aboutUser">
      {user && (
        <div className="user">
          <p>FirstName: {user.firstName}</p>
          <p>LastName: {user.lastName}</p>
          <p>Gender: {user.gender}</p>
          <p>Age: {user.age}</p>
        </div>
      )}
    </div>
  );
}
