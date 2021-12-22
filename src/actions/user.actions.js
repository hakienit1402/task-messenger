import { userConstants } from "./constants";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, addDoc, orderBy, onSnapshot } from "firebase/firestore";

export const getRealtimeUsers = (uid) => {
  //console.log('uid', uid)

  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
    const q = query(collection(db, "users"), where("isOnline", "==", true));

const querySnapshot = await getDocs(q);
const users = []
querySnapshot.forEach((doc) => {
  if (doc.data().uid !== uid){
    users.push(doc.data())
  }
  dispatch({ 
    type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
    payload: { users }
});
  console.log(doc.id, " => ", doc.data());
});
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
   
    const unsub = await onSnapshot(q, (querySnapshot) => {
      const tmp = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        if(
          (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 == user.uid_2)
          || 
          (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 == user.uid_1)
      ){
        tmp.push(doc.data())
      }
      });
      console.log(tmp.sort((a,b)=>a.createAt - b.createAt))
      let conversations = tmp.sort((a,b)=>a.createAt - b.createAt)
      dispatch({
        type: userConstants.GET_REALTIME_MESSAGES,
        payload: {conversations}
      })
    })
      
  
// const querySnapshot = await getDocs(q);

// console.log(conversations.sort((a,b)=>a.createAt - b.createAt))

  };
};
