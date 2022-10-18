import "./ChatListUserCard.css";
import React, { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { CloseButton } from "react-bootstrap";
import { getAuth } from "firebase/auth";

function ChatListUserCard(props) {
  const [user, setUser] = useState();
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  useEffect(() => {
    utilities.getUserDataFromUserId(props.userId).then((user) => {
      setUser(user);
    });
  }, []);

  function removeContact() {
    utilities.removeContact(getAuth().currentUser.uid, props.userId);
  }

  function openChat() {
    props.setChattingWith(props.userId);
  }

  function handleRemoveButton(bool) {
    setShowRemoveButton(bool);
  }

  let lastMessage = "Hola! What are your plans this evening";
  if (lastMessage.length > 25) {
    lastMessage = lastMessage.substring(0, 28) + "...";
  }
  if (user) {
    return (
      <div
        className="chatlist-usercard-flex"
        onMouseEnter={() => handleRemoveButton(true)}
        onMouseLeave={() => handleRemoveButton(false)}
      >
        <button className="name-and-image-button" onClick={openChat}>
          <div className="chatlist-usercard-image-container">
            <img src={user.displayPicURL} alt={"profile pic"} />
          </div>
          <div className="name-and-message-container">
            <p className="chatlist-name">{user.displayName}</p>
            <p className="chatlist-lastmessage">{lastMessage}</p>
            <hr className="chatlist-usercard-line" />
          </div>
        </button>

        {/**Make it so this button only shows when main button is being hovered */}
        {showRemoveButton ? (
          <CloseButton
            className="remove-contact-button"
            variant="white"
            onClick={removeContact}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ChatListUserCard;
