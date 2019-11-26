import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  errors: any;
  field: string;
}

export default function MutationFieldError(props: Props) {
  const { errors, field } = props;

  const fieldErrors: any = errors.find((x: any) => x.field === field);

  return (
    <>
      {fieldErrors !== undefined ? (
        <>
          {fieldErrors.messages.map((message: string, i: number) => (
            <Form.Text key={i} className='text-danger'>
              {message}
            </Form.Text>
          ))}
        </>
      ) : null}
    </>
  );
}
