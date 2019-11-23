import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table, Button } from 'react-bootstrap';

import { PUBLIC_TOURNAMENTS_LIST } from '../queries';
import { Tournament } from '../types';

import Loader from '../../Utils/Loader';
import QueryError from '../../Utils/QueryError';
import TournamentListRow from './listrow';

const paginate: number =
  process.env.REACT_APP_PAGINATE !== undefined
    ? parseInt(process.env.REACT_APP_PAGINATE)
    : 20;

interface Props {
  superCategory: number;
  nameFilter: string;
  statusFilter: string;
  categoryFilter: string;
}

export default function TournamentList(props: Props) {
  const { superCategory, nameFilter, statusFilter, categoryFilter } = props;
  const [currCount, setCurrCount] = useState(paginate);
  const { loading, error, data, fetchMore } = useQuery(
    PUBLIC_TOURNAMENTS_LIST,
    {
      variables: {
        first: paginate,
        after: '',
        superCategory,
        name: nameFilter,
        statuses: statusFilter,
        categories: categoryFilter
      }
    }
  );

  // bætir við niðurstöðum
  const updateQuery = (
    prev: any,
    { fetchMoreResult }: { fetchMoreResult?: any }
  ) => {
    if (!fetchMoreResult) {
      return prev;
    }
    // bætum nýju niðurstöðunum við gömlu
    const appended = Object.assign({}, prev, {
      tournaments: {
        ...prev.tournaments,
        edges: [
          ...prev.tournaments.edges,
          ...fetchMoreResult.tournaments.edges
        ],
        pageInfo: fetchMoreResult.tournaments.pageInfo
      }
    });
    // uppfærum counterinn
    if (currCount + paginate > appended.tournaments.totalCount) {
      setCurrCount(appended.tournaments.totalCount);
    } else {
      setCurrCount(currCount + paginate);
    }

    return appended;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const tournaments: Tournament[] = data.tournaments.edges;
  const totalCount: number = data.tournaments.totalCount;
  if (totalCount < currCount) {
    setCurrCount(totalCount);
  }

  return (
    <>
      {/*
      <p>
        Showing {currCount} out of {totalCount} tournaments
      </p>
      */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Name</th>
            <th>Created by</th>
            <th>Status</th>
            <th>Slots</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((t) => {
            return <TournamentListRow key={t.node.id} tournament={t} />;
          })}
        </tbody>
      </Table>
      {currCount < totalCount ? (
        <div className='w-100 my-3 d-flex justify-content-center'>
          <Button
            onClick={() =>
              fetchMore({
                variables: { after: data.tournaments.pageInfo.endCursor },
                updateQuery
              })
            }
          >
            Load more tournaments
          </Button>
        </div>
      ) : null}
    </>
  );
}
