import { useParams } from 'react-router-dom';
import React from 'react';
import Page from '../Page/Page';

function Product() {
  const { id } = useParams();

  return <Page>{id}</Page>;
}

export default Product;
