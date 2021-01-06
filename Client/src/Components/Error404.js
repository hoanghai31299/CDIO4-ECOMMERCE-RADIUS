import React from "react";
import Error404Image from "../assets/images/error-404.svg";
export default function Error404({ location }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <h3 style={{ color: "red", padding: "20px" }}>
        No match for <code>{location.pathname}</code>
      </h3>
      <img
        style={{
          height: "80vh",
          minWidth: "70vw",
          maxWidth: "80vw",
          marginBottom: "20px",
        }}
        src={Error404Image}
        alt="notfound"
      />
    </div>
  );
}
