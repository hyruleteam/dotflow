import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainLayout.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function MainLayout({ children }) {
  return (
    <Layout>
      <Header className="m-header">
        <span className={styles.title}>dotflow-前端工作平台</span>
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="/users">
            <Link to="/users"><Icon type="bars" />Users</Link>
          </Menu.Item>
          <Menu.Item key="/categorys">
            <Link to="/categorys"><Icon type="bars" />Categorys</Link>
          </Menu.Item>
          <Menu.Item key="/">
            <Link to="/"><Icon type="home" />Home</Link>
          </Menu.Item>
          <Menu.Item key="/product/list">
            <Link to="/product/list"><Icon type="frown-circle" />Products</Link>
          </Menu.Item>
          <Menu.Item key="/order/list">
            <Link to="/order/list"><Icon type="home" />Orders</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <Link to="/logout"><Icon type="home" />Logout</Link>
          </Menu.Item>
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
