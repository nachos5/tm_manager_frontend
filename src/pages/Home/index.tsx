import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

import { SUPER_CATEGORIES_QUERY } from '../../components/Category/queries';

import Base from '../Base';

import Loader from '../../components/Utils/Loader';
import QueryError from '../../components/Utils/QueryError';
import SuperCategoryBox from '../../components/Category/superbox';
import SearchByCode from '../../components/Tournament/Utils/searchbycode';

interface Props {
  tournamentFormRedirect?: boolean;
}

export default function Home(props: Props) {
  const { loading, error, data } = useQuery(SUPER_CATEGORIES_QUERY);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const superCategories = data.superCategories.edges;

  return (
    <Base>
      <Row className="mb-5 justify-content-center">
        <Col xs="12" md="6" xl="4">
          <SearchByCode {...props} />
        </Col>
      </Row>
      <Row>
        {superCategories.map((c: any, i: number) => {
          return (
            <Col key={i} xs='6'>
              <SuperCategoryBox superCategory={c} />
            </Col>
          );
        })}
      </Row>
    </Base>
  );
}
