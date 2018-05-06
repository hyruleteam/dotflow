import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/mainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      11111
    </MainLayout>
  );
}

export default connect()(IndexPage);
