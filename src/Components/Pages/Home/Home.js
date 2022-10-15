import "./Home.css";
import NavBar from "../../Navigation/NavBar";
import SideBar from "../../SideBar/SideBar";
import ChatBox from "../../ChatBox/ChatBox";

function Home() {
  return (
    <div className="home-page">
      <NavBar />
      <div className="home-page-main-container">
        <SideBar />

        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
