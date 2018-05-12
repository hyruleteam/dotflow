import React from 'react';
import {Modal, Form, Input} from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { model_show } from '../../actions/flowList';
import store from '../../store.js';

const FormItem = Form.Item;

const formItemLayout = {
		labelCol: {
				span: 6
		},
		wrapperCol: {
				span: 12
		}
};

const handleOk = () => {
		console.log(1)
}

const GitModel = (props) => {
		return (
				<div>
						<Modal
								title="从git repo新增工作流"
								okText="确定"
								cancelText="取消"
								visible={props.visible}
								onOk={handleOk}
								onCancel={() => {props.model_show(false)}}>
								<Form layout="horizontal">
										<FormItem label="脚手架名称" {...formItemLayout}>
												<Input placeholder="请输入脚手架名称"/>
										</FormItem>
										<FormItem label="脚手架描述" {...formItemLayout}>
												<Input placeholder="请输入脚手架描述"/>
										</FormItem>
										<FormItem label="git repo 地址" {...formItemLayout}>
												<Input placeholder="请输入git repo 地址"/>
										</FormItem>
								</Form>
						</Modal>
				</div>
		);
}

const mapStateToProps = store => {
  return { visible: store.flowlist.visible };
};

const mapDispatchToProps = dispatch => {
  return {
    model_show: bindActionCreators(model_show, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GitModel);

// export default GitModel