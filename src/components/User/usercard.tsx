import React from 'react';

import { Card } from 'react-bootstrap';

export default function UserCard(props: any) {
  const { user, className } = props;

  return (
    <Card
      border="primary"
      className={className ? className : ''}
    >
    <Card.Header className="text-center">User Profile</Card.Header>
    <Card.Body>
      <Card.Title className="text-center">{user.username}</Card.Title>
      <div className="d-flex justify-content-center">
        <ul>
          <li>Email: <b>{user.email ? user.email : 'no email'}</b></li>
          <li>Tournaments won: <b>{user.tournamentsWonCount}</b></li>
          <li>Matches won: <b>{user.matchesWonCount}</b></li>
        </ul>
      </div>
    </Card.Body>
  </Card>
  )
}