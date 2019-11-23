import React from 'react';

import { extractIntFromId } from '../../../config/utils';

interface Props {
  users: Object[];
}

export default function UserList(props: Props) {
  const { users } = props;

  return (
    <ol id='tournament-userlist'>
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
