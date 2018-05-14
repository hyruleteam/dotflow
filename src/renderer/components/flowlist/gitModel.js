import React from 'react';
import {Modal, Form, Input} from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showGitModal, addData, editData} from '../../actions/flowList';

const FormItem = Form.Item;

const formItemLayout = {
		labelCol: {
				span: 6
		},
		wrapperCol: {
				span: 16
		}
};

const handleOk = (props) => {
		props
				.form
				.validateFields((err, values) => {
						if (!err) {
								const avatar = values
										.name
										.substring(0, 1)
										.toUpperCase();
								if(props.isEdit){
									const data = {
										values:{...values},
										_id:props.data._id
									}
									props.editData(data,'git')
								}else{
									const data = {
										...values,
										avatar: avatar,
										type: 'git',
										isDefault: 0
									}
									props.addData(data,'git')
								}	
						}
				});
}

const handleCancel = (props) => {
		props.showGitModal(false);
		props
				.form
				.resetFields();
}

const GitModel = Form.create({
  mapPropsToFields(props) {
		if(props.isEdit){
			return {
				name:Form.createFormField({
					value: props.data.name,
				}),
				description:Form.createFormField({
					value: props.data.description,
				}),
				gitRepo:Form.createFormField({
					value: props.data.gitRepo,
				}),
			};
		}
  },
  // onFieldsChange(props, fields) {
  //   console.log('onFieldsChange', fields);
  // },
})((props) => {
		const {visible, form} = props;
		const {getFieldDecorator} = form;
		return (
				<div>
						<Modal
								title="从git repo新增工作流"
								okText="确定"
								cancelText="取消"
								visible={visible}
								onOk={() => {
								handleOk(props)
						}}
								onCancel={() => {
								handleCancel(props)
						}}>
								<Form layout="horizontal">
										<FormItem label="脚手架名称" {...formItemLayout}>
												{getFieldDecorator('name', {
														rules: [
																{
																		required: true,
																		message: '请输入脚手架名称!'
																}
														]
												})(<Input placeholder="请输入脚手架名称"/>)}
										</FormItem>
										<FormItem label="脚手架描述" {...formItemLayout}>
												{getFieldDecorator('description', {
														rules: [
																{
																		required: true,
																		message: '请输入脚手架描述!'
																}
														]
												})(<Input placeholder="请输入脚手架描述"/>)}
										</FormItem>
										<FormItem label="git repo 地址" {...formItemLayout}>
												{getFieldDecorator('gitRepo', {
														rules: [
																{
																		required: true,
																		message: '请输入git repo 地址!'
																}, {
																		type: "url",
																		message: 'url地址不合法'
																}
														]
												})(<Input placeholder="请输入git repo 地址"/>)}
										</FormItem>
								</Form>
						</Modal>
				</div>
		);
})

const mapStateToProps = store => {
		return {
			gitVisible: store.flowlist.gitVisible,
			data: store.flowlist.data,
			isEdit:store.flowlist.isEdit
		};
};

const mapDispatchToProps = dispatch => {
		return {
			showGitModal: bindActionCreators(showGitModal, dispatch),
				addData: bindActionCreators(addData, dispatch),
				editData: bindActionCreators(editData, dispatch)
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(GitModel);