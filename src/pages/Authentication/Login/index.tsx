import React, { useState } from 'react';

import Base from '../../Base/index';
import LoginForm from '../../../components/Authentication/LoginForm/index';
import Message from '../../../components/Utils/Message/index';

export default function Login(props: any) {
  let msg = '';
  if (props.location.state && props.location.state.signupRedirect) {
    msg = 'Your account was created successfully! You can login now.';
  }
  const [message, setMessage] = useState(msg);
  const [messageType, setMessageType] = useState('success');
  return (
    <Base>
      <Message message={message} type={messageType} />
      <LoginForm
        {...props}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </Base>
  );
}
