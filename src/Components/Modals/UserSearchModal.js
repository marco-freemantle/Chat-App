import "./UserSearchModal.css";
import Modal from "react-bootstrap/Modal";
import * as utilities from "../../Utilities/FireStoreUtilities";
import React, { useState } from "react";
import FoundUserCard from "../Cards/FoundUserCard";

function UserSearchModal(props) {
  const [userFound, setUserFound] = useState(false);

  function searchForUser(event) {
    utilities.searchForUser(event.target.value).then((user) => {
      setUserFound(user);
    });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="user-search-modal"
      centered
    >
      <Modal.Header closeButton className="user-search-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "aliceblue" }}
        >
          Search for a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-search-modal-body">
        <input
          placeholder="Search"
          className="user-search-modal-input"
          onChange={searchForUser}
        ></input>
        {userFound ? (
          <FoundUserCard
            userName={userFound.displayName}
            bio={userFound.bio}
            userId={userFound.userId}
            startNewChat={props.onHide}
            pictureURL={userFound.displayPicURL}
          />
        ) : (
          <div></div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default UserSearchModal;
