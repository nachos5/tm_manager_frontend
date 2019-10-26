import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TOURNAMENT_QUERY } from '../../components/Tournament/queries';

import Loader from '../../components/Utils/Loader';
import QueryError from '../../components/Utils/QueryError';

interface Props {
  id: number;
}

export default function Tournament(props: any) {
  const { id } = props;
  const { loading, error, data } = useQuery(TOURNAMENT_QUERY, {
    variables: { id }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const { tournament } = data;
  console.info(tournament);

  return (
    <ul>
      <li>name: {tournament.name}</li>
      <li>category: {tournament.category.name}</li>
      <li>blahblah...</li>
    </ul>
  );
}
