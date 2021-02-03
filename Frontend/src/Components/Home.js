import React from "react";
import "./home.css";
import FakeCarousel from "../Assets/FakeCarouselImg.PNG";
import FakeBanner from "../Assets/FakeBanner.PNG";
function Home() {
  return (
    <div className="home">
      <img src={FakeCarousel} alt="" />
      <img className="home__fakeBanner" src={FakeBanner} alt="" />
    </div>
  );
}

export default Home;
