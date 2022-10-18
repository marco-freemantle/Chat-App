import "./Message.css";
import { getAuth } from "firebase/auth";

function Message(props) {
  const auth = getAuth();

  if (props.senderId === auth.currentUser.uid) {
    return (
      <div className="sentBubble">
        <p className="sentMessage-name">{auth.currentUser.displayName}</p>
        <hr className="message-split" />
        <p className="sentMessage">{props.message}</p>
      </div>
    );
  } else {
    return (
      <div className="receivedBubble">
        <p className="receivedMessage-name">{props.recipientDisplayName}</p>
        <hr className="message-split" />
        <p className="receivedMessage">{props.message}</p>
      </div>
    );
  }
}

export default Message;
