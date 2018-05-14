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
import {showLocalModal, addData, editData,chooseDir} from '../../actions/flowList';

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
								if (props.isEdit) {
										const data = {
												values: {
														...values
												},
												_id: props.data[0]._id
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
		props
				.form
				.resetFields();
}

const LocalModel = Form.create({
		mapPropsToFields(props) {
		
				if(!props.isEdit && props.dirPath){
					return {
						localPath: Form.createFormField({value: props.dirPath[0]})
					}
				}

				if (props.isEdit) {
						let data = {
								name: Form.createFormField({value: props.data[0].name}),
								description: Form.createFormField({value: props.data[0].description}),
								localPath: Form.createFormField({value: props.data[0].localPath})
						}
						if(props.dirPath){data.localPath = Form.createFormField({value: props.dirPath[0]})}
						return data;
				}
		},
		// onFieldsChange(props, fields) {   console.log('onFieldsChange', fields); },
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
																<Button type="primary" onClick={() => {props.chooseDir()}}>选择</Button>
														</Col>
												</Row>
										</FormItem>
								</Form>
						</Modal>
				</div>
		);
})

const mapStateToProps = store => {
	return {
		localVisible: store.flowlist.localVisible, 
		data: store.flowlist.data, 
		isEdit: store.flowlist.isEdit,
		dirPath:store.flowlist.dirPath
	};
};

const mapDispatchToProps = dispatch => {
		return {
				showLocalModal: bindActionCreators(showLocalModal, dispatch),
				addData: bindActionCreators(addData, dispatch),
				editData: bindActionCreators(editData, dispatch),
				chooseDir:bindActionCreators(chooseDir, dispatch)
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalModel);