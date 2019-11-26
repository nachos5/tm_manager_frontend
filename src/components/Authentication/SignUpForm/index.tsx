import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'react-bootstrap';

import { SIGNUP_MUTATION } from '../mutations';

import MutationFieldError from '../../Utils/MutationFieldError';

export default function LoginForm(props: any) {
  const [fieldErrors, setFieldErrors] = useState([]);

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
          setFieldErrors(errors);
        } else {
          props.history.push({
            pathname: '/login',
            state: { signupRedirect: true }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
        <MutationFieldError errors={fieldErrors} field='username' />
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
        <MutationFieldError errors={fieldErrors} field='password1' />
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
        <MutationFieldError errors={fieldErrors} field='password2' />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
