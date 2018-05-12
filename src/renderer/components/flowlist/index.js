import React, { Component } from 'react';
import { Button, List, Avatar, Tag, Spin } from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';
import GitModel from "./gitModel";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { model_show } from '../../actions/flowList';
import store from '../../store.js';

const renderActions = (type)=> {
  if(type === 1){
    return [<span className={publicStyles['op-list-btn']}>创建项目</span>]
  } else if (type === 0){
    return [<span className={publicStyles['op-list-btn']}>创建项目</span>,
    <span className={publicStyles['op-list-btn']}>编辑</span>,
    <span className={publicStyles['op-list-btn']}>删除</span>]
  }
};

class FlowList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    store.dispatch({ type: 'FLOWLIST_REQUEST' });
  }

  render() {
    return (
      <MainLayout location={this.props.location}>
      < GitModel visible = {
        this.props.flowlist.visible
      } />
        <div className="m-flow-op">
          <Button
            type="primary"
            className={publicStyles['op-btn']}
            icon="upload"
            onClick={() => {this.props.model_show(true)}}>从git repo新增脚手架</Button>
          <Button type="primary" className={publicStyles['op-btn']} icon="upload" ghost>从本地导入脚手架</Button>
        </div>
        <div className="m-flow-list">
          <Spin spinning={this.props.flowlist.status}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={this.props.flowlist.list}
              renderItem={item => (
                <List.Item actions={renderActions(item.isDefault)}>
                  <List.Item.Meta
                    avatar={< Avatar> {
                      item.avatar
                    }</Avatar>}
                    title={< a href="https://ant.design"> {
                      item.name
                    } < Tag color="cyan"> {
                      item.type
                    }</Tag></a>}
                    description={item.description}/>
                  <div>
                    <Tag color="orange">{item.isDefault === 1
                      ? '内置脚手架'
                      : '导入脚手架'}</Tag>
                  </div>
                </List.Item>
              )}/>
          </Spin>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = store => {
  return { flowlist: store.flowlist };
};

const mapDispatchToProps = dispatch => {
  return {
    model_show: bindActionCreators(model_show, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowList);
