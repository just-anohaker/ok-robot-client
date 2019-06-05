import React from 'react';
import { Row, Col, Card, Radio, Form, Input, Select, notification, Button } from 'antd';
import Detailtable from '../../../components/detailtable'
import okrobot from "okrobot-js";

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

class BatchFrom extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }

  componentDidMount(){}

  async init(params) {
    console.log(params)
    const result = await okrobot.auto_maker.init(params)
    console.log(result)
    notification.open({
      message: 'Notification Title',
      description:
        '333',
    });
  }

  async start() {
    console.log('start')
    const result = await okrobot.batch_order.start()
    console.log(result)
  }
  async stop() {
    console.log('stop')
    const result = await okrobot.batch_order.cancel()
    console.log(result)
  }
  async isRunning() {
    const result = await okrobot.auto_maker.isRunning()
    console.log(result)
  }
  async getOptionsAndAccount() {
    const result = await okrobot.auto_maker.getOptionsAndAccount()
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
    return (
      <div className="random-sale">
        {/*批量挂单*/}
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="批量挂单" >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item label="交易对">
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请选择交易对!' }],
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
                <Form.Item label="交易方式">
                  {getFieldDecorator('tradeMethod', {
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                    <Radio.Button value="0">买入</Radio.Button>
                    <Radio.Button value="1">卖出</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item label="价格递增">
                  {getFieldDecorator('transactionNum', {
                    rules: [{ required: true, message: '请输入价格递增数量!' }],
                  })(
                    <Input placeholder="请输入价格递增数量" addonAfter="%"  style={{ width: 230 }} />
                  )}
                </Form.Item>


                <Form.Item className="require" label="起始数量" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('bottom', {
                      rules: [{ required: true, message: '请选择起始数量！' }],
                    })(
                      <Input addonAfter="USDT" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '50px', textAlign: 'center' }}>增量</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('top', {
                      rules: [{ required: true, message: '请选择交易区间！' }],
                    })(
                      <Input addonAfter="%" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                </Form.Item>

                <Form.Item label="成本">
                  {getFieldDecorator('transactionNum', {
                  })(
                    <Input  disabled  style={{ width: 230 }} />
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
                <Row gutter={24} className="btns" >
                  <Button type="primary" htmlType="submit" className="aaa">开始挂单</Button>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Detailtable></Detailtable>
          </Col>
        </Row>
      </div>
    )
  }
}


const Batch = Form.create({ name: 'batch' })(BatchFrom);
export default Batch
