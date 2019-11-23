import React from 'react';

import { Bracket, Model } from 'react-tournament-bracket';

export default function TournamentBracket(props: any) {
  return (
    <Bracket
      game={{
        id: 'asd',
        name: 'st',
        scheduled: Date.now(),
        sides: { home: {}, visitor: {} }
      }}
    />
  );
}

// export interface Game {
//   id: ID;
//   name: string;
//   bracketLabel?: string;
//   scheduled: number;
//   court?: {
//       name: string;
//       venue: {
//           name: string;
//       };
//   };
//   sides: {
//       [side in Side]: SideInfo;
//   };
// }

// export interface SideInfo {
//   score?: {
//       score: number;
//   };
//   seed?: {
//       displayName: string;
//       rank: number;
//       sourceGame: Game;
//       sourcePool: object;
//   };
//   team?: {
//       id: ID;
//       name: string;
//   };
// }
