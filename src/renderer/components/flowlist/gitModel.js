import React from 'react';
import {Modal, Form, Input} from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showModal, addData, editData} from '../../actions/flowList';

const FormItem = Form.Item;

const formItemLayout = {
		labelCol: {
				span: 6
		},
		wrapperCol: {
				span: 12
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
										_id:props.data[0]._id
									}
									props.editData(data)
								}else{
									const data = {
										...values,
										avatar: avatar,
										type: 'git',
										isDefault: 0
									}
									props.addData(data)
								}	
						}
				});
}

const handleCancel = (props) => {
		props.showModal(false);
		props
				.form
				.resetFields();
}

const GitModel = Form.create({
  mapPropsToFields(props) {
		if(props.isEdit){
			return {
				name:Form.createFormField({
					value: props.data[0].name,
				}),
				description:Form.createFormField({
					value: props.data[0].description,
				}),
				gitRepo:Form.createFormField({
					value: props.data[0].gitRepo,
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
			visible: store.flowlist.visible,
			data: store.flowlist.data,
			isEdit:store.flowlist.isEdit
		};
};

const mapDispatchToProps = dispatch => {
		return {
				showModal: bindActionCreators(showModal, dispatch),
				addData: bindActionCreators(addData, dispatch),
				editData: bindActionCreators(editData, dispatch)
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(GitModel);