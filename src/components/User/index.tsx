import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import Tournament from '../User/tournaments';
import { useQuery } from '@apollo/react-hooks';

import { USER_QUERY } from './queries';

import Loader from '../Utils/Loader';
import QueryError from '../Utils/QueryError';

interface Props {
  id: number;
  className?: string;
}

export default function User(props: Props) {
  const { id, className } = props;
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const { user } = data;

  return (
    <Fragment>
      <Card
        border="primary"
        className={className ? className : ''}
        style={{ width: '18rem' }}
      >
        <Card.Header className="text-center">Usercard</Card.Header>
        <Card.Body>
          <Card.Title className="text-center">{user.username}</Card.Title>
          <div>
            <ul>
              <li>Name: {user.name ? user.name : user.username}</li>
              <li>Email: {user.email ? user.email : 'no email'}</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
      <Tournament id={id} />
    </Fragment>
  );
}
