import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'react-bootstrap';

import { SIGNUP_MUTATION } from '../mutations';

export default function LoginForm(props: any) {
  const [errors, setErrors] = useState([]);

  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  let username: any;
  let password1: any;
  let password2: any;

  function submitForm(e: any) {
    e.preventDefault();
    signupMutation({
      variables: {
        username: username.value,
        password1: password1.value,
        password2: password2.value
      }
    })
      .then((data: any) => {
        const { errors } = data.data.userCreate;
        if (errors.length > 0) {
          setErrors(errors);
        } else {
          props.history.push({
            pathname: '/login',
            state: { signupRedirect: true }
          });
        }
      })
      .catch((error) => {
        console.info(error);
      });
  }

  const usernameErrors: any = errors.find((x: any) => x.field === 'username');
  const password1Errors: any = errors.find((x: any) => x.field === 'password1');
  const password2Errors: any = errors.find((x: any) => x.field === 'password2');

  return (
    <Form onSubmit={submitForm}>
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          ref={(node: any) => {
            username = node;
          }}
        />
        {usernameErrors !== undefined ? (
          <>
            {usernameErrors.messages.map((message: string, i: number) => (
              <Form.Text key={i} className='text-danger'>
                {message}
              </Form.Text>
            ))}
          </>
        ) : null}
      </Form.Group>

      <Form.Group controlId='password1'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          ref={(node: any) => {
            password1 = node;
          }}
        />
        {password1Errors !== undefined ? (
          <>
            {password1Errors.messages.map((message: string, i: number) => (
              <Form.Text key={i} className='text-danger'>
                {message}
              </Form.Text>
            ))}
          </>
        ) : null}
      </Form.Group>

      <Form.Group controlId='password2'>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          ref={(node: any) => {
            password2 = node;
          }}
        />
        {password2Errors !== undefined ? (
          <>
            {password2Errors.messages.map((message: string, i: number) => (
              <Form.Text key={i} className='text-danger'>
                {message}
              </Form.Text>
            ))}
          </>
        ) : null}
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
