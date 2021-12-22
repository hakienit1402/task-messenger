import React, { useEffect, useState } from "react";
import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealtimeUsers,
  getRealtimeConversations,
  sendMessage,
} from "../../actions";

import { Dropdown } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { auth } from "../../firebase";

const ChatHeader = ({ name }) => {
  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-lg-6">
          <a data-toggle="modal" data-target="#view_info">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="avatar"
            />
          </a>
          <div className="chat-about">
            <h6 className="m-b-0">{name}</h6>
            <div className="status">
              <>
                <i className="fa fa-circle online" /> Online{" "}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatHistory = ({ conversations,uid }) => {
  return (
    <div className="chat-history">
      <ul className="m-b-0">
        {conversations.map((con, index) => (
          <li className="clearfix" key={index}>
          {con.user_uid_1 ===uid ?
          <>
            <div className="message-data text-right">
              <span className="message-data-time">{new Date(con.createAt.seconds*1000).toString()}</span>
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="avatar"
              />
            </div>
            <div className="message other-message float-right">{con.message}</div>
            </>
          :
          <>
          <div className="message-data">
            <span className="message-data-time">{new Date(con.createAt.seconds*1000).toString()}</span>
          </div>
          <div className="message my-message">{con.message}</div>
          </>
          }
           
          </li>
        ))}

        <li className="clearfix">
         
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);
  const initChat = (user) => {
    console.log("z");
    setChatStarted(true);
    setChatUser(user.name);
    setUserUid(user.uid);

    // console.log(user);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(sendMessage(msgObj)).then(() => {
        setMessage("");
      });
    }

    //console.log(msgObj);
  };

  return (
    <div className="container main-mess">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="row header-list"></div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {user.users.length > 0
                  ? user.users.map((user) => (
                      <li
                        className="clearfix"
                        onClick={() => initChat(user)}
                        key={user.uid}
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                        <div className="about">
                          <div className="name">{user.name}</div>
                          <div className="status">
                            {user.isOnline ? (
                              <>
                                <i className="fa fa-circle online" /> Online{" "}
                              </>
                            ) : (
                              <>
                                <i className="fa fa-circle offline" /> Offline{" "}
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="chat">
              {
                chatStarted ? (
                  <>
                    <ChatHeader name={chatUser} />
                    <ChatHistory conversations={user.conversations} uid={auth.uid} />
                    <div className="row reply">
                      <div className="col-sm-1 col-xs-1 reply-emojis">
                        <i className="fa fa-smile-o fa-2x" />
                      </div>
                      <div className="col-sm-9 col-xs-9 reply-main">
                        <textarea
                          className="form-control"
                          rows={1}
                          id="comment"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write Message"
                        />
                      </div>
                      <div
                        className="col-sm-1 col-xs-1 reply-send"
                        onClick={submitMessage}
                      >
                        <i className="fa fa-send fa-2x" aria-hidden="true" />
                      </div>
                    </div>
                  </>
                ) : null
                //thêm cái hình vào đây hoặc design lời chào các kiểu
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
