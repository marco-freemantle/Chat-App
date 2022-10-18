import React, { useState, useEffect } from "react";
import "./SideBar.css";
import ChatListUserCard from "../Cards/ChatListUserCard.js";
import UserSearchModal from "../Modals/UserSearchModal";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

function SideBar(props) {
  const [modalShow, setModalShow] = useState(false);
  const [userContactList, setUserContactList] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(getFirestore(), "users", auth.currentUser.uid),
      (doc) => {
        setUserContactList(doc.data().contactList);
      }
    );
  }, []);

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

      <UserSearchModal
        show={modalShow}
        //onHide takes in a userId we want to open chat for (undefined if model was closed and not chat was opened)
        onHide={() => {
          setModalShow(false);
        }}
      />
      <div className="chats-section">
        <p className="chat-lists-title">Private Chats</p>
        <hr className="chat-lists-title-line" />
        <div className="chats-scrollbox">
          {userContactList.map((user) => (
            <ChatListUserCard
              userId={user.contactId}
              key={Math.random()}
              setChattingWith={props.setChattingWith}
            />
          ))}
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
