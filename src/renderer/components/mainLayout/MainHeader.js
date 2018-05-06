import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainHeader.less';

const { Header } = Layout;

function MainHeader({ location }) {
  return (
    <Header className={styles['m-header']}>
      <span className={styles.title}>dotflow-前端工作平台</span>
      {/*<Menu*/}
        {/*selectedKeys={[location.pathname]}*/}
        {/*mode="horizontal"*/}
        {/*theme="dark"*/}
        {/*defaultSelectedKeys={['1']}*/}
        {/*style={{ lineHeight: '64px' }}*/}
      {/*>*/}
        {/*<Menu.Item key="/">*/}
          {/*<Link to="/">工作流</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="/categorys">*/}
          {/*<Link to="/categorys">资源库</Link>*/}
        {/*</Menu.Item>*/}
      {/*</Menu>*/}
    </Header>
  );
}

export default MainHeader;
