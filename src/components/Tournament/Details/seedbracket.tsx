import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { TOURNAMENT_SEED_BRACKET_MUTATION } from '../queries';

import Loader from '../../Utils/Loader';
import { useMutation } from '@apollo/react-hooks';

export default function SeedBracket(props: any) {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [seedBracketMutation] = useMutation(TOURNAMENT_SEED_BRACKET_MUTATION);

  function handler(e: any) {
    e.preventDefault();
    setLoading(true);
    seedBracketMutation({
      variables: { id: id }
    })
      .then((data: any) => {
        window.location.reload();
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <div className='d-flex justify-content-center'>
      {loading ? <Loader /> : null}
      <Button variant='info' onClick={handler}>
        Start the tournament and seed the bracket
      </Button>
    </div>
  );
}
