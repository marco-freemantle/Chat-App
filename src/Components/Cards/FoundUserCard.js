import "./FoundUserCard.css";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import * as utilities from "../../Utilities/FireStoreUtilities";

function FoundUserCard(props) {
  const auth = getAuth();

  function startNewChat() {
    //Add new contact to current user's contact list in firestore
    utilities
      .addContact(
        auth.currentUser.uid,
        props.userId,
        props.userName,
        props.pictureURL
      )
      .then(() => {
        //Close model and add new contact locally
        props.startNewChat(props.userId);
      });
  }

  return (
    <div className="found-user-card-container">
      <p className="found-user-title">{props.userName}</p>
      <div className="found-user-card-image-container">
        <img
          src={
            auth.currentUser.photoURL === null
              ? require("../../face.jpg")
              : props.pictureURL
          }
          alt={"profile pic"}
        />
      </div>
      <div className="bio-and-buttons-container">
        <p>{props.bio}</p>
        <button className="user-card-chat-button" onClick={startNewChat}>
          Open Chat
        </button>

        <button className="user-card-profile-button">Open Profile</button>
      </div>
    </div>
  );
}

export default FoundUserCard;
