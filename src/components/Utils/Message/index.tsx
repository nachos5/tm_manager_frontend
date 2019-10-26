import React from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
  message: string;
  type: string;
}

export default function Message(props: Props) {
  const { message, type } = props;

  const classes = classNames({
    'w-100': true,
    message: true,
    [`message__${type}`]: true
  });

  return (
    <>
      {message.length > 0 ? (
        <div className={classes}>
          <p>{message}</p>
        </div>
      ) : null}
    </>
  );
}
