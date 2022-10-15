import "./ChatBox.css";
import { FaPaperPlane } from "react-icons/fa";

function ChatBox() {
  return (
    <div className="chatbox">
      <p className="chatbox-title">You are chatting with Marco!</p>
      <hr className="chat-lists-title-line" />
      <div className="chatbox-scrollbox"></div>
      <div className="input-and-send-flexbox">
        <input className="chatbox-input" placeholder="Message"></input>
        <FaPaperPlane className="send-message-button" size={35} />
      </div>
    </div>
  );
}

export default ChatBox;
