import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  Link
} from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

class MainSidebar extends Component {
  render() {
    return (
      <Sider width={160}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0
          }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user"/>工作流</span>}>
            <Menu.Item key="/"><Link to="/">脚手架管理</Link></Menu.Item>
            <Menu.Item key="/about"><Link to="/about">项目管理</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default MainSidebar;
