import React from 'react';
import { Layout } from 'antd';
import styles from './MainHeader.less';

const { Header } = Layout;

function MainHeader() {
  return (
    <Header className={styles["m-header"]}>
      <span className={styles.title}>dotflow-前端工作平台</span>
    </Header>
  );
}

export default MainHeader;
