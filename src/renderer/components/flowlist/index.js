import React, { Component } from 'react';
import { Button, Avatar, Tag,Popconfirm,Card, Col, Row,Spin,Icon,Tooltip } from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';
import styles from './index.less';
import GitModel from "./gitModel";
import LocalModel from "./localModel";
import CreateModal from "./createModal";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, showGitModal,showLocalModal,showCreateModal, showData, deleteData} from '../../actions/flowList';

class FlowList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  renderActions(item) {
    if(item.isDefault === 1){
      return [<span onClick={() => {this.props.showCreateModal(true,item)}}><Icon type="plus-circle-o" key={item._id+'1'}/> 创建项目</span>]
    } else if (item.isDefault === 0){
      return [
      <Tooltip placement="top" title="使用此脚手架创建项目">
        <Icon type="plus-circle-o" key={item._id+'1'} onClick={() => {this.props.showCreateModal(true,item)}}/>
      </Tooltip>,
      <Tooltip placement="top" title="编辑">
        <Icon type="edit" key={item._id+'2'} onClick={() => {this.props.showData(item._id,item.type)}}/>
      </Tooltip>,
      <Tooltip placement="top" title="删除">
        <Popconfirm key={item._id+'3'} placement="topRight" title="确认删除？" onConfirm={() => {this.props.deleteData(item._id)}} okText="确认" cancelText="取消">
          <Icon type="delete" key={item._id+'3'}/>
        </Popconfirm>
      </Tooltip>]
    }
  };

  render() {
    const CardList = () => {
      const { Meta } = Card;
      if(this.props.flowlist.list){
        return (
          <Row gutter={16}>
            {this.props.flowlist.list.map((item) => {
              return (
                <Col span={8} style={{marginBottom:'10px'}} key={item._id}>
                  <Card title={item.name} loading={this.props.common.status} bordered={false} 
                  actions={this.renderActions(item)}
                  className={styles.card}>
                  <Meta
                      avatar={<Avatar>{item.avatar}</Avatar>}
                      title={<div>
                        <Tag color="orange">{item.isDefault === 1? '内置': '导入'}</Tag>
                        <Tag color="cyan"> {item.type}</Tag>
                      </div>}
                      description={item.description}
                    />
                  </Card>
                </Col>
              )
            })}
          </Row>
        )
      }
      return (
        <div></div>
      )
    }

    return (
      <MainLayout location={this.props.location}>
      < GitModel visible = {
        this.props.flowlist.gitVisible
      } />
      < LocalModel visible = {
        this.props.flowlist.localVisible
      } />
      < CreateModal visible = {
        this.props.flowlist.createVisible
      } history={this.props.history}/>
        <div className="m-flow-op">
          <Button
            type="primary"
            className={publicStyles['op-btn']}
            icon="upload"
            onClick={() => {this.props.showGitModal(true)}}>从git repo添加脚手架</Button>
          <Button type="primary" className={publicStyles['op-btn']} icon="upload" ghost onClick={() => {this.props.showLocalModal(true)}}>从本地添加脚手架</Button>
        </div>
        <div className={styles['m-flow-list']}>
          <Spin spinning={this.props.common.status}>
            <CardList/>
          </Spin>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = store => {
  return { flowlist: store.flowlist,common: store.common };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: bindActionCreators(fetchList, dispatch),
    showGitModal: bindActionCreators(showGitModal, dispatch),
    showLocalModal: bindActionCreators(showLocalModal, dispatch),
    showCreateModal: bindActionCreators(showCreateModal, dispatch),
    showData: bindActionCreators(showData, dispatch),
    deleteData:bindActionCreators(deleteData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowList);
