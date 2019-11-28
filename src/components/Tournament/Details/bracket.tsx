import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Bracket, BracketGame } from 'react-tournament-bracket';

import { MATCH_COMPLETE_MUTATION } from '../queries';
import { useMutation } from '@apollo/react-hooks';

const BracketContext = React.createContext(null);

function GameComponent(props: any) {
  const context = useContext(BracketContext);

  function handler() {
    const home = props.game.sides.home.team.name;
    const visitor = props.game.sides.visitor.team.name;
    if (!home || !visitor) return;
    // @ts-ignore
    context.bracketContextHandler(
      props.game.id,
      props.game.sides.home.team.name,
      props.game.sides.visitor.team.name
    );
  }

  return (
    <>
      <BracketGame {...props} onClick={handler} />
    </>
  );
}

export default function TournamentBracket(props: any) {
  const { bracket } = props;
  const bracketObj = JSON.parse(bracket);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [matchCompleteMutation] = useMutation(MATCH_COMPLETE_MUTATION);
  const [gameIdState, setGameIdState] = useState(null);
  const [homeState, setHomeState] = useState('');
  const [visitorState, setVisitorState] = useState('');

  function bracketContextHandler(gameId: any, home: string, visitor: string) {
    setGameIdState(gameId);
    setHomeState(home);
    setVisitorState(visitor);
    setShowModal(true);
  }

  let homeScore: any;
  let visitorScore: any;
  function formSubmit(e: any) {
    e.preventDefault();
    const homeValue = homeScore.value;
    const visitorValue = visitorScore.value;
    matchCompleteMutation({
      variables: {
        input: {
          id: gameIdState,
          userHomePoints: homeValue,
          userVisitorPoints: visitorValue
        }
      }
    }).then((data: any) => window.location.reload());
  }

  const bracketContextValue: any = { bracketContextHandler };

  return (
    <BracketContext.Provider value={bracketContextValue}>
      <Bracket
        game={bracketObj}
        homeOnTop={true}
        GameComponent={GameComponent}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={formSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Match results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {homeState}:{' '}
              <input
                type='number'
                ref={(node: any) => {
                  homeScore = node;
                }}
                required={true}
              />
            </p>
            <p>
              {visitorState}:{' '}
              <input
                type='number'
                ref={(node: any) => {
                  visitorScore = node;
                }}
                required={true}
              />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </BracketContext.Provider>
  );
}
