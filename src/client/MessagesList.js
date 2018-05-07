import React from 'react';

import styles from './MessagesList.css';

const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from} :</strong>
        <span>{props.text}</span>
    </div>
);

const MessagesList = props => (
    <div className={styles.MessagesList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                    />
                );
            })
        }
    </div>
);

export default MessagesList;
