import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { userConstants } from "./constants";

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
    const q = query(collection(db, "users"), where("isOnline", "==", true));
    onSnapshot(q,(querySnapshot)=>{
      const users = []
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid){
          users.push(doc.data())
        }
        dispatch({ 
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users }
      });
      });
    })

  };
};

export const sendMessage = (msgObj) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, "conversations"), {
      ...msgObj,
      isView:false,
      createAt: new Date()
    }).then((data)=>{
      console.log(data)
    }).catch(error=>{
      console.log(error)
    })
    return docRef
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const q = await query(collection(db, "conversations"), 
    where('user_uid_1', 'in', [user.uid_1, user.uid_2])
    
    ); 
   
     onSnapshot(q, (querySnapshot) => {
      const tmp = [];
      
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        if(
          (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
          || 
          (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
      ){
        tmp.push(doc.data())
      }
      });
      let conversations = tmp.sort((a,b)=>a.createAt - b.createAt)
      dispatch({
        type: userConstants.GET_REALTIME_MESSAGES,
        payload: {conversations}
      })
    })

  };
};
