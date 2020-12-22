import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  const [mute, setMute] = useState(true);
  const arrLinks = [
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572979/Radius-E/Bg-video/video_bg1_txtqlw.mp4",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572983/Radius-E/Bg-video/video_bg2_loq2pm.mp4",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572989/Radius-E/Bg-video/video_bg3_wrpjql.webm",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572993/Radius-E/Bg-video/video_bg4_l5inqp.mp4",
  ];
  return (
    <div className="home-page">
      <div className="video">
        {arrLinks.map((link) => {
          return (
            <video width="100%" autoplay muted loop autoPlay>
              <source src={link} type="video/mp4" />
            </video>
          );
        })}
      </div>
      <div className="text">
        <div onClick={() => setMute(!mute)} className="sound">
          <span>{mute ? "SOUND ON" : "SOUND OFF"}</span>
        </div>
        <div className="link">
          <Link to="/products/arrive">Arrive</Link>
          <Link to="/products/bestseller"> Best Seller</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
