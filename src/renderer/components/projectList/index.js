import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table,Popconfirm } from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';
import styles from './index.less';
import InitModal from "./initModal";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, showInitModal, showData, deleteData} from '../../actions/projectList';

const {remote} = window.require('electron');
const {consoleWin} = remote.getGlobal('services');

class ProjectList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  openConsole(id) {
    consoleWin.init(id)
  }

  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 240,
    }, {
      title: '开发者',
      key: 'author',
      dataIndex: 'author',
      width: 150,
    },
    {
      title: '操作',
      key: 'opration',
      width: 150,
      render: (text, record) => {
        if(!record.isInit){
          return (
            <div>
              <span className={publicStyles['op-list-btn']} key={record._id+'1'} onClick={() => {this.props.showInitModal(true,record)}}>初始化项目</span>
              <Popconfirm key={record._id+'3'} placement="topRight" title="确认删除？" 
              onConfirm={() => {this.props.deleteData(record._id)}} okText="确认" cancelText="取消">
                <span className={publicStyles['op-list-btn']}>删除</span>
              </Popconfirm>
            </div>
          )
        }else{
          return (
            <div>
              <span className={publicStyles['op-list-btn']} key={record._id+'2'} onClick={() => this.openConsole(record._id)}>打开调试</span>
              <Popconfirm key={record._id+'3'} placement="topRight" title="确认删除？" 
              onConfirm={() => {this.props.deleteData(record._id)}} okText="确认" cancelText="取消">
                <span className={publicStyles['op-list-btn']}>删除</span>
              </Popconfirm>
            </div>
          )
        }
      }
    }];

    return (
      <MainLayout location={this.props.location}>
        <InitModal visible = {
          this.props.projectList.initVisible
        } />
        <div className={styles['m-project-list']}>
        <Table columns={columns} dataSource={this.props.projectList.list} 
        loading={this.props.common.status} rowKey={record => record._id} size="middle" pagination={false}/>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = store => {
  return { projectList: store.projectList,common: store.common };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: bindActionCreators(fetchList, dispatch),
    showInitModal: bindActionCreators(showInitModal, dispatch),
    showData: bindActionCreators(showData, dispatch),
    deleteData:bindActionCreators(deleteData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
