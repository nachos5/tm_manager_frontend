import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TOURNAMENT_QUERY } from '../queries';

import Loader from '../../Utils/Loader';
import QueryError from '../../Utils/QueryError';

import TournamentAttributes from './attributes';
import UserList from './userlist';
import TournamentBracket from './bracket';

import './styles.scss';
import { Col, Row } from 'react-bootstrap';

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

  return (
    <div>
      <Row>
        <Col xs='6'>
          <p className='tournament-title'>Tournament Information:</p>
          <TournamentAttributes tournament={tournament} />
        </Col>
        <Col xs='6'>
          <p className='tournament-title'>Registered Users:</p>
          <UserList users={tournament.registeredUsers.edges} />
        </Col>
      </Row>
      <hr />
      <TournamentBracket />
    </div>
  );
}
