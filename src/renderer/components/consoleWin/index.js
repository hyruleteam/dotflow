import React, { Component } from 'react';
import { Button,Icon,Dropdown,Menu } from 'antd';

import publicStyles from '../layout/public.less';
import styles from './index.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showDataRequest } from '../../actions/projectList';
import { changeTerminalStatus } from '../../actions/consoleWin';

import Terminal from './terminal';

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

const {ipcRenderer} = window.require('electron')
const childProcess = window.require('child_process');
const process = window.require('process');

let pid = null;

class ConsoleWin extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.showDataRequest(this.props.match.params.id);
  }

  startProject(){
    let content = ''
    
    const pathName = `${this.props.projectList.data.localPath}/${this.props.projectList.data.name}`
    let child = childProcess.exec('gulp',{cwd:pathName});
    pid = child.pid;
    ipcRenderer.send('send-pid', pid)
  
    child.stderr.on('data', err => {
      content += `<code>${err.toString()}</code>`
      this.props.changeTerminalStatus(content)
      console.log('请检查端口占用情况')
    })
  
    child.stdout.on('data', data => {
      content += `<code>${data.toString()}</code>`
      this.props.changeTerminalStatus(content)
    })
  }

  stopProject() {
    if(pid){
      console.log(pid)
      process.kill(pid);
      ipcRenderer.send('send-pid', null)
      console.log(`${pid}进程结束`)
      return;
    }
    console.log('无响应进程')

  }

  render() {
    return (
      <div className={styles['m-console']}>
          <div className={styles['m-console-hd']}>
            <div className={styles['m-console-hd__tit']}>当前项目:{this.props.projectList.data?this.props.projectList.data.name:''}</div>
            <div className={styles['m-console-hd__status']}>未运行</div>
            <Button type="default" ghost className={styles['hd-btn']} onClick={()=> {this.startProject()}}>启动项目</Button>
            <Button type="danger" ghost className={styles['hd-btn']} onClick={()=> {this.stopProject()}}>终止</Button>
          </div>
          <div className={styles['m-console-opbar']}>
            <span className={styles['clean-log']}><Icon type="delete" /> 清空日志</span>
          </div>
          <Terminal terminalStatus={this.props.terminalStatus}></Terminal>
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
    showDataRequest: bindActionCreators(showDataRequest, dispatch),
    changeTerminalStatus:bindActionCreators(changeTerminalStatus, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleWin);
