import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';

import { TOGGLE_USER_TOURNAMENT_MUTATION } from '../queries';

import Loader from '../../Utils/Loader';

interface Props {
  tournamentId: number;
  userIsRegistered: boolean;
  isOpen: boolean;
}

export default function ToggleUser(props: Props) {
  const { tournamentId, userIsRegistered, isOpen } = props;
  const [toggleUserMutation] = useMutation(TOGGLE_USER_TOURNAMENT_MUTATION);
  const [loading, setLoading] = useState(false);

  function handleToggle(e: any) {
    e.preventDefault();
    setLoading(true);
    toggleUserMutation({
      variables: { id: tournamentId }
    })
      .then((data: any) => {
        window.location.reload();
      })
      .catch((error: any) => console.error(error));
  }

  const variant = userIsRegistered ? 'danger' : 'primary';

  return (
    <>
      {loading ? <Loader /> : null}
      {localStorage.getItem('token') && isOpen ? (
        <Button variant={variant} className="mt-2" onClick={handleToggle}>
          {userIsRegistered
            ? 'Unregister for Tournament'
            : 'Register for Tournament'}
        </Button>
      ) : null}
    </>
  );
}
