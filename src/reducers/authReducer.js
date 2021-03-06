import { authConstanst } from "../actions/constants";

const initState = {
  uid: "",
  name: "",
  dayofbirth: "",
  gender: "",
  isOnline: false,
  isChat: false,
  authenticating: false,
  authenticated: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // console.log(action);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case `${authConstanst.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstanst.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;

    case `${authConstanst.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${authConstanst.USER_UPDATE}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstanst.USER_UPDATE}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstanst.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
