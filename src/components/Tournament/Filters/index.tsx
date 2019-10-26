import React from 'react';

import NameFilter from './namefilter';

interface Props {
  setNameFilter: any;
}

export default function TournamentFilters(props: Props) {
  const { setNameFilter } = props;

  return (
    <div>
      <NameFilter setNameFilter={setNameFilter} />
    </div>
  );
}
