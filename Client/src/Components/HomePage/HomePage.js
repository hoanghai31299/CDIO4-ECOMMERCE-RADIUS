import React from "react";
import "./HomePage.css";
function HomePage() {
  const arrLinks = [
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572979/Radius-E/Bg-video/video_bg1_txtqlw.mp4",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572983/Radius-E/Bg-video/video_bg2_loq2pm.mp4",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572989/Radius-E/Bg-video/video_bg3_wrpjql.webm",
    "https://res.cloudinary.com/hoanghai/video/upload/v1608572993/Radius-E/Bg-video/video_bg4_l5inqp.mp4",
  ];
  return (
    <div className="home-page">
      {arrLinks.map((link) => {
        return (
          <video width="100%" autoplay muted loop autoPlay id="myVideo">
            <source src={link} type="video/mp4" />
          </video>
        );
      })}
    </div>
  );
}

export default HomePage;
