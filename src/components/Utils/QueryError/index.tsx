import React from 'react';

interface Props {
  message?: string;
}

export default function QueryError(props: Props) {
  const { message } = props;

  if (message) {
    return <h2 className="text-center">{message}</h2>
  }

  return (
    <h2 className="text-center">Internal Error!</h2>
  )
}