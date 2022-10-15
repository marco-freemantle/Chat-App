import * as React from "react";
import "./SideBar.css";
import ChatListUserCard from "../Cards/ChatListUserCard.js";
import * as utilities from "../../Utilities/FireStoreUtilities";

function SideBar() {
  function searchForUser(event) {
    console.log(event.target.value);
    utilities.searchForUser(event.target.value);
  }

  return (
    <div className="sidebar">
      <input
        className="home-page-search-input"
        placeholder="Search"
        onChange={searchForUser}
      ></input>
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
        <div className="chats-scrollbox">
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
          <ChatListUserCard />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
