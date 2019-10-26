import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

import './styles.scss';

// wrapper utan um pages
export default function Base(props: any) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container id='maincontent'>{children}</Container>
      <Footer />
    </>
  );
}
