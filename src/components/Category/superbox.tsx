import React from 'react';
import { Link } from 'react-router-dom';

import { extractIntFromId } from '../../config/utils';

import './styles.scss';

interface Props {
  superCategory: any;
}

export default function SuperCategoryBox(props: Props) {
  const { superCategory } = props;

  return (
    <Link
      to={`/list/${extractIntFromId(superCategory.node.id)}`}
      className='super-category-box'
    >
      <div className='super-category-box__container shadow'></div>
      <h2 className='super-category-box__title'>{superCategory.node.name}</h2>
    </Link>
  );
}
