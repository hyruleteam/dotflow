import React from 'react';
import { 
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  message
} from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showImportModal,addData,fetchList} from '../../actions/projectList';

const FormItem = Form.Item;
const {remote} = window.require('electron');
const {utils} = remote.getGlobal('services');

const formItemLayout = {
		labelCol: {
				span: 6
		},
		wrapperCol: {
				span: 16
		}
};

const getLocalDirPath = (props) => {
  remote
      .dialog
      .showOpenDialog({
          properties: ['openDirectory']
      }, (filePaths) => {
          if (filePaths) {
              props.form.setFieldsValue({localPath: filePaths[0]});
          }
      })
}

const handleOk = (props) => {
		props
				.form
				.validateFields(async (err, values) => {
						if (!err) {
              try{
                let data = {
                  localPath:values.localPath,
                  isInit:true,
                  isImport:true
                }
                const {msg} = await utils.readPackageJson(values)
                data.name = msg.name;
                data.description = msg.description;
                data.author = msg.author
                
                props.addData(data);
                props.showImportModal(false);
                props.fetchList();
              }catch(e){
                message.error('请检查package.json文件是否存在')
                return;
              }
						}
				});
}

const handleCancel = (props) => {
    props.showImportModal(false);
    props.form.resetFields();
}

const ImportModal = Form.create({
		mapPropsToFields(props) {
				if (props.isEdit) {
						return {
								name: Form.createFormField({value: props.data.name}),
								description: Form.createFormField({value: props.data.description}),
								gitRepo: Form.createFormField({value: props.data.gitRepo})
						};
				}
		},
		// onFieldsChange(props, fields) {   console.log('onFieldsChange', fields); },
})((props) => {
		const {visible, form} = props;
		const {getFieldDecorator} = form;
		return (
				<div>
						<Modal
								title="导入已有项目"
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
										<FormItem label="项目所属路径" {...formItemLayout}>
                      <Row gutter={16}>
                        <Col span={18}>
                          {getFieldDecorator('localPath', {
                            rules: [
                              {
                                required: true,
                                message: '请选择本地文件夹!'
                              }
                            ]
                          })(<Input placeholder="请选择本地文件夹" />)}
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
    return {
      importVisible: store.projectList.importVisible, 
      data: store.projectList.data, 
    };
};

const mapDispatchToProps = dispatch => {
		return {
      showImportModal: bindActionCreators(showImportModal, dispatch),
      fetchList:bindActionCreators(fetchList, dispatch),
      addData:bindActionCreators(addData, dispatch),
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);