import React, { useState } from 'react';

import { Button, Col, Form } from 'react-bootstrap';

function forward(e: any, setEmpty: any, history: any) {
  e.preventDefault();
  const code = e.target.elements[0].value;
  if (!code) {
    setEmpty(true);
    return;
  }
  history.push(`/tournament/${code}`);
}

export default function SearchByCode(props: any) {
  const { history } = props;
  const [empty, setEmpty] = useState(false);

  return (
    <div>
      <Form onSubmit={(e: any) => forward(e, setEmpty, history)} className="d-flex justify-content-center align-items-center">
        <Col xs="10">
          <Form.Group className="m-0">
            <Form.Control type="input" placeholder="Enter tournament code..." />
          </Form.Group>
        </Col>
        <Button className="h-10" variant="outline-primary" type="submit">
          Search
        </Button>
      </Form>
      {empty && <p className="text-center text-danger">Please enter a code before submitting</p>}
    </div>
  )
}