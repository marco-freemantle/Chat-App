import "./ChatBox.css";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import Message from "./Message";
import Form from "react-bootstrap/Form";

function ChatBox(props) {
  const [userData, setUserData] = useState();
  const [conversationId, setConversationId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");

  const auth = getAuth();

  useEffect(() => {
    //Get data of the user we are chatting with & store it in userData state
    utilities.getUserDataFromUserId(props.chattingWith).then((user) => {
      setUserData(user);
    });

    //Returns object where convoId is the unique identifier for this convo & messages are this convo's messages
    utilities
      .getConversation(auth.currentUser.uid, props.chattingWith)
      .then((convo) => {
        setConversationId(convo.convoId);
        setMessageList(convo.messages);

        //Set up document listener for this conversation
        if (convo) {
          const unsub = onSnapshot(
            doc(getFirestore(), "conversations", convo.convoId),
            (doc) => {
              setMessageList(doc.data().Messages);
            }
          );
        }
      });
  }, [props.chattingWith]);

  function sendMessage(event) {
    event.preventDefault();

    utilities.sendMessage(
      conversationId,
      auth.currentUser.uid,
      userData.userId,
      typedMessage
    );

    document.getElementById("formMessage").value = "";
  }

  if (userData && messageList) {
    return (
      <div className="chatbox">
        <p className="chatbox-title">
          You are chatting with {userData.displayName}!
        </p>
        <hr className="chat-lists-title-line" />
        <div className="chatbox-scrollbox">
          {messageList.map((message) => (
            <Message
              message={message.message}
              senderId={message.senderId}
              key={Math.random()}
              recipientDisplayName={userData.displayName}
            />
          ))}
        </div>
        <div>
          <Form onSubmit={sendMessage} className="message-form-flexbox">
            <Form.Group controlId="formMessage" className="message-input-group">
              <Form.Control
                type="text"
                placeholder="Message"
                onChange={(e) => setTypedMessage(e.target.value)}
                bsPrefix="message-input"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chatbox">
        <p className="chatbox-title">Start chatting!</p>
        <hr className="chat-lists-title-line" />
        <div className="chatbox-scrollbox"></div>
        <div className="input-and-send-flexbox">
          <Form onSubmit={sendMessage} className="message-form-flexbox">
            <Form.Group controlId="formMessage" className="message-input-group">
              <Form.Control
                type="text"
                placeholder="Message"
                onChange={(e) => setTypedMessage(e.target.value)}
                bsPrefix="message-input"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
