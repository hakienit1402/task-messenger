/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  signin,
  signInWithFacebook,
  signInWithGoogle,
  signup,
} from "../../actions";
import "./auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [rightPanel, setRightPanel] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [pwdaccount, setPwdAccount] = useState("");
  const signUp = (e) => {
    e.preventDefault();
    console.log(name + " " + email + " " + password);
    dispatch(signup({ name, email, password }));
  };
  const signIn = (e) => {
    e.preventDefault();
    console.log(account + " " + pwdaccount);
    dispatch(signin({ email: account, password: pwdaccount }));
  };

  const signInGoogle = () => {
    dispatch(signInWithGoogle());
  };

  if (auth.authenticated) {
    return <Navigate to="/" />;
  }

  const signInFacebook = () => {
    dispatch(signInWithFacebook());
  };
  return (
    <div className="main">
      <div className={`container  ${rightPanel}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={signUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a className="social">
                <FaFacebook color="blue" onClick={signInFacebook} />
              </a>
              <a className="social">
                <FcGoogle onClick={signInGoogle} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={signIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a className="social">
                <FaFacebook color="blue" onClick={signInFacebook} />
              </a>
              <a className="social">
                <FcGoogle onClick={signInGoogle} />
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="text"
              required
              placeholder="Email"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={pwdaccount}
              onChange={(e) => setPwdAccount(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setRightPanel(" ")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setRightPanel("right-panel-active")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
