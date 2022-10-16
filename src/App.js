import "./App.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Utilities/FireStoreUtilities";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import Account from "./Components/Pages/Account/Account";

//Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebaseAPIKey,
  authDomain: "chat-app-a56ef.firebaseapp.com",
  projectId: "chat-app-a56ef",
  storageBucket: "chat-app-a56ef.appspot.com",
  messagingSenderId: "852350334158",
  appId: "1:852350334158:web:b28be44fe585e9e36a8c9f",
  measurementId: "G-SQTHSLRWFW",
};

//Initialise firebase application
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

/**
 * @return Appropriate page depending on login status (uses react router)
 */
function App() {
  //Is the user currently logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Using useEffect to check if the user is logged in
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid);
          }
        });

        //User is logged in
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
      }
    });
  }, []);

  //If user is logged give full access to pages
  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }
}

export default App;
