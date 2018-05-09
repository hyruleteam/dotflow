import React from 'react';
import { Layout } from 'antd';
import MainHeader from './MainHeader';
import MainSide from './MainSide';
import './MainLayout.less';

const { Content } = Layout;

function MainLayout({ children, location }) {
  return (
    <Layout className="layout">
      <MainHeader location={location} />
      <Layout className="bgColor">
        <MainSide location={location} />
        <Layout className="content bgColor">
          <Content>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
