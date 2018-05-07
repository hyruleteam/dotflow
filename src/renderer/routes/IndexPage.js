import React from 'react';
import { Button, List, Avatar, Tag } from 'antd';
import { connect } from 'dva';
import MainLayout from '../components/mainLayout/MainLayout';
import publicStyles from './public.less';

const data = [{
  avatar:'G',
  name:'gulp静态页面工作流-hllui',
  description:'这是切图必备生成器，给你带来飞一般的切图体验',
  type:'git',
  isDefault:1,
  actions:[
    <a>创建项目</a>
  ]
},{
  avatar:'V',
  name:'hyrule-laravel-vue',
  description:'最顺手的vue-admin脚手架',
  type:'git',
  isDefault:1,
  actions:[
    <a>创建项目</a>
  ]
},{
  avatar:'R',
  name:'hyrule-laravel-react',
  description:'最顺手的react-admin脚手架',
  type:'git',
  isDefault:1,
  actions:[
    <a>创建项目</a>
  ]
},{
  avatar:'Z',
  name:'zhange-webpack',
  description:'老张最自豪的webpack多页面脚手架',
  type:'本地',
  isDefault:0,
  actions:[
    <a>创建项目</a>,
    <a>打开文件夹</a>,
    <a>删除</a>
  ]
}]

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
              <div><Tag color="orange">{item.isDefault === 1?"内置脚手架":'导入脚手架'}</Tag></div>
            </List.Item>
          )}
        />
      </div>
    </MainLayout>
  );
}

export default connect()(IndexPage);
