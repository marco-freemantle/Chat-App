import "./SideBar.css";
import ChatListUserCard from "./Cards/ChatListUserCard";

function SideBar() {
  return (
    <div className="sidebar">
      <input className="home-page-search-input" placeholder="Search"></input>
      <div className="chats-section">
        <p className="chat-lists-title">Private Chats</p>
        <hr className="chat-lists-title-line" />
        <div className="chats-scrollbox">
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
        </div>
      </div>
      <div className="chats-section">
        <p className="chat-lists-title">Group Chats</p>
        <hr className="chat-lists-title-line" />
        <div className="chats-scrollbox"></div>
      </div>
    </div>
  );
}

export default SideBar;
