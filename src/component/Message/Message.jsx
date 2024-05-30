import React from 'react'
import "./Message.css";


const Message = ({ user, sendMessage, classes }) => {
    if (user) {
        return (
            <div className={`messageBox ${classes}`}  >
                {`${user}: ${sendMessage}`}
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classes}`}>
                {`You: ${sendMessage}`}
            </div>
        )
    }
}

export default Message
