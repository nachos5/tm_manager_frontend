import React, { useEffect } from 'react';

import Base from '../../Base/index';

export default function Logout(props: any) {
  useEffect(() => {
    localStorage.removeItem('token');
    window.location.pathname = '/';
  });

  return (
    <Base>
      <p>logging you out...</p>
    </Base>
  );
}
