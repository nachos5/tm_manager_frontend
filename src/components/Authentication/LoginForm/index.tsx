import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'react-bootstrap';

import { LOGIN_MUTATION } from '../mutations';

export default function LoginForm(props: any) {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  let username: any;
  let password: any;

  function submitForm(e: any) {
    e.preventDefault();
    loginMutation({
      variables: { username: username.value, password: password.value }
    })
      .then((data: any) => {
        const { token } = data.data.tokenCreate;
        // console.info(token);
        localStorage.setItem('token', token);
        window.location.href = '/';
      })
      .catch((error) => {
        props.setMessageType('error');
        props.setMessage(
          "Invalid username or password. Please try again or sign up if you don't have an account already."
        );
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
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          ref={(node: any) => {
            password = node;
          }}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
