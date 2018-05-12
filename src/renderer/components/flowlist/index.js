import React, { Component } from 'react';
import { Button, List, Avatar, Tag, Spin } from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading_status } from '../../actions/public';
import store from '../../store.js';

const onClickFetch = () => {
  store.dispatch({ type: 'FLOWLIST_REQUEST' });
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
        <div className="m-flow-op">
          <Button
            type="primary"
            className={publicStyles['op-btn']}
            icon="upload"
            onClick={onClickFetch}>从git repo新增脚手架</Button>
          <Button type="primary" className={publicStyles['op-btn']} icon="upload" ghost>从本地导入脚手架</Button>
        </div>
        <div className="m-flow-list">
          < Spin spinning={this.props.flowlist.status}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={this.props.flowlist.list}
              renderItem={item => (
                <List.Item actions={item.actions}>
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
    loading_status: bindActionCreators(loading_status, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowList);
