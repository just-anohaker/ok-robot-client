import React from 'react';
import { Row, Col, Card, Radio, Form, Input, Select, notification } from 'antd';
import EditBtn from '../../../components/editbtn'
import SwitchConfirm from '../../../components/switch-confirm'
// import okrobot from "okrobot-js";
import server from "../../server";

const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class TransactionForm extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranSwitch:false
    }
  }

  componentDidMount(){}

  async init(params) {
    console.log(params)
    const result = await server.auto_maker.init(params)
    console.log(result)
    notification.open({
      message: 'Notification Title',
      description:
        '333',
    });
  }

  async start() {
    console.log('start')
    const result = await server.auto_maker.start()
    console.log(result)
  }
  async stop() {
    console.log('stop')
    const result = await server.auto_maker.stop()
    console.log(result)
  }
  async isRunning() {
    const result = await server.auto_maker.isRunning()
    console.log(result)
  }
  async getOptionsAndAccount() {
    const result = await server.auto_maker.getOptionsAndAccount()
    console.log(result)
    this.props.form.setFieldsValue({
      tradeMethod: '1',
      top: '1',
      bottom: '1',
      transactionNum: '22'
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log('Received values of form: ', values);
          let options = {
            type: Number(values.tradeMethod),
            topPrice: Number(values.top),
            bottomPrice: Number(values.bottom),
            intervalTime: 1,
            startVolume: 1,
            endVolume: 1,
            tradeType: 0,
            tradeLimit: 1000
          };
          let account = {
            name: '1',
            httpKey: 'wew',
            httpSecret: 'wew',
            passphrase: 'wer'
          }
          this.init({ options, account })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const tranSwitch = this.state.tranSwitch
    return (
      <div className="random-sale">
        {/*深度补充*/}
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="深度补充" extra={<SwitchConfirm tranSwitch={tranSwitch} start={this.start.bind(this)} stop={this.stop.bind(this)} />}  >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="交易方式">
                  {getFieldDecorator('tradeMethod', {
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="0">同时买卖</Radio.Button>
                      <Radio.Button value="1">只挂买单</Radio.Button>
                      <Radio.Button value="2">只挂卖单</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item label="触发数量">
                  {getFieldDecorator('transactionNum', {
                    rules: [{ required: true, message: '请输入触发数量!' }],
                  })(
                    <Input placeholder="请输入单笔交易数量" style={{ width: 230 }} />
                  )}
                </Form.Item>

                <Form.Item label="交易开始条件">
                  {getFieldDecorator('condition', {
                    rules: [{ required: true, message: '请选择交易开始条件！' }],
                  })(
                    <Radio.Group >
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item label="执行账户">
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请选择交易执行账户!' }],
                  })(
                    <Select
                      showSearch
                      style={{ width: 230 }}
                      placeholder="请选择交易执行账户"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                </Form.Item>
                <EditBtn></EditBtn>
              </Form>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card title=""  style={{'height':393}} >
          </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


const Transaction = Form.create({ name: 'transaction' })(TransactionForm);
export default Transaction
