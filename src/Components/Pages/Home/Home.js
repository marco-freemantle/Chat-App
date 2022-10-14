import "./Home.css";
import NavBar from "../../Navigation/NavBar";
import SideBar from "../../SideBar";

function Home() {
  return (
    <div className="home-page">
      <NavBar />
      <div className="home-page-main-container">
        <SideBar />
      </div>
    </div>
  );
}

export default Home;
