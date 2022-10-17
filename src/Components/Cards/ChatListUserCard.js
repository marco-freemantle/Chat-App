import "./ChatListUserCard.css";
import React, { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { Button, CloseButton } from "react-bootstrap";
import { getAuth } from "firebase/auth";

function ChatListUserCard(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    utilities.getUserDataFromUserId(props.userId).then((user) => {
      setUser(user);
    });
  }, []);

  function removeContact() {
    utilities.removeContact(getAuth().currentUser.uid, props.userId);
  }

  let lastMessage = "Hey there! What are your plans this weekend";
  if (lastMessage.length > 33) {
    lastMessage = lastMessage.substring(0, 32) + "...";
  }
  if (user) {
    return (
      <div className="chatlist-usercard-flex">
        <div className="chatlist-usercard-image-container">
          <img src={user.displayPicURL} alt={"profile pic"} />
        </div>
        <div className="chatlist-usercard-name-last-message">
          <p className="chatlist-usercard-name">{user.displayName}</p>
          <CloseButton
            className="remove-contact-button"
            onClick={removeContact}
          />
          <div className="chatlist-usercard-lastmessage">
            <p>{lastMessage}</p>
          </div>
          <hr className="chatlist-usercard-line" />
        </div>
      </div>
    );
  }
}

export default ChatListUserCard;
