import React from 'react';

import Base from '../Base';

import CreateNewTournamentForm from '../../components/Tournament/Forms/create';

export default function CreateNewTournamentPage(props: any) {
  const { superId } = props.match.params;

  return (
    <Base>
      <CreateNewTournamentForm {...props} superId={parseInt(superId, 10)} />
    </Base>
  );
}
