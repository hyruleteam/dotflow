import React, {Component} from 'react';
import {
    Menu,
    Dropdown,
    Button,
    Icon,
    Modal,
    Form,
    Input
} from 'antd';

import styles from './index.less';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showDataRequest} from '../../actions/projectList';
import {changeTerminalStatus, showGitModal} from '../../actions/consoleWin';

import Terminal from './terminal';

const {ipcRenderer, shell, remote} = window.require('electron')
const childProcess = window.require('child_process');
const process = window.require('process');
const {consoleWin} = remote.getGlobal('services');
const Convert = require('ansi-to-html');
const convert = new Convert();

let pid = null;
let gitContent = ''

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};

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

    async runGitCommand(cmd) {
        gitContent = '';
        this.stopProject();
        const pathName = `${this.props.projectList.data.allPath}`
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

    async gitPull() {
        await this.runGitCommand('git pull')
    }

    async gitAdd() {
        await this.runGitCommand('git add .')
    }

    async preGitCommit() {
        this
            .props
            .showGitModal(true)
    }

    async gitCommit(msg) {
        await this.runGitCommand(`git commit -m "${msg}"`)
    }

    async gitPush() {
        await this.runGitCommand('git push')
    }

    async gitStash() {
        await this.runGitCommand('git stash')
    }

    async gitStashPop() {
        await this.runGitCommand('git stash pop')
    }

    async gitStatus() {
        await this.runGitCommand('git status')
    }

    async gitLogs() {
        await this.runGitCommand('git log')
    }

    async gitReset() {
        await this.runGitCommand('git reset --hard')
    }

    cleanLog() {
        this
            .props
            .changeTerminalStatus(0, '');
    }

    openFinder(fullPath) {
        shell.openItem(fullPath)
    }

    async handleMenuClick(e) {
        switch (e.key) {
            case 'pull':
                await this.gitPull();
                break;
            case 'add':
                await this.gitAdd();
                break;
            case 'commit':
                await this.preGitCommit();
                break;
            case 'push':
                await this.gitPush();
                break;
            case 'stash':
                await this.gitStash();
                break;
            case 'pop':
                await this.gitStashPop();
                break;
            case 'reset':
                await this.gitReset();
                break;
            case 'status':
                await this.gitStatus();
                break;
            case 'logs':
                await this.gitLogs();
                break;
            default:
                await this.gitPull();
        }
    }

    render() {
        const menu = (
            <Menu onClick={(e) => {
                this.handleMenuClick(e)
            }}>
                <Menu.Item key='pull'>
                    <span>更新</span>
                </Menu.Item>
                <Menu.Item key='add'>
                    <span>添加</span>
                </Menu.Item>
                <Menu.Item key='commit'>
                    <span>本地提交</span>
                </Menu.Item>
                <Menu.Item key='push'>
                    <span>提交远程仓库</span>
                </Menu.Item>
                <Menu.Item key='stash'>
                    <span>本地暂存</span>
                </Menu.Item>
                <Menu.Item key='pop'>
                    <span>恢复暂存</span>
                </Menu.Item>
                <Menu.Item key='status'>
                    <span>查看状态</span>
                </Menu.Item>
                <Menu.Item key='logs'>
                    <span>查看日志</span>
                </Menu.Item>
                <Menu.Item key='reset'>
                    <span>还原项目</span>
                </Menu.Item>
            </Menu>
        );

        const GitModel = Form.create({})((props) => {
            const {visible, form} = props;
            const {getFieldDecorator} = form;

            const handleOk = () => {
                props
                    .form
                    .validateFields(async(err, values) => {
                        if (!err) {
                            await this.gitCommit(values.gitmsg)
                            this
                                .props
                                .showGitModal(false);
                        }
                    });
            }

            const handleCancel = () => {
                this
                    .props
                    .showGitModal(false);
            }

            return (
                <div>
                    <Modal
                        title="提交信息"
                        okText="确定"
                        cancelText="取消"
                        visible={visible}
                        onOk={() => {
                        handleOk()
                    }}
                        onCancel={() => {
                        handleCancel()
                    }}>
                        <Form layout="horizontal">
                            <FormItem label="提交信息" {...formItemLayout}>
                                {getFieldDecorator('gitmsg', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入提交信息!'
                                        }
                                    ]
                                })(<Input placeholder="请输入提交信息"/>)
}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            );
        })
        return (
            <div className={styles['m-console']}>
                < GitModel visible={this.props.consoleWin.gitVisible}/>
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
                    <Dropdown overlay={menu} placement="topCenter" trigger={['click']}>
                        <Button type="primary" ghost size="small" className={styles['op-btn']}>GIT操作</Button>
                    </Dropdown>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {projectList: store.projectList, common: store.common, terminalStatus: store.consoleWin.terminalStatus, consoleWin: store.consoleWin};
};

const mapDispatchToProps = dispatch => {
    return {
        showGitModal: bindActionCreators(showGitModal, dispatch),
        showDataRequest: bindActionCreators(showDataRequest, dispatch),
        changeTerminalStatus: bindActionCreators(changeTerminalStatus, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleWin);
