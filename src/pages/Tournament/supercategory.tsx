import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Base from '../Base';

import { SUPER_CATEGORY_QUERY } from '../../components/Category/queries';
import Loader from '../../components/Utils/Loader';
import QueryError from '../../components/Utils/QueryError';

import TournamentFilters from '../../components/Tournament/Filters';
import TournamentList from '../../components/Tournament/List';

export default function TournamentSuperCategoryPage(props: any) {
  const { id } = props.match.params;
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { loading, error, data } = useQuery(SUPER_CATEGORY_QUERY, {
    variables: { id }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const { superCategory } = data;

  return (
    <Base>
      <h2>
        Public <b>{superCategory.name}</b> Tournaments:
      </h2>
      <hr />
      <TournamentFilters
        setNameFilter={setNameFilter}
        setStatusFilter={setStatusFilter}
        setCategoryFilter={setCategoryFilter}
        categoryOptions={superCategory.subCategories.edges}
      />
      <TournamentList
        superCategory={id}
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
      />
    </Base>
  );
}
