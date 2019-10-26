import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Row, Col } from 'react-bootstrap';

import { CoreContext } from '../../Routes';

import './styles.scss';

export default function Header(props: any) {
  const context: any = useContext(CoreContext);

  return (
    <Navbar id='header' bg='light' expand='lg'>
      <Row className='w-100'>
        <Col xs='8' className='brand d-flex align-items-center'>
          <Link to='/'>Tournament Manager</Link>
        </Col>
        {!context.user ? (
          <Col xs='4'>
            <div className='w-100 d-flex justify-content-end'>
              <Link className='auth-link' to='/login'>
                Login
              </Link>
            </div>
            <div className='w-100 d-flex justify-content-end'>
              <Link className='auth-link' to='/signup'>
                Sign up
              </Link>
            </div>
          </Col>
        ) : (
          <Col xs='4'>
            <div className='w-100 h-100 d-flex justify-content-end align-items-center'>
              <Link className='auth-link' to='/logout'>
                Logout
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </Navbar>
  );
}
