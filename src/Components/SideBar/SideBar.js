import React, { useState } from "react";
import "./SideBar.css";
import ChatListUserCard from "../Cards/ChatListUserCard.js";
import * as utilities from "../../Utilities/FireStoreUtilities";
import UserSearchModal from "../Modals/UserSearchModal";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";

function SideBar() {
  const [modalShow, setModalShow] = useState(false);

  function searchForUser(event) {
    console.log(event.target.value);
    utilities.searchForUser(event.target.value);
  }

  return (
    <div className="sidebar">
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        bsPrefix="home-page-search-button"
      >
        <div className="search-button-flex">
          <p className="home-page-search-button-text">Search</p>
          <FaSearch size={15} className="search-button-icon" />
        </div>
      </Button>

      <UserSearchModal show={modalShow} onHide={() => setModalShow(false)} />
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
