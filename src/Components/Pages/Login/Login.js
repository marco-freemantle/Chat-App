import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import React, { useState } from "react";

/**
 * @returns The login page
 */
function Login() {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if an login error occurs
  const [loginError, setLoginError] = useState(false);

  /**
   * Logs in users and sets their authentication persistence
   */
  function setAuthPersistence(event) {
    event.preventDefault();
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with local persistence.
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            //Should use <Link/> instead
            window.location.pathname = "/";
          })
          .catch(() => {
            setLoginError(true);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="login-page-flexbox">
      <div className="main-content-login">
        <h1 className="form-title-login">Login to Chat-App!</h1>
        <p className="form-subtitle-login">
          Login using your email and password
        </p>
        <Form className="login-form" onSubmit={setAuthPersistence}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="login-email-field"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="login-password-field"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" className="login-button" type="submit">
            Sign In
          </Button>

          {loginError && (
            <p className="error-message-login">Incorrect email or password</p>
          )}
        </Form>
      </div>
      <div className="sidebar-signup">
        <h1 className="sidebar-signup-title">New Here?</h1>
        <p className="sidebar-signup-text">
          Signup now to discover our amazing messaging service!
        </p>
        <p className="sidebar-signup-text">It's completely free!</p>
        <div className="sidebar-signup-button-container">
          <Link to="/signup">
            <Button variant="primary" className="sidebar-signup-button">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
