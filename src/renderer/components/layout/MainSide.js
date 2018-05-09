import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

function MainSidebar() {
  return (
    <Sider width={160}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" title={<span><Icon type="user" />工作流</span>}>
          <Menu.Item key="1">脚手架管理</Menu.Item>
          <Menu.Item key="2">项目管理</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default MainSidebar;
