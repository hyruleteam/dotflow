import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
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
  );
}

export default Header;
