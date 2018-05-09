import React from 'react';
import { Layout } from 'antd';
import MainHeader from './MainHeader';
import MainSide from './MainSide';
import styles from './MainLayout.less';

const { Content } = Layout;

function MainLayout({ children, location }) {
  return (
    <Layout className={styles.layout}>
      <MainHeader location={location} />
      <Layout className={styles['bg-color']}>
        <MainSide location={location} />
        <Layout className={[styles.content, styles['bg-color']]}>
          <Content>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
