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
import {showCreateModal} from '../../actions/flowList';
import {addData} from '../../actions/projectList';

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
							const data = {
									...values,
									isInit:false,
									isImport:false,
									templateData:{...props.data}
							}
							props.addData(data)
						}
				});
}

const handleCancel = (props) => {
		props.showCreateModal(false);
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

const CreateModal = Form.create()((props) => {
		const {visible, form} = props;
		const {getFieldDecorator} = form;
		return (
				<div>
						<Modal
								title="创建项目"
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
										<FormItem label="项目名称" {...formItemLayout}>
												{getFieldDecorator('name', {
														rules: [
																{
																		required: true,
																		message: '请输入项目名称!'
																}
														]
												})(<Input placeholder="请输入项目名称"/>)}
										</FormItem>
										<FormItem label="项目描述" {...formItemLayout}>
												{getFieldDecorator('description', {
														rules: [
																{
																		required: true,
																		message: '请输入项目描述!'
																}
														]
												})(<Input placeholder="请输入项目描述"/>)}
										</FormItem>
										<FormItem label="项目作者" {...formItemLayout}>
												{getFieldDecorator('author', {
														rules: [
																{
																		required: true,
																		message: '请输入项目作者!'
																}
														]
												})(<Input placeholder="请输入项目作者"/>)}
										</FormItem>
										<FormItem label="项目文件位置" {...formItemLayout}>
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
				showCreateModal: bindActionCreators(showCreateModal, dispatch),
				addData: bindActionCreators(addData, dispatch)
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);