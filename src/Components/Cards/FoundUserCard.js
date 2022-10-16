import "./FoundUserCard.css";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";

function FoundUserCard(props) {
  const auth = getAuth();

  return (
    <div className="found-user-card-container">
      <p className="found-user-title">{props.userName}</p>
      <div className="found-user-card-image-container">
        <img
          src={
            auth.currentUser.photoURL === null
              ? require("../../face.jpg")
              : auth.currentUser.photoURL
          }
          alt={"profile pic"}
        />
      </div>
      <div className="bio-and-buttons-container">
        <p>{props.bio}</p>
        <button>Add Friend</button>
      </div>
    </div>
  );
}

export default FoundUserCard;
