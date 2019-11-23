import React, { Dispatch } from 'react';

import NameFilter from './namefilter';
import StatusFilter from './statusfilter';
import CategoryFilter from './categoryfilter';

import './styles.scss';

interface Props {
  setNameFilter: Dispatch<string>;
  setStatusFilter: Dispatch<string>;
  setCategoryFilter: Dispatch<string>;
  categoryOptions: Object[];
}

export default function TournamentFilters(props: Props) {
  const {
    setNameFilter,
    setStatusFilter,
    setCategoryFilter,
    categoryOptions
  } = props;

  return (
    <div id='filters-tournaments'>
      <CategoryFilter
        setCategoryFilter={setCategoryFilter}
        categoryOptions={categoryOptions}
      />
      <StatusFilter setStatusFilter={setStatusFilter} />
      <NameFilter setNameFilter={setNameFilter} />
    </div>
  );
}
