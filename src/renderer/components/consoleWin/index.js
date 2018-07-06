import React, {Component} from 'react';
import {Button, Icon} from 'antd';

import styles from './index.less';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showDataRequest} from '../../actions/projectList';
import {changeTerminalStatus} from '../../actions/consoleWin';

import Terminal from './terminal';

// const menuCnt = (   <Menu>     <Menu.Item>       <a target="_blank"
// rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
// </Menu.Item>   </Menu> )

const {ipcRenderer, shell, remote} = window.require('electron')
const childProcess = window.require('child_process');
const process = window.require('process');
const {consoleWin} = remote.getGlobal('services');
const Convert = require('ansi-to-html');
const convert = new Convert();

let pid = null;
let gitContent = ''

const ProjectStatus = (props) => {
    const {terminalStatus, startProject, stopProject} = props;
    if (terminalStatus === 1) {
        return (
            <Button
                type="danger"
                ghost
                className={styles['stop-btn']}
                onClick={() => {
                stopProject()
            }}>终止</Button>
        )
    } else {
        return (
            <Button
                type="default"
                ghost
                className={styles['start-btn']}
                onClick={() => {
                startProject()
            }}>启动项目</Button>
        )
    }
}

class ConsoleWin extends Component {
    constructor(props) {
        super(props);
        this.startProject = this
            .startProject
            .bind(this)
        this.stopProject = this
            .stopProject
            .bind(this)
        this.buildProject = this
            .buildProject
            .bind(this)
    }

    componentWillMount() {
        this
            .props
            .showDataRequest(this.props.match.params.id);
    }

    startProject() {
        const pathName = `${this.props.projectList.data.allPath}`
        let child = childProcess.spawn('npm', ['start'], {
            cwd: pathName,
            encoding: 'utf8'
        });
        let content = ''

        pid = child.pid;

        ipcRenderer.send('send-pid', pid)
        child
            .stdout
            .on('data', data => {
                data = data.toString();
                //for gulp
                data = data.replace(/\[(.*?)\]/g, '[<span style="color:#999">$1</span>]');
                data = data.replace(/\'(.*?)\'/g, '\'<span style="color:#00c5c7">$1</span>\'');
                data = data.replace(/\((.*?)\)/g, '<span style="color:#ca30c7">$1</span>');
                data = data.replace(/(https?:\/{2}[^\s]*)/g, '<span style="color:#ca30c7">$1</span>');

                //for webpack
                data = convert.toHtml(data)
                data = data.replace(/1m/g, '');
                content += `<code>${data}</code>`
                this
                    .props
                    .changeTerminalStatus(1, content)
            })

        child
            .stderr
            .on('data', err => {
                content += `<code>${err.toString()}</code>`
                this
                    .props
                    .changeTerminalStatus(1, content)
            })
    }

    stopProject() {
        let content = ''

        if (pid) {
            process.kill(pid);
            ipcRenderer.send('send-pid', null)
            content += `<code style='color:#f00'>${pid}进程结束</code>`
            this
                .props
                .changeTerminalStatus(0, content);

            pid = null;
            return;
        }
    }

    buildProject() {
        this.stopProject();

        const pathName = `${this.props.projectList.data.allPath}`
        let child = childProcess.spawn('npm', [
            'run', 'build'
        ], {
            cwd: pathName,
            encoding: 'utf8'
        });
        let content = ''

        child
            .stdout
            .on('data', data => {
                data = data.toString();
                //for gulp
                data = data.replace(/\[(.*?)\]/g, '[<span style="color:#999">$1</span>]');
                data = data.replace(/\'(.*?)\'/g, '\'<span style="color:#00c5c7">$1</span>\'');
                data = data.replace(/\((.*?)\)/g, '<span style="color:#ca30c7">$1</span>');
                data = data.replace(/(https?:\/{2}[^\s]*)/g, '<span style="color:#ca30c7">$1</span>');

                //for webpack
                data = convert.toHtml(data)
                content += `<code>${data}</code>`
                this
                    .props
                    .changeTerminalStatus(0, content)
            })

        child
            .stderr
            .on('data', err => {
                content += `<code>${err.toString()}</code>`
                this
                    .props
                    .changeTerminalStatus(0, content)
            })

        ipcRenderer.send('send-pid', null)
    }

    showNormalGitMsg(type, data) {
        if (type === 0) {
            gitContent += `<code>${data
                .msg
                .toString()}</code>`
        } else if (type === 1) {
            gitContent += `<code style='color:#f00'>${data
                .msg
                .toString()}</code>`
        }

        this
            .props
            .changeTerminalStatus(0, gitContent)
    }

    async runGitCommand(cmd, pathName) {
        await consoleWin
            .rumCommand(cmd, pathName)
            .then(res => {
                this.showNormalGitMsg(0, res)
            })
            .catch(err => {
                console.log(err.msg)
                this.showNormalGitMsg(1, err)
            })
    }

    async commitProjectByGit() {
        gitContent = '';
        this.stopProject();
        const pathName = `${this.props.projectList.data.allPath}`

        await this.runGitCommand('git pull', pathName)
        await this.runGitCommand('git add .', pathName)
        await this.runGitCommand(`git commit -m "Auto-commit ${new Date()}"`, pathName)
        await this.runGitCommand('git push', pathName)
    }

    cleanLog() {
        this
            .props
            .changeTerminalStatus(0, '');
    }

    openFinder(fullPath) {
        shell.openItem(fullPath)
    }

    render() {
        return (
            <div className={styles['m-console']}>
                <div className={styles['m-console-hd']}>
                    <div className={styles['m-console-hd__tit']}>当前项目:{this.props.projectList.data
                            ? this.props.projectList.data.name
                            : ''}</div>
                    <div
                        className={styles['m-console-hd__status'] + ' ' + (this.props.terminalStatus === 1
                        ? styles['running']
                        : '')}>{this.props.terminalStatus === 1
                            ? '运行中...'
                            : '未运行'}</div>
                    <ProjectStatus
                        terminalStatus={this.props.terminalStatus}
                        startProject={this.startProject}
                        stopProject={this.stopProject}></ProjectStatus>
                </div>
                <div className={styles['m-console-opbar']}>
                    <span
                        className={styles['clean-log']}
                        onClick={() => {
                        this.cleanLog()
                    }}><Icon type="delete"/>
                        清空日志</span>
                </div>
                <Terminal terminalContent={this.props.terminalContent}></Terminal>
                <div className={styles['m-console-opration']}>
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        className={styles['op-btn']}
                        onClick={() => {
                        this.commitProjectByGit()
                    }}>提交</Button>
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        className={styles['op-btn']}
                        onClick={() => {
                        this.buildProject()
                    }}>发布</Button>
                    <Button type="primary" ghost size="small" className={styles['op-btn']}>测试</Button>
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        className={styles['op-btn']}
                        onClick={() => {
                        this.openFinder(this.props.projectList.data.allPath)
                    }}>项目位置</Button>
                    {/* <Dropdown overlay={menuCnt} placement="topCenter">
              <Button size="small" className={styles['op-btn']}>更多命令</Button>
            </Dropdown> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {projectList: store.projectList, common: store.common, terminalStatus: store.consoleWin.terminalStatus};
};

const mapDispatchToProps = dispatch => {
    return {
        showDataRequest: bindActionCreators(showDataRequest, dispatch),
        changeTerminalStatus: bindActionCreators(changeTerminalStatus, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleWin);
