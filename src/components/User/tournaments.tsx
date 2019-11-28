import React from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

import { USER_QUERY, USER_TOURNAMENT } from './queries';
import TournamentListRow from '../User/listrow';

import Loader from '../Utils/Loader';
import QueryError from '../Utils/QueryError';

interface Props {
  id: number;
  className?: string;
}

export default function Tournament(props: Props) {
  const { id, className } = props;
  const { loading, error, data } = useQuery(USER_TOURNAMENT, {
    variables: {
      id: id
    }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const { user } = data;
  const tournaments = user.createdTournaments.edges;
  const inter = user.tournaments.edges;
  const inTourn = inter.map((t: any) => {
    return <TournamentListRow key={t.node.id} tournament={t} />;
  });
  const ownTourn = tournaments.map((t: any) => {
    return <TournamentListRow key={t.node.id} tournament={t} />;
  });
  const isIn = inter.length === 0;
  const hasIn = tournaments.length === 0;
  return (
    <React.Fragment>
      <h2>My tournaments:</h2>
      {hasIn ? (
        <h3>I have not created any tournaments</h3>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{ownTourn}</tbody>
        </Table>
      )}
      <h2>Tournaments I am registered in:</h2>
      {isIn ? (
        <h3>I am not registered in any tournaments</h3>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{inTourn}</tbody>
        </Table>
      )}
    </React.Fragment>
  );
}
