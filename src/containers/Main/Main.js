import React, { useEffect, useState } from "react";
import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealtimeUsers,
  updateMessage,
  getRealtimeConversations,
} from "../../actions";

import { Dropdown } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";

const ChatHeader = () => {
  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-lg-6">
          <a
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#view_info"
          >
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="avatar"
            />
          </a>
          <div className="chat-about">
            <h6 className="m-b-0">Aiden Chavez</h6>
            <small>Last seen: 2 hours ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatHistory = () => {
  return (
    <div className="chat-history">
      <ul className="m-b-0">
        <li className="clearfix">
          <div className="message-data text-right">
            <span className="message-data-time">10:10 AM, Today</span>
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="avatar"
            />
          </div>
          <div className="message other-message float-right">
            {" "}
            Hi Aiden, how are you? How is the project coming along?{" "}
          </div>
        </li>
        <li className="clearfix">
          <div className="message-data">
            <span className="message-data-time">10:12 AM, Today</span>
          </div>
          <div className="message my-message">Are we meeting today?</div>
        </li>
        <li className="clearfix">
          <div className="message-data">
            <span className="message-data-time">10:15 AM, Today</span>
          </div>
          <div className="message my-message">
            Project has been already finished and I have results to show you.
          </div>
        </li>
      </ul>
    </div>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;
  //   useEffect(() => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     unsubscribe = dispatch(getRealtimeUsers(auth.uid))
  //       .then((unsubscribe) => {
  //         return unsubscribe;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     return () => {
  //       //cleanup
  //       unsubscribe.then((f) => f()).catch((error) => console.log(error));
  //     };
  //   }, []);
  const initChat = (user) => {
    console.log("z");
    // setChatStarted(true)
    // setChatUser(`${user.firstName} ${user.lastName}`)
    // setUserUid(user.uid);

    // console.log(user);

    // dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };
  return (
    <div className="container main-mess">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="row header-list"></div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                <li className="clearfix" onClick={initChat}>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Vincent Porter</div>
                    <div className="status">
                      <i className="fa fa-circle offline" /> left 7 mins ago{" "}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="chat">
              <ChatHeader />
             <ChatHistory/>
              <div className="row reply">
                <div className="col-sm-1 col-xs-1 reply-emojis">
                  <i className="fa fa-smile-o fa-2x" />
                </div>
                <div className="col-sm-9 col-xs-9 reply-main">
                  <textarea
                    className="form-control"
                    rows={1}
                    id="comment"
                    defaultValue={""}
                  />
                </div>
                <div className="col-sm-1 col-xs-1 reply-send">
                  <i className="fa fa-send fa-2x" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
