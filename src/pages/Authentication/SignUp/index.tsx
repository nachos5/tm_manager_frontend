import React from 'react';

import Base from '../../Base/index';
import SignUpForm from '../../../components/Authentication/SignUpForm/index';

export default function SignUp(props: any) {
  return (
    <Base>
      <SignUpForm {...props} />
    </Base>
  );
}
