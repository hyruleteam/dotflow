import React from 'react';
import { Button, List, Avatar, Tag } from 'antd';
import { connect } from 'dva';
import MainLayout from '../components/mainLayout/MainLayout';
import publicStyles from './public.less';
import flowlist from '../assets/flowlist';

const { remote } = window.require('electron');

const data = flowlist;

const { dbstore } = remote.getGlobal('services');

// const doc = {
//   id: 1,
//   name: 'perillaroc',
// };

dbstore.find({}, (err, newDoc) => {
  console.log(newDoc);
});

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className="m-flow-op">
        <Button type="primary" className={publicStyles['op-btn']} icon="upload">从git repo新增脚手架</Button>
        <Button type="primary" className={publicStyles['op-btn']} icon="upload" ghost>从本地导入脚手架</Button>
      </div>
      <div className="m-flow-list">
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={<Avatar>{item.avatar}</Avatar>}
                title={<a href="https://ant.design">{item.name}  <Tag color="cyan">{item.type}</Tag></a>}
                description={item.description}
              />
              <div><Tag color="orange">{item.isDefault === 1 ? '内置脚手架' : '导入脚手架'}</Tag></div>
            </List.Item>
          )}
        />
      </div>
    </MainLayout>
  );
}

export default connect()(IndexPage);
