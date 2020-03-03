import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from 'react-bootstrap';

import { TOURNAMENT_QUERY } from '../queries';

import Loader from '../../Utils/Loader';
import QueryError from '../../Utils/QueryError';
// import MutationFieldError from '../../Utils/MutationFieldError';
import { extractIntFromId } from '../../../config/utils';

import TournamentAttributes from './attributes';
import UserList from './userlist';
import TournamentBracket from './bracket';
import ToggleUser from './toggleuser';
import SeedBracket from './seedbracket';

import './styles.scss';

interface Props {
  code: string;
}

export default function Tournament(props: any) {
  const { code } = props;
  const { loading, error, data } = useQuery(TOURNAMENT_QUERY, {
    variables: { code }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError message={code ? 'Invalid Code' : ''} />;
  }

  const { tournament } = data;
  const id = extractIntFromId(tournament.id);

  return (
    <div>
      <Row>
        <Col xs='6'>
          <p className='tournament-title'>Tournament Information:</p>
          <TournamentAttributes tournament={tournament} />
          <ToggleUser
            tournamentId={id}
            userIsRegistered={tournament.userIsRegistered}
            isOpen={tournament.statusDisplay === 'Open'}
          />
        </Col>
        <Col xs='6'>
          <p className='tournament-title'>Registered Users:</p>
          <UserList users={tournament.registeredUsers.edges} />
        </Col>
      </Row>
      <hr />
      {tournament.canEdit &&
      tournament.statusDisplay === 'Open' &&
      tournament.registeredUsers.edges.length !== 0 ? (
        <SeedBracket id={id} />
      ) : null}
      <TournamentBracket bracket={tournament.matchBracket} />
    </div>
  );
}
