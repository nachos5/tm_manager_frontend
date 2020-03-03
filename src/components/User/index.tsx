import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CoreContext } from '../../Routes'
import { USER_QUERY } from './queries';
import TournamentList from '../Tournament/List';
import UserCard from './usercard';

import Loader from '../Utils/Loader';
import QueryError from '../Utils/QueryError';

interface Props {
  id: number;
  className?: string;
}

export default function User(props: Props) {
  const context: any = useContext(CoreContext);
  const me = context.user;

  const { id } = props;
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
    <>
      <UserCard {...props} user={user} />
      <p className="mt-5"><b>Tournaments created by {me.id === user.id ? 'me' : user.username}:</b></p>
      <TournamentList creatorFilter={id} />
      <p className="mt-5"><b>{me.id === user.id ? 'I am/have' : `${user.username} is/has`} participated in the following tournaments:</b></p>
      <TournamentList registeredInFilter={id} />
    </>
  );
}
