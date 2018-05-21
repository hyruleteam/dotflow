import React, { Component } from 'react';
import { Button,Icon,Dropdown,Menu } from 'antd';

import publicStyles from '../layout/public.less';
import styles from './index.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const menuCnt = (
  <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
      </Menu.Item>
    </Menu>
)

class ConsoleWin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['m-console']}>
          <div className={styles['m-console-hd']}>
            <div className={styles['m-console-hd__tit']}>当前项目:zhange-webpack-pj</div>
            <div className={styles['m-console-hd__status'] + ' ' +styles['running']}>运行中....</div>
            <Button type="default" ghost className={styles['hd-btn']}>启动项目</Button>
          </div>
          <div className={styles['m-console-opbar']}>
            <span className={styles['clean-log']}><Icon type="delete" /> 清空日志</span>
          </div>
          <div className={styles['m-console-info']}>
            <div>
            <p>[22:24:30] Using gulpfile ~/Documents/work_project/mengf/budiot-newwebsite/gulpfile.js</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildAssets</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildStyle</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildHtml</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildJs</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildImage</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>buildFont</span>'...</p>
            <p>[22:24:30] Starting '<span className={styles['txt-task']}>browser-sync</span>'...</p>
            <p>[22:24:30] Finished '<span className={styles['txt-task']}>browser-sync</span>' after 11 ms</p>
            <p>[Browsersync] Access URLs:</p>
            <p>----------------------------------</p>
                  <p>Local: http://localhost:8080</p>
                  <p>External: http://10.0.0.7:8080</p>
            <p>----------------------------------</p>
                  <p>UI: http://localhost:3001</p>
                  <p>UI External: http://10.0.0.7:3001</p>
            ----------------------------------
            <p>[Browsersync] Serving files from: ./dist</p>
            <p>[Browsersync] Reloading Browsers...</p>
            <p>[Browsersync] 2 files changed (aboutus.html, index.html)</p>
            <p>[22:24:32] Finished 'buildAssets' after 1.22 s</p>
            <p>[Browsersync] Reloading Browsers...</p>
            </div>
          </div>
          <div className={styles['m-console-opration']}>
            <Button type="primary" ghost size="small" className={styles['op-btn']}>打包项目</Button>
            <Button type="primary" ghost size="small" className={styles['op-btn']}>运行测试</Button>
            <Dropdown overlay={menuCnt} placement="topCenter">
              <Button size="small" className={styles['op-btn']}>更多命令</Button>
            </Dropdown>
          </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { projectList: store.projectList,common: store.common };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleWin);
