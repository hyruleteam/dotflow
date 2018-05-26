import React from 'react';
import { Layout } from 'antd';
import styles from './MainHeader.less';
import logo from './logo.png'

const { Header } = Layout;

function MainHeader() {
  return (
    <Header className={styles["m-header"]}>
      <span className={styles.title}>
      <img src={logo} alt=""/></span>
    </Header>
  );
}

export default MainHeader;
