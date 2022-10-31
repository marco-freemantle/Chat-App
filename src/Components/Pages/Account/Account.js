import "./Account.css";
import NavBar from "../../Navigation/NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Account() {
  const [displayName, setDisplayName] = useState("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [canSaveChanges, setCanSaveChanges] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth();
  const navigate = useNavigate();

  //Get user account info
  useEffect(() => {
    setDisplayName(auth.currentUser.displayName);

    utilities.searchForUser(auth.currentUser.displayName).then((user) => {
      setBio(user.bio);
      setUpdatedBio(user.bio);
      setUpdatedDisplayName(auth.currentUser.displayName);
    });

    utilities.changeDisplayPicURL(
      auth.currentUser.uid,
      auth.currentUser.photoURL
    );
  }, []);

  function toggleEnableButton(bool) {
    setCanSaveChanges(bool);
  }

  function saveProfileChanges(event) {
    event.preventDefault();
    //Change user displayname
    updateProfile(auth.currentUser, {
      displayName: updatedDisplayName,
    }).then((e) => {
      //Change displayname in firestore
      utilities
        .changeDisplayName(auth.currentUser.uid, updatedDisplayName)
        .then(() => {
          setDisplayName(updatedDisplayName);
          toggleEnableButton(false);
        });
    });
    utilities.changeBio(auth.currentUser.uid, updatedBio);
  }

  function handlePictureUpload(event) {
    utilities.changeProfilePicture(auth.currentUser.uid, event.target.files[0]);
  }

  function deleteUser(event) {
    event.preventDefault();
    const auth = getAuth();
    utilities.deleteUser(auth.currentUser.uid, email, password);
  }

  return (
    <div className="account-page">
      <NavBar />
      <div className="account-page-main-container">
        <h1 className="account-page-title">Account</h1>
        <div className="account-page-section">
          <div className="account-page-section-image-container">
            <img
              src={
                auth.currentUser.photoURL === null
                  ? require("../../../face.jpg")
                  : auth.currentUser.photoURL
              }
              alt={"profile pic"}
              className="account-profile-picture"
            />
            <div className="profile-picture-change-section">
              <Form.Label style={{ fontSize: "18px", color: "white" }}>
                Change Picture
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                className="profile-picture-select"
                onChange={handlePictureUpload}
              />
            </div>
          </div>
          <div className="name-and-bio-account-form-container">
            <Form className="account-update-form" onSubmit={saveProfileChanges}>
              <Form.Label style={{ fontSize: "18px", color: "white" }}>
                Display Name
              </Form.Label>
              <Form.Control
                minLength={4}
                maxLength={12}
                type="text"
                placeholder={displayName}
                id="name-input"
                style={{ marginBottom: "10px" }}
                onChange={(e) => {
                  toggleEnableButton(true);
                  setUpdatedDisplayName(e.target.value);
                }}
              />

              <Form.Label style={{ fontSize: "18px", color: "white" }}>
                Bio
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={bio}
                id="bio-input"
                maxLength={35}
                onChange={(e) => {
                  toggleEnableButton(true);
                  setUpdatedBio(e.target.value);
                }}
              />

              <br />
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "-10px" }}
                disabled={!canSaveChanges}
              >
                Save Changes
              </Button>
            </Form>
          </div>
        </div>

        <div className="delete-account-section">
          <h2 className="delete-account-section-title">Delete Account</h2>
          <Form onSubmit={deleteUser}>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your email"}
              id="email"
              className="delete-account-form-field"
            />
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter your password"}
              className="delete-account-form-field"
              id="password"
            />
            <br />
            <Button
              variant="primary"
              type="submit"
              className="delete-account-button"
            >
              Delete Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Account;
