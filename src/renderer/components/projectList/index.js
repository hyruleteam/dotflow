import React, {Component} from 'react';
import {Table, Popconfirm, Button, Tooltip} from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';
import styles from './index.less';
import InitModal from "./initModal";
import ImportModal from "./importModal";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchList, showInitModal, showImportModal, showData, deleteData} from '../../actions/projectList';

const ButtonGroup = Button.Group;
const {remote, shell} = window.require('electron');
const {consoleWin} = remote.getGlobal('services');

class ProjectList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this
      .props
      .fetchList();
  }

  openConsole(id) {
    consoleWin.init(id)
  }

  openFinder(fullPath) {
    shell.openItem(fullPath)
  }

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: 240
      }, {
        title: '开发者',
        key: 'author',
        dataIndex: 'author',
        width: 150
      }, {
        title: '操作',
        key: 'opration',
        width: 150,
        render: (text, record) => {
          if (!record.isInit) {
            return (
              <div>
                <ButtonGroup>
                  <Tooltip placement="top" title="初始化项目">
                    <Button
                      type="primary"
                      icon="code-o"
                      key={record._id + '1'}
                      onClick={() => {
                      this
                        .props
                        .showInitModal(true, record)
                    }}/>
                  </Tooltip>

                  <Popconfirm
                    key={record._id + '4'}
                    placement="topRight"
                    title="确认删除？"
                    onConfirm={() => {
                    this
                      .props
                      .deleteData(record._id)
                  }}
                    okText="确认"
                    cancelText="取消">
                    <Tooltip placement="top" title="删除">
                      <Button type="primary" icon="delete"/>
                    </Tooltip>
                  </Popconfirm>

                </ButtonGroup>
              </div>
            )
          } else {
            return (
              <div>

                <ButtonGroup>
                  <Tooltip placement="top" title="打开调试">
                    <Button
                      type="primary"
                      icon="play-circle-o"
                      key={record._id + '2'}
                      onClick={() => this.openConsole(record._id)}/>
                  </Tooltip>

                  <Tooltip placement="top" title="打开文件位置">
                    <Button
                      type="primary"
                      icon="search"
                      key={record._id + '3'}
                      onClick={() => this.openFinder(record.allPath)}/>
                  </Tooltip>

                  <Popconfirm
                    key={record._id + '4'}
                    placement="topRight"
                    title="确认删除？"
                    onConfirm={() => {
                    this
                      .props
                      .deleteData(record._id)
                  }}
                    okText="确认"
                    cancelText="取消">
                    <Tooltip placement="top" title="删除">
                      <Button type="primary" icon="delete"/>
                    </Tooltip>
                  </Popconfirm>
                </ButtonGroup>
              </div>
            )
          }
        }
      }
    ];

    return (
      <MainLayout location={this.props.location}>
        <InitModal visible={this.props.projectList.initVisible}/>
        <ImportModal visible={this.props.projectList.importVisible}/>
        <div className="m-flow-op">
          <Button
            type="primary"
            className={publicStyles['op-btn']}
            icon="download"
            onClick={() => {
            this
              .props
              .showImportModal(true)
          }}>导入已有项目</Button>
        </div>
        <div className={styles['m-project-list']}>
          <Table
            columns={columns}
            dataSource={this.props.projectList.list}
            loading={this.props.common.status}
            rowKey={record => record._id}
            size="middle"
            pagination={false}/>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = store => {
  return {projectList: store.projectList, common: store.common};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: bindActionCreators(fetchList, dispatch),
    showInitModal: bindActionCreators(showInitModal, dispatch),
    showImportModal: bindActionCreators(showImportModal, dispatch),
    showData: bindActionCreators(showData, dispatch),
    deleteData: bindActionCreators(deleteData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
