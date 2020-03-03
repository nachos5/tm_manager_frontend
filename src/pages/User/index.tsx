import React from 'react';

import Base from '../Base';

import User from '../../components/User';

export default function UserProfile(props: any) {
  const { id } = props.match.params;

  return (
    <Base>
      <User id={id} className='col-12 col-md-6 m-auto p-0' />
    </Base>
  );
}
