import React, { Component } from 'react';
import { Button,Icon } from 'antd';

import styles from './index.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showDataRequest } from '../../actions/projectList';
import { changeTerminalStatus } from '../../actions/consoleWin';

import Terminal from './terminal';

// const menuCnt = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
//     </Menu.Item>
//   </Menu>
// )

const {ipcRenderer} = window.require('electron')
const childProcess = window.require('child_process');
const process = window.require('process');
const Convert = require('ansi-to-html');
const convert = new Convert();


let pid = null;

const ProjectStatus = (props)=> {
  const {terminalStatus,startProject,stopProject} = props;
  if(terminalStatus === 1){
    return (
      <Button type="danger" ghost className={styles['stop-btn']} onClick={()=> {stopProject()}}>终止</Button>
    )
  }else{
    return(
      <Button type="default" ghost className={styles['start-btn']} onClick={()=> {startProject()}}>启动项目</Button>
    )
  }
}

class ConsoleWin extends Component {
  constructor(props) {
    super(props);
    this.startProject = this.startProject.bind(this)
    this.stopProject = this.stopProject.bind(this)
  }

  componentWillMount() {
    this.props.showDataRequest(this.props.match.params.id);
  }

  startProject() {
    const pathName = `${this.props.projectList.data.localPath}/${this.props.projectList.data.name}`
    // let child = childProcess.exec('npm start',{cwd:pathName});
    let child = childProcess.spawn('npm',['start'],{cwd:pathName,encoding: 'utf8'});
    let content = ''
  
    pid = child.pid;

    ipcRenderer.send('send-pid', pid)
    child.stdout.on('data', data => {
      data = data.toString();
      //for gulp
      data = data.replace(/\[(.*?)\]/g, '[<span style="color:#999">$1</span>]');
      data = data.replace(/\'(.*?)\'/g, '\'<span style="color:#00c5c7">$1</span>\'');
      data = data.replace(/\((.*?)\)/g, '<span style="color:#ca30c7">$1</span>');
      data = data.replace(/(https?:\/{2}[^\s]*)/g, '<span style="color:#ca30c7">$1</span>');

      //for webpack
      data = convert.toHtml(data)
      content += `<code>${data}</code>`
      this.props.changeTerminalStatus(1,content)
    })
  
    child.stderr.on('data', err => {
      console.log(err.toString())
      content += `<code>${err.toString()}</code>`
      this.props.changeTerminalStatus(1,content)

      // if(pid){
      //   process.kill(pid);
      //   pid = null;
      //   ipcRenderer.send('send-pid', null)
      // }
    })
  }
  
  stopProject(){
    let content = ''
  
    if(pid){
      process.kill(pid);
      ipcRenderer.send('send-pid', null)
      content += `<code style='color:#f00'>${pid}进程结束</code>`
      this.props.changeTerminalStatus(0,content);
  
      pid = null;
      return;
    }
    console.log('无响应进程')
  }

  cleanLog(){
    console.log(this.props.terminalStatus)
    if(this.props.terminalStatus === 1){
      this.props.changeTerminalStatus(1,'');
    }
  }

  render() {
    return (
      <div className={styles['m-console']}>
          <div className={styles['m-console-hd']}>
            <div className={styles['m-console-hd__tit']}>当前项目:{this.props.projectList.data?this.props.projectList.data.name:''}</div>
            <div className={styles['m-console-hd__status']+' '+(this.props.terminalStatus===1?styles['running']:'')}>{this.props.terminalStatus===1?'运行中...':'未运行'}</div>
            <ProjectStatus 
            terminalStatus={this.props.terminalStatus} 
            startProject={this.startProject}
            stopProject={this.stopProject}
            ></ProjectStatus>
          </div>
          <div className={styles['m-console-opbar']}>
            <span className={styles['clean-log']} onClick={() => {this.cleanLog()}}><Icon type="delete" /> 清空日志</span>
          </div>
          <Terminal terminalContent={this.props.terminalContent}></Terminal>
          <div className={styles['m-console-opration']}>
            <Button type="primary" ghost size="small" className={styles['op-btn']}>打包项目</Button>
            <Button type="primary" ghost size="small" className={styles['op-btn']}>运行测试</Button>
            {/* <Dropdown overlay={menuCnt} placement="topCenter">
              <Button size="small" className={styles['op-btn']}>更多命令</Button>
            </Dropdown> */}
          </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { 
    projectList: store.projectList,
    common: store.common,
    terminalStatus:store.consoleWin.terminalStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showDataRequest: bindActionCreators(showDataRequest, dispatch),
    changeTerminalStatus:bindActionCreators(changeTerminalStatus, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleWin);
