/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getRealtimeConversations,
  getRealtimeUsers,
  logout,
  sendMessage
} from "../../actions";
import "./main.css";
const ChatHeader = ({ name }) => {
  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-lg-6">
          <a href="#" data-target="#view_info">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="avatar"
            />
          </a>
          <div className="chat-about">
            <h6 className="m-b-0">{name}</h6>
            <div className="status">
              <>
                <i className="fa fa-circle online" /> Online
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatHistory = ({ conversations, uid }) => {
  // const convert =(mess) => {
  //   var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  //   var mess1=mess.replace(exp, "<a href='$1'>$1</a>");
  //   var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
  //   return mess1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>')
  // }
  return (
    <div className="chat-history">
      <ul className="m-b-0">
        {conversations.map((con, index) => (
          <li className="clearfix" key={index}>
            {con.user_uid_1 === uid ? (
              <>
                <div className="message-data text-right">
                  <span className="message-data-time">
                    {new Date(con.createAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>
                <div className="message other-message float-right">
                  {con.message}
                </div>
              </>
            ) : (
              <>
                <div className="message-data">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                  <span className="message-data-time">
                  {new Date(con.createAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>
                <div className="message my-message">{con.message}</div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// }
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
  }, [unsubscribe]);
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
  const signout = () => {
    dispatch(logout(auth.uid));
  };

  if (!auth.authenticated) {
    return <Navigate to="signin" />;
  }

  return (
    <div className="container main-mess">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="row heading">
                <div className="col-sm-2 col-xs-2 heading-avatar">
                  <div className="heading-avatar-icon">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="#" />
                  </div>
                </div>
                <div className="col-sm-8 col-xs-8 text-truncate">
                  {auth.name}
                </div>
                <div
                  className="col-sm-1 col-xs-1  heading-dot  pull-right"
                  onClick={signout}
                >
                  <i
                    className="fa fa-sign-out fa-2x  pull-right"
                    aria-hidden="true"
                  />
                </div>
              </div>

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
                    <ChatHistory
                      conversations={user.conversations}
                      uid={auth.uid}
                    />
                    <div className="row reply">
                      <InputEmoji
                        value={message}
                        onChange={setMessage}
                        cleanOnEnter
                        onEnter={submitMessage}
                        placeholder="Type a message"
                      />
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
