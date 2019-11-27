import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Base from '../Base';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SUPER_CATEGORY_QUERY } from '../../components/Category/queries';
import Loader from '../../components/Utils/Loader';
import QueryError from '../../components/Utils/QueryError';

import { CoreContext } from '../../Routes';

import TournamentFilters from '../../components/Tournament/Filters';
import TournamentList from '../../components/Tournament/List';

export default function TournamentSuperCategoryPage(props: any) {
  const context: any = useContext(CoreContext);

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

  const createHref = `/tournament/new/${id}`;

  return (
    <Base>
      <h2>
        Public <b>{superCategory.name}</b> Tournaments:
      </h2>
      <hr />
      {context.user && (
        <Link to={createHref}>
          <div className='w-100 my-3 d-flex justify-content-center'>
            <Button>
              Create new tournament
            </Button>
          </div>
        </Link>
      )}
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
