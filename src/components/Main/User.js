import React from 'react'

const User = (props) => {
    const {user, onClick} = props;
    return (
        <div onClick={() => onClick(user)} className="displayName">
                  <div className="displayPic">
                      <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                  </div>
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                      <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                      <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
                  </div>
              </div>
    )
}

export default User
