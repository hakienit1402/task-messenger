import React, { useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
const HomePage = (props) => {
  return (
    <section className="container">
      <div className="listOfUsers"></div>

      <div className="chatArea">
        <div className="chatHeader"></div>
        <div className="messageSections"></div>

        <div className="chatControls">
          <textarea placeholder="Write Message" />
          <button>Send</button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
