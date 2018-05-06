import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import styles from './MainLayout.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function MainLayout({ children }) {
  return (
    <Layout>
      <Header className="m-header">
        <span className={styles.title}>dotflow-前端工作平台</span>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">工作流</Menu.Item>
          <Menu.Item key="2">资源仓库</Menu.Item>
          <Menu.Item key="3">任务管理</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content className={styles.content}>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
