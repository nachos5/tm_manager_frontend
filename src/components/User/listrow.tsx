import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

import { Tournament } from '../User/types';
import { extractIntFromId } from '../../config/utils';

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
  return (
    <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
      <td>{idInt}</td>
      <td>{tournament.node.name}</td>
      <td>{tournament.node.category.name}</td>
    </tr>
  );
}
