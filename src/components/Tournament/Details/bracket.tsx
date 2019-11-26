import React from 'react';

import { Bracket } from 'react-tournament-bracket';

export default function TournamentBracket(props: any) {
  const { bracket } = props;
  const bracketObj = JSON.parse(bracket);

  return (
    <>
      <Bracket game={bracketObj} />
    </>
  );
}
