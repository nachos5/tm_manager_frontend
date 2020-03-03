import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Tournament } from '../types';
import { extractIntFromId } from '../../../config/utils';

interface Props {
  tournament: Tournament;
}

export default function TournamentListRow(props: Props) {
  const { tournament } = props;
  const { code } = tournament.node;
  const history = useHistory();

  function handleClick(e: any) {
    history.push(`/tournament/${code}`);
  }

  const full =
    tournament.node.registeredUsers.totalCount >= tournament.node.slots &&
    tournament.node.status === 'OPEN';
  const slotsClass = classNames({
    'text-success': !full
  });

  return (
    <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
      <td>{extractIntFromId(tournament.node.id)}</td>
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
