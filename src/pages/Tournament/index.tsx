import React from 'react';

import Base from '../Base/index';

import Tournament from '../../components/Tournament/index';

export default function TournamentPage(props: any) {
  const { id } = props.match.params;

  return (
    <Base>
      <Tournament id={id} />
    </Base>
  );
}
