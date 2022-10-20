import "./ChatListUserCard.css";
import React, { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { CloseButton } from "react-bootstrap";
import { getAuth } from "firebase/auth";

function ChatListUserCard(props) {
  const [user, setUser] = useState();
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [lastMessage, setLastMessage] = useState("Send a message!...");

  useEffect(() => {
    utilities.getUserDataFromUserId(props.userId).then((user) => {
      setUser(user);
      setLastMessage("Click here to send a message!");
      utilities
        .getConversation(getAuth().currentUser.uid, props.userId)
        .then((convo) => {
          if (!convo) return;
          let last = convo.messages.slice(-1);
          if (!last[0]) return;

          if (last[0].message.length > 25) {
            setLastMessage(last[0].message.substring(0, 25) + "...");
          } else {
            setLastMessage(last[0].message);
          }
        });
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

  if (user) {
    return (
      <div
        className="chatlist-usercard-flex"
        onMouseEnter={() => handleRemoveButton(true)}
        onMouseLeave={() => handleRemoveButton(false)}
      >
        <button className="name-and-image-button" onClick={openChat}>
          <div className="chatlist-usercard-image-container">
            <img
              src={
                user.displayPicURL === "" || user.displayPicURL === null
                  ? require("../../face.jpg")
                  : user.displayPicURL
              }
              alt={"profile pic"}
            />
            <hr className="chatlist-usercard-line" />
          </div>
          <div className="name-and-message-container">
            <p className="chatlist-name">{user.displayName}</p>
            <p className="chatlist-lastmessage">{lastMessage}</p>
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
