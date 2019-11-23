import React from 'react';

import { extractIntFromId } from '../../../config/utils';

interface Props {
  tournament: any;
}

export default function TournamentAttributes(props: Props) {
  const { tournament } = props;

  return (
    <ul id='tournament-attributes'>
      <li>
        <b>Host</b>:{' '}
        <a href={`/user/${extractIntFromId(tournament.creator.id)}`}>
          {tournament.creator.username}
        </a>
      </li>
      <li>
        <b>Name</b>: {tournament.name}
      </li>
      <li>
        <b>Category</b>: {tournament.category.name}
      </li>
      <li>
        <b>Private</b>: {tournament.private.toString()}
      </li>
      <li className='text-lowercase'>
        <b>Status</b>: {tournament.statusDisplay}
      </li>
    </ul>
  );
}
