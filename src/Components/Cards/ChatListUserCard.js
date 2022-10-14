import "./ChatListUserCard.css";

function ChatListUserCard() {
  let lastMessage = "Hey there! What are your plans this weekend";
  if (lastMessage.length > 33) {
    lastMessage = lastMessage.substring(0, 32) + "...";
  }
  return (
    <div className="chatlist-usercard-flex">
      <div className="chatlist-usercard-image-container">
        <img src={require("../../face.jpg")} alt={"profile pic"} />
      </div>
      <div className="chatlist-usercard-name-last-message">
        <p className="chatlist-usercard-name">Marco Freemantle</p>
        <div className="chatlist-usercard-lastmessage">
          <p>{lastMessage}</p>
        </div>
        <hr className="chatlist-usercard-line" />
      </div>
    </div>
  );
}

export default ChatListUserCard;
