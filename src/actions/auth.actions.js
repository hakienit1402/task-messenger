import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider 
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { authConstanst } from "./constants";

export const signInWithFacebook = () => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userf = result.user;
        console.log(userf)
            setDoc(doc(db, "users", userf.uid), {
              uid: userf.uid,
              name: userf.displayName,
              dayofbirth: "",
              gender: "",
              isOnline: true,
              isChat: false,
            })
              .then(() => {
                //success
                const loggedInUser = {
                  uid: userf.uid,
                  name: userf.displayName,
                  dayofbirth: "",
                  gender: "",
                  isOnline: true,
                  isChat: false,
                };

                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                console.log(error);
              });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };
};

export const signInWithGoogle = () => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userf = result.user;
        getDoc(doc(db, "users", userf.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dispatch({
              type: `${authConstanst.USER_LOGIN}_SUCCESS`,
              payload: { user: docSnap.data() },
            });
          } else {
            console.log("No such document!");
            setDoc(doc(db, "users", userf.uid), {
              uid: userf.uid,
              name: userf.displayName,
              dayofbirth: "",
              gender: "",
              isOnline: true,
              isChat: false,
            })
              .then(() => {
                //success
                const loggedInUser = {
                  uid: userf.uid,
                  name: userf.displayName,
                  dayofbirth: "",
                  gender: "",
                  isOnline: true,
                  isChat: false,
                };

                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };
};

export const signup = (params) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

    createUserWithEmailAndPassword(auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const currentUser = auth.currentUser;
        const name = params.name;
        currentUser.displayName = name;
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: params.name,
          dayofbirth: "",
          gender: "",
          isOnline: true,
          isChat: false,
        })
          .then(() => {
            //success
            const loggedInUser = {
              uid: user.uid,
              name: params.name,
              dayofbirth: "",
              gender: "",
              isOnline: true,
              isChat: false,
            };
            // localStorage.setItem("authMess", true);
            // console.log("success: " + loggedInUser);
            dispatch({
              type: `${authConstanst.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
};
export const signin = (params) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    signInWithEmailAndPassword(auth, params.email, params.password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;

        // console.log(userRef);
        try {
          const userRef = doc(db, "users", user.uid);
          // console.log(userRef);
          updateDoc(userRef, {
            isOnline: true,
          });
          onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log("Current data: ", doc.data());
            const user = doc.data();
            const loggedInUser = {
              uid: user.uid,
              name: user.name,
              dayofbirth: user.dayofbirth,
              gender: user.gender,
              isOnline: user.isOnline,
              isChat: user.isChat,
            };
            localStorage.setItem("authMess", true);
            console.log("success");
            dispatch({
              type: `${authConstanst.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          });
        } catch (error) {
          console.log(error);
          dispatch({
            type: `${authConstanst.USER_LOGIN}_FAILURE`,
            payload: { error },
          });
        }
      }
    );
  };
};
export const isLoggedInUser = () => {
  return async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: `${authConstanst.USER_LOGIN}_SUCCESS`,
          payload: { user: user },
        });
      } else {
        dispatch({
          type: `${authConstanst.USER_LOGIN}_FAILURE`,
          payload: { error: "Login again please" },
        });
      }
    });
  };
};
export const logout = (params) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
    const userRef = doc(db, "users", params);
    updateDoc(userRef, {
      isOnline: false,
    }).then(() => {
      auth
        .signOut()
        .then(() => {
          localStorage.clear();
          dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: `${authConstanst.USER_LOGOUT}_FAILURE`,
            payload: { error },
          });
        });
    });
  };
};

export const updateInfo = (params) => {
  return async (dispatch) => {
    const userRef = doc(db, "users", params.uid);
    updateDoc(userRef, {
      name: params.name,
      dayofbirth: params.dayofbirth,
      gender: params.gender,
    })
      .then(() => {
        const userUpdate = {
          uid: params.uid,
          name: params.name,
          dayofbirth: params.dayofbirth,
          gender: params.gender,
          isOnline: true,
          isChat: false,
        };
        dispatch({
          type: `${authConstanst.USER_UPDATE}_SUCCESS`,
          payload: { user: userUpdate },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstanst.USER_UPDATE}_FAILURE`,
          payload: { error },
        });
      });
  };
};
