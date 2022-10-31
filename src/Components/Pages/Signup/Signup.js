import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";

/**
 * @returns The user signup page
 */
function Signup() {
  //State for email, password and display name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  //State for if an signup error occurs
  const [signupError, setSignupError] = useState("");

  /**
   * Handles account creation with firebase
   */
  function createUserAccount(event) {
    event.preventDefault();
    //Check if username is taken
    utilities.checkDisplayName(displayName).then((isTaken) => {
      if (isTaken) {
        setSignupError("Display name is taken");
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              displayName: displayName,
            }).then(() => {
              //Adds user to Firestore database
              utilities
                .addUser(auth.currentUser.uid, auth.currentUser.displayName)
                .then(() => {
                  //Switches to home screen upon account creation
                  window.location.pathname = "/Chat-App";
                });
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            setSignupError(errorMessage);
          });
      }
    });
  }

  /**
   * Gets the appropriate error message for the signup error
   * @return The signup error message
   */
  function getSignupErrorMessage() {
    if (signupError === "Firebase: Error (auth/email-already-in-use).") {
      return <p className="error-message-signup">Email already in use</p>;
    } else if (signupError === "Firebase: Error (auth/invalid-email).") {
      return <p className="error-message-signup">Invalid email</p>;
    } else if (
      signupError ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return <p className="error-message-signup">Password is too weak</p>;
    } else if (signupError === "Firebase: Error (auth/missing-password).") {
      return <p className="error-message-signup">Password is missing</p>;
    } else if (signupError === "Firebase: Error (auth/missing-email).") {
      return <p className="error-message-signup">Email is missing</p>;
    } else if (signupError === "Username is too short") {
      return <p className="error-message-signup">Username is too short</p>;
    } else if (signupError === "Display name is taken") {
      return <p className="error-message-signup">Display name is taken</p>;
    }
  }

  return (
    <div className="signup-page-flexbox">
      <div className="main-content">
        <h1 className="form-title-login">Signup For Chat-App!</h1>
        <p className="form-subtitle-login">
          Signup using an email and password. It's Free!
        </p>
        <Form className="signup-form" onSubmit={createUserAccount}>
          <Form.Group controlId="formBasicName" className="signup-formgroup">
            <Form.Control
              minLength={4}
              maxLength={12}
              className="signup-displayname-field"
              type="text"
              placeholder="Enter display name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Form.Text className="text-muted-signup">
              It must be unique!
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="signup-formgroup">
            <Form.Control
              className="signup-email-field"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted-signup">
              We'll never share your email with anyone else!
            </Form.Text>
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="signup-formgroup"
          >
            <Form.Control
              className="signup-password-field"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted-signup">Make it strong!</Form.Text>
          </Form.Group>

          <Button type="submit" variant="primary" className="signup-button">
            Signup
          </Button>

          {getSignupErrorMessage()}
        </Form>
      </div>
      <div className="sidebar-signup">
        <h1 className="sidebar-signup-title">Have An Account?</h1>
        <p className="sidebar-signup-text">Welcome back!</p>
        <p className="sidebar-signup-text">
          Click below to sign in to your Chat-App account
        </p>
        <div className="sidebar-signup-button-container">
          <Link to="/login">
            <Button variant="primary" className="sidebar-signup-button">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
