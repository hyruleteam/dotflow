import React from 'react';
import {Modal, Form, Radio} from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showInitModal, showInitInfo, showInitModalConfirm, initComplete} from '../../actions/projectList';
import styles from './index.less';
import loadingGif from '../../assets/img/loading.gif'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {remote} = window.require('electron');
const {initProject} = remote.getGlobal('services');

const failedStatus = {
    loading: false,
    okText: '开始',
    isInit: false
}
let lineInfo = "";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};

const handleOk = (props) => {
    lineInfo = "";
    props
        .form
        .validateFields(async(err, values) => {
            if (!err) {
                props.showInitModalConfirm({ loading: true, okText: '初始化中', isInit: true})
                await doInitProject(props.data, props);
            }
        });
}

const handleCancel = (props) => {
    props.showInitModal(false);
    props.showInitModalConfirm(failedStatus)
    props.showInitInfo("")
}

const showLine = (info, props, type) => {
    let txt = ""
    if (type === 'error') {
        txt = `<p style="color:#f5222d">${info}</p>`
    } else if (type === 'success') {
        txt = `<p style="color:#52c41a">${info}</p>`
    } else if (type === 'noline') {
        txt = `${info}`
    } else {
        txt = `<p>${info}</p>`
    }
    lineInfo += txt;
    props.showInitInfo(lineInfo)
}

const dirIsExist = async(data, props) => {
    //判断是否是空文件夹
    try {
        await initProject.checkDirExists(data)
    } catch (e) {
        props.showInitModalConfirm(failedStatus)
        throw(e.msg)
    }
}

const copyLocalTpl = async(data, props) => {
    //复制模版
    try {
        showLine('====开始复制模版====', props)
        await initProject.generateByLocal(data)
        showLine('复制模版成功', props, 'success')
    } catch (e) {
        props.showInitModalConfirm(failedStatus)
        throw(e.msg)
    }
}

const copyGitTpl = async(data, props) => {
    let timer = null;
    //clone git模版
    showLine('====开始clone git模版====', props)
    try {
        showLine(`<img src=${loadingGif} width='100'/>`, props)
        timer = setInterval(() => {
            showLine('<span>||</span>', props, 'noline')
        }, 1000)
        await initProject.generateByGit(data)
        clearInterval(timer)
        showLine('<span>100%</span>', props, 'noline')
    } catch (e) {
        showLine('clone git模版失败！请检查git是否配置正确', props, 'error')
        props.showInitModalConfirm(failedStatus)
        clearInterval(timer)
        throw(e.msg)
    }
}

const removeGitInfo = async(data, props) => {
    let timer = null;
    //清除模版信息
    showLine('====开始清除模版信息====', props)
    try {
        timer = setInterval(() => {
            showLine('<span>||</span>', props, 'noline')
        }, 1000)
        await initProject.cleanGitFile(data)
        clearInterval(timer)
        showLine('<span>100%</span>', props, 'noline')
    } catch (e) {
        showLine('清除模版信息失败', props, 'error')
        props.showInitModalConfirm(failedStatus)
        clearInterval(timer)
        throw(e.msg)
    }
}

const generatePackageJson = async(data, props) => {
    let timer = null
    //生成项目信息
    showLine('====开始生成项目信息====', props)
    try {
        timer = setInterval(() => {
            showLine('<span>||</span>', props, 'noline')
        }, 1000)
        await initProject.generatePackageJson(data)
        clearInterval(timer)
        showLine('<span>100%</span>', props, 'noline')
    } catch (e) {
        props.showInitModalConfirm(failedStatus)
        clearInterval(timer)
        throw(e.msg)
    }
}

const installDependencies = async(data, props) => {
    //根据选择触发安装模式
    let timer = null;
    showLine('====开始安装依赖====', props)
    try {
        showLine(`<img src=${loadingGif} width='100'/>`, props)
        timer = setInterval(() => {
            showLine('<span>||</span>', props, 'noline')
        }, 1000)
        const gitRes = await initProject.runNpm(data)
        clearInterval(timer)
        showLine('<span>100%</span>', props, 'noline')
        showLine(gitRes.msg, props, 'success')
    } catch (e) {
        props.showInitModalConfirm(failedStatus)
        clearInterval(timer)
        throw(e.msg)
    }
}

const doInitComplete = async(data, props) => {
    props.showInitModalConfirm({ loading: false, okText: '初始化完成', isInit:true});
    data.isInit = true;
    props.initComplete(data);
}

const doInitProject = async(data, props) => {
    try {
        await dirIsExist(data, props)
        if (data.templateData.type === 'git') {
            await copyGitTpl(data, props)
        } else if (data.templateData.type === 'local') {
            await copyLocalTpl(data, props)
        }
        await removeGitInfo(data, props)
        await generatePackageJson(data, props)
        await installDependencies(data, props)
        await doInitComplete(data, props)
    } catch (e) {
        showLine(e, props, 'error')
        return;
    }
}

const InitModel = Form.create()((props) => {
    const {visible, form} = props;
    const {getFieldDecorator} = form;
    return (
        <div>
            <Modal
                title="初始化项目"
                okText={props.status
                ? props.status.okText
                : '开始'}
                cancelText="取消"
                okButtonProps={{
                    disabled: props.status
                        ? props.status.isInit
                        : false }}
                cancelButtonProps={{
                    disabled: props.status
                        ? props.status.isInit
                        : false }}
                visible={visible}
                confirmLoading={props.status
                ? props.status.loading
                : false}
                onOk={() => {
                handleOk(props)
            }}
                onCancel={() => {
                handleCancel(props)
            }}>
                <Form layout="horizontal">
                    <FormItem label="请选择安装方式" {...formItemLayout}>
                        {getFieldDecorator('installWays', {initialValue: '1'})(
                            <RadioGroup name="installWays">
                                <Radio value='1'>npm</Radio>
                                <Radio value='2'>yarn</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem>
                        {/* {getFieldDecorator('lineinfo')(<TextArea rows={12}/>)} */}
                        <div
                            className={styles['init-info']}
                            dangerouslySetInnerHTML={{
                            __html: props.info
                        }}></div>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
})

const mapStateToProps = store => {
    return {initVisible: store.projectList.initVisible, data: store.projectList.data, info: store.projectList.info, status: store.projectList.status};
};

const mapDispatchToProps = dispatch => {
    return {
        showInitModal: bindActionCreators(showInitModal, dispatch),
        showInitModalConfirm: bindActionCreators(showInitModalConfirm, dispatch),
        showInitInfo: bindActionCreators(showInitInfo, dispatch),
        initComplete: bindActionCreators(initComplete, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitModel);
