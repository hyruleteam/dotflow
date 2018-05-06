import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainSidebar.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

function MainSidebar({ location }) {
  return (
    <Sider width={160} style={{ background: '#fff' }}>
      <Menu
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