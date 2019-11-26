import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

import { Tournament } from '../types';
import { extractIntFromId } from '../../../config/utils';

interface Props {
  tournament: Tournament;
}

export default function TournamentListRow(props: Props) {
  const { tournament } = props;
  const idInt = extractIntFromId(tournament.node.id);
  const history = useHistory();

  function handleClick(e: any) {
    history.push(`/tournament/${idInt}`);
  }

  const full =
    tournament.node.registeredUsers.totalCount >= tournament.node.slots &&
    tournament.node.status === 'OPEN';
  const slotsClass = classNames({
    'text-success': !full
  });

  return (
    <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
      <td>{idInt}</td>
      <td>{tournament.node.category.name}</td>
      <td>{tournament.node.name}</td>
      <td>{tournament.node.creator.username}</td>
      <td className='d-flex justify-content-between'>
        {tournament.node.statusDisplay}
      </td>
      <td
        className={slotsClass}
      >{`${tournament.node.registeredUsers.totalCount}/${tournament.node.slots}`}</td>
    </tr>
  );
}
