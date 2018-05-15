import React from 'react';
import {
		Modal,
		Form,
		Input,
		Button,
		Row,
		Col
} from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showLocalModal, addData, editData} from '../../actions/flowList';

const FormItem = Form.Item;
const {remote} = window.require('electron');

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
								if (props.isEdit) {
										const data = {
												values: {
														...values
												},
												_id: props.data._id
										}
										props.editData(data, 'local')
								} else {
										const data = {
												...values,
												avatar: avatar,
												type: 'local',
												isDefault: 0
										}
										props.addData(data, 'local')
								}
						}
				});
}

const handleCancel = (props) => {
		props.showLocalModal(false);
		if (!props.isEdit) {
				props
						.form
						.resetFields();
		}
}

const getLocalDirPath = (props) => {
		remote
				.dialog
				.showOpenDialog({
						properties: ['openDirectory']
				}, (filePaths) => {
						if (filePaths) {
								props
										.form
										.setFieldsValue({localPath: filePaths[0]});
						}
				})
}

const LocalModel = Form.create({
		mapPropsToFields(props) {
				if (props.isEdit) {
						let data = {
								name: Form.createFormField({value: props.data.name}),
								description: Form.createFormField({value: props.data.description}),
								localPath: Form.createFormField({value: props.data.localPath})
						}
						return data;
				}
		},
		// onFieldsChange(props, fields) { 	console.log('onFieldsChange', data); }
})((props) => {
		const {visible, form} = props;
		const {getFieldDecorator} = form;
		return (
				<div>
						<Modal
								title="从本地导入工作流"
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
										<FormItem label="本地目录地址" {...formItemLayout}>
												<Row gutter={16}>
														<Col span={18}>
																{getFieldDecorator('localPath', {
																		rules: [
																				{
																						required: true,
																						message: '请选择本地文件夹!'
																				}
																		]
																})(<Input placeholder="请选择本地文件夹"/>)}
														</Col>
														<Col span={6}>
																<Button
																		type="primary"
																		onClick={() => {
																		getLocalDirPath(props)
																}}>选择</Button>
														</Col>
												</Row>
										</FormItem>
								</Form>
						</Modal>
				</div>
		);
})

const mapStateToProps = store => {
		return {localVisible: store.flowlist.localVisible, data: store.flowlist.data, isEdit: store.flowlist.isEdit};
};

const mapDispatchToProps = dispatch => {
		return {
				showLocalModal: bindActionCreators(showLocalModal, dispatch),
				addData: bindActionCreators(addData, dispatch),
				editData: bindActionCreators(editData, dispatch)
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalModel);