import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, notification, Button, Icon, Radio  } from 'antd';
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


class Add extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranType: 'USDT',
      accounts: [],
      loading: false,
      disabled:false,
      filepath: ''
    }
  }

  componentDidMount() {}

   isElectronPlatform() {
    return window !== undefined && window.ipcNative !== undefined;
  }
  showUpload = async () => {
    if(this.isElectronPlatform()){
      const result = await okrobot.utils.openFileDialog();
      if(result && !result.canceled){
        console.log(result.filepath);
        this.setState({
          filepath:result.filepath
        })
      }
    }
  }
  async addWarnings(params) {
    try {
      const result = await okrobot.batch_order.addWarnings(params.options, params.account);
      this.setState({ loading: false });
      console.log(result);
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '添加成功',
        });
      this.props.refresh()
        console.log(this.state.filepath,'传入路径');
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.filepath === ''){
          notification.error({
            message: '提示',
            description:
              '音乐文件不能为空',
          });
          return 
        }
        this.setState({ loading: true })
        let options = {
          type: '4',
          filepath: this.state.filepath,
          maxprice: values.maxprice,
          minprice: values.minprice,
          pecent: ''+values.pecent / 100,
          instrument_id: values.instrument_id
        };
        let accountsData = this.props.account;
        this.addWarnings({ options, account: accountsData })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let addon = this.props.tranType === 'ETM-USDT' ? 'T' : 'K';
    let show = this.props.tranType === 'ETM-USDK' ? 'none' : 'inline-block';
    return (
      <div className="add-warning">
        {/*浮动预警*/}
        <Card title="浮动预警"  >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="交易对">
              {getFieldDecorator('instrument_id', {
                initialValue: 'ETM-USD'+ addon,
                rules: [{ required: true, message: '请选择价格范围！' }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={'ETM-USD'+ addon}>ETM-USD{addon}</Radio.Button>
                  <Radio.Button style={{display:show}} value={'BTC-USD'+ addon}>BTC-USD{addon}</Radio.Button>
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
          <Form.Item label="下限价格">
          {getFieldDecorator('minprice', {
              rules: [{ required: true,message: '请输入下限价格！' }],
            })(
              <Input   style={{ width: 230 }} />
            )}
          </Form.Item>
          <Form.Item label="浮动百分比">
              {getFieldDecorator('pecent', {
                initialValue: '20',
                rules: [{ required: true, message: '请输入价格递增数量!' }],
              })(
                <Input placeholder="请输入价格递增数量" type="number" addonAfter="%" style={{ width: 230 }} />
              )}
            </Form.Item>
          <Form.Item label="音乐文件">
                <Button onClick={this.showUpload}>
                  <Icon type="upload" /> 上传
                </Button >
          </Form.Item>
            <Form.Item gutter={24} className="btns" >
              <Button type="primary" htmlType="submit" loading={this.state.loading} className="submit">提交预警</Button>
            </Form.Item>
          </Form>
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
