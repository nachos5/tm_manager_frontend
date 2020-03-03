import React from 'react';

import { extractIntFromId } from '../../../config/utils';

interface Props {
  tournament: any;
}

export default function TournamentAttributes(props: Props) {
  const { tournament } = props;

  return (
    <ul id='tournament-attributes'>
      {tournament.code ? (
        <li>
          <b>Code</b>: {tournament.code}
        </li>
      ) : null}
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
        <b>Location</b>: {tournament.location}
      </li>
      <li>
        <b>Date</b>: {tournament.date}
      </li>
      <li>
        <b>Time</b>: {tournament.time}
      </li>
      <li>
        <b>Private</b>: {tournament.private ? 'yes' : 'no'}
      </li>
      <li>
        <b>Status</b>:{' '}
        <span className='text-lowercase'>{tournament.statusDisplay}</span>
      </li>
    </ul>
  );
}
