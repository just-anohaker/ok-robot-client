import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, notification, Button, Upload, Icon, message, Radio  } from 'antd';
import './add.css'
import okrobot from "okrobot-js";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const props = {
  name: 'file',
  action: 'http://192.168.2.78:1996/upload',
 
};
class Add extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranType: 'USDT',
      accounts: [],
      loading: false,
      disabled:false,
      name: ''
    }
  }

  componentDidMount() {}
  async addWarnings(params) {
    try {
      const result = await okrobot.batch_order.addWarnings(params.options, params.account);
      this.setState({ loading: false });
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '添加成功',
        });
      } else if(result && result.error_message) {
        notification.error({
          message: '提示',
          description:
            result.error_message,
        });
      } else {
        notification.error({
          message: '提示',
          description:
            '添加失败，请重试',
        });
      }
    } catch (error) {
      this.setState({ loading: false })
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
      console.log(error)
    }
  }

  handleTranTypeChange(value) {
    this.setState({ tranType: value })
  }
  uploadChange = (info) =>{
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const {file:{response:{result:{filename:name}}}} = info;
        this.setState({disabled:true,name:name});
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // if(this.state.path === ''){
        //   notification.error({
        //     message: '提示',
        //     description:
        //       '音乐文件不能为空',
        //   });
        //   return 
        // }
        this.setState({ loading: true })
        let options = {
          filepath: this.state.name,
          maxprice: values.maxprice,
          instrument_id: values.instrument_id
        };
        let accountsData = this.props.account;
        console.log(options,accountsData);
        // this.addWarnings({ options, account: accountsData })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let addon = this.props.tranType === 'ETM-USDT' ? 'T' : 'K'
    return (
      <div className="add-warning">
        {/*上限预警*/}
        <Card title="上限预警"  >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="交易对">
              {getFieldDecorator('instrument_id', {
                initialValue: 'ETM-USD'+ addon,
                rules: [{ required: true, message: '请选择价格范围！' }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={'ETM-USD'+ addon}>ETM-USD{addon}</Radio.Button>
                  <Radio.Button value={'BTC-USD'+ addon}>BTC-USD{addon}</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          <Form.Item label="上限价格">
          {getFieldDecorator('maxprice', {
              rules: [{ required: true,message: '请输入上限价格！' }],
            })(
              <Input   style={{ width: 230 }} />
            )}
          </Form.Item>
          <Form.Item label="音乐文件">
            {getFieldDecorator('filepath', {
                rules: [{ required: true, message: '请选择音乐文件！' }],
              })(
                <Upload {...props} onChange={this.uploadChange} disabled={this.state.disabled}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
              )}   
          </Form.Item>
            <Form.Item gutter={24} className="btns" >
              <Button type="primary" htmlType="submit" loading={this.state.loading} className="submit">提交预警</Button>
            </Form.Item>
          </Form>
          <audio src='' preload="auto" autoPlay controls ></audio>
        </Card>
      </div>
    )
  }
}


const AddForm = Form.create({ name: 'cancel' })(Add);


const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)

  };
};

export default connect(mapStateToProps)(AddForm);
