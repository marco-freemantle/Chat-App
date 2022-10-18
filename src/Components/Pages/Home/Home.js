import "./Home.css";
import NavBar from "../../Navigation/NavBar";
import SideBar from "../../SideBar/SideBar";
import ChatBox from "../../ChatBox/ChatBox";
import React, { useState } from "react";

function Home() {
  const [chattingWith, setChattingWith] = useState();

  return (
    <div className="home-page">
      <NavBar />
      <div className="home-page-main-container">
        <SideBar setChattingWith={setChattingWith} />

        <ChatBox chattingWith={chattingWith} />
      </div>
    </div>
  );
}

export default Home;
