import React from 'react';
import { extractIntFromId } from '../../../config/utils';

interface Props {
  users: Object[];
}

export default function UserList(props: Props) {
  const { users } = props;
  if (users.length === 0)
    return <p>No users have registered for this tournament.</p>;

  return (
    <ol id="tournament-userlist">
      {users.map((user: any, i: number) => {
        return (
          <li key={i}>
            <a href={`/user/${extractIntFromId(user.node.id)}`}>
              {user.node.username}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
