import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from 'react-bootstrap';

import { TOURNAMENT_QUERY } from '../queries';

import Loader from '../../Utils/Loader';
import QueryError from '../../Utils/QueryError';
import MutationFieldError from '../../Utils/MutationFieldError';

import TournamentAttributes from './attributes';
import UserList from './userlist';
import TournamentBracket from './bracket';
import ToggleUser from './toggleuser';
import SeedBracket from './seedbracket';

import { CoreContext } from '../../../Routes';

import './styles.scss';

interface Props {
  id: number;
}

export default function Tournament(props: any) {
  const context: any = useContext(CoreContext);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [codeIncorrect, setCodeIncorrect] = useState<boolean>(false);

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
  const registeredUsers = tournament.registeredUsers.edges;

  let codeNode: any;

  function submitForm(e: any) {
    e.preventDefault();

    const code = codeNode.value ? codeNode.value : null;

    if (code === tournament.code) {
      setIsAllowed(true);
    } else {
      setCodeIncorrect(true);
    }
  }
  
  if (tournament.private && !isAllowed) {
    const creatorID = tournament.creator.id;
    const userID = context.user ? context.user.id : null;

    const registeredIDs = registeredUsers.map((t: any) => {
      return t.node.id;
    });

    if (userID === creatorID || tournament.canEdit || registeredIDs.includes(userID)) {
      setIsAllowed(true);
    }

    if (!isAllowed) {
      return (
        <div>
          <h3>Please enter the tournament code to continue:</h3>
          <Form onSubmit={submitForm}>
            <Form.Group>
              <Form.Control
              type='text'
              required={true}
              placeholder='Enter Tournament Code'
              ref={(node: any) => {
                codeNode = node;
              }}
            />
            </Form.Group>
            {codeIncorrect && (
              <Form.Text className='text-danger'>
                The entered code is incorrect
              </Form.Text>
            )}
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      );
    }
  }

  return (
    <div>
      <Row>
        <Col xs='6'>
          <p className='tournament-title'>Tournament Information:</p>
          <TournamentAttributes tournament={tournament} />
          <ToggleUser
            tournamentId={id}
            userIsRegistered={tournament.userIsRegistered}
          />
        </Col>
        <Col xs='6'>
          <p className='tournament-title'>Registered Users:</p>
          <UserList users={tournament.registeredUsers.edges} />
        </Col>
      </Row>
      <hr />
      {tournament.canEdit && tournament.statusDisplay === 'Open' ? (
        <SeedBracket id={id} />
      ) : null}
      <TournamentBracket bracket={tournament.matchBracket} />
    </div>
  );
}
