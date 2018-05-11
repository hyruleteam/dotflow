import React, { Component } from 'react';
import { Layout } from 'antd';
import MainHeader from './MainHeader';
import MainSide from './MainSide';
import styles from './MainLayout.less';

const { Content } = Layout;

class MainLayout extends Component {
  render() {
    return (
      <Layout className={styles.layout}>
        <MainHeader />
        <Layout className={styles['bg-color']}>
          <MainSide location={this.props.location}/>
          <Layout className={[styles.content, styles['bg-color']]}>
            <Content>
              { this.props.children }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
