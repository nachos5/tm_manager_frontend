import React from 'react';
import { Link } from 'react-router-dom';

import { extractIntFromId } from '../../config/utils';

import './styles.scss';

interface Props {
  superCategory: any;
}

export default function SuperCategoryBox(props: Props) {
  const { superCategory } = props;

  const { id, name } = superCategory.node;
  const backgroundUrl: string = name === 'Gaming' ? '/stock-gaming.jpg' : name === 'Sports' ? 'stock-sports.jpg' : '';

  return (
    <Link
      to={`/list/${extractIntFromId(id)}`}
      className='super-category-box'
    >
      <div 
        className='super-category-box__container shadow'
        style={{background: `url("${backgroundUrl}") center / cover no-repeat`}}
      />
      <h2 className='super-category-box__title'>{name}</h2>
    </Link>
  );
}
