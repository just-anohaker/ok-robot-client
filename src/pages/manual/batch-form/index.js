import React from 'react';
import { Row, Col, Card, Radio, Form, Input, Select, notification, Button } from 'antd';
import DetailBill from '../../../components/detail-bill'
import okrobot from "okrobot-js";
okrobot.config.hostname = "http://192.168.2.214:1996"

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
    this.state = {
      tranType: 'ZIL/USDT',
      accounts: [],
      data: []
    }
  }

  componentDidMount() {

    let account = [{
      name: 'Jack',
      httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
      httpsecret: 'A463C43A23214D470D712311D88D3CEB',
      passphrase: '88888888'
    }];
    const dataSource = [
      {
        key: '1',
        price: '123',
        sum: 32,
        mine: '004',
        other: '001'
      },
      {
        key: '2',
        price: '121',
        sum: 42,
        mine: '004',
        other: '001'
      },
      {
        key: '3',
        price: '153',
        sum: 32,
        mine: '004',
        other: '001'
      },
      {
        key: '4',
        price: '4534',
        sum: 42,
        mine: '004',
        other: '001'
      },
      {
        key: '5',
        price: '2342',
        sum: 32,
        mine: '004',
        other: '001'
      },
      {
        key: '6',
        price: '123',
        sum: 42,
        mine: '004',
        other: '001'
      },
      {
        key: '7',
        price: '123',
        sum: 32,
        mine: '004',
        other: '001'
      },
      {
        key: '8',
        price: '43534',
        sum: 42,
        mine: '004',
        other: '001'
      },
      {
        key: '9',
        price: '43534',
        sum: 42,
        mine: '004',
        other: '001'
      }
    ];
    this.setState({ data: dataSource, accounts: account })
    // this.props.form.setFieldsValue({
    //   type: '0',
    //   startPrice: 0.01,
    //   topPrice: 0.02,
    //   incr:0.1,
    //   size: 1,
    //   sizeIncr: 0.01
    // })
  }

  async generate({ options, account }) {
    console.log(options, account)
    const result = await okrobot.batch_order.generate(options, account)
    console.log(result)
    // notification.open({
    //   message: 'Notification Title',
    //   description:
    //     '333',
    // });
  }

  async start() {
    const result = await okrobot.batch_order.start()
    console.log(result);
    notification.open({
      message: 'Notification Title',
      description:
        '333',
    });
  }

  handleTranTypeChange(value) {
    this.setState({ tranType: value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let options = {
          type: Number(values.tradeMethod),
          startPrice: Number(values.bottom),
          topPrice: Number(values.top),
          incr: Number(values.incr) / 100,
          size: Number(values.size),
          sizeIncr: Number(values.sizeIncr) / 100
        };
        let accountsData = this.state.accounts;
        let account = {};
        for (let i = 0; i < accountsData.length; i++) {
          if (accountsData[i]['name'] === values.account) {
            account = {
              name: values.account,
              httpkey: accountsData[i].httpkey,
              httpsecret: accountsData[i].httpsecret,
              passphrase: accountsData[i].passphrase
            }
            break;
          }
        }
        this.generate({ options, account })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const accounts = this.state.accounts
    return (
      <div className="random-sale">
        {/*批量挂单*/}
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="批量挂单" >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item label="交易对">
                  {getFieldDecorator('tranType', {
                    initialValue: 'ZIL/USDT',
                    rules: [{ required: true, message: '请选择交易对!' }],
                  })(
                    <Select
                      showSearch
                      style={{ width: 230 }}
                      placeholder="请选择交易对!"
                      optionFilterProp="children"
                      onChange={this.handleTranTypeChange.bind(this)}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="ZIL/USDT">ZIL/USDT</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="交易方式">
                  {getFieldDecorator('tradeMethod', {
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="1">买入</Radio.Button>
                      <Radio.Button value="2">卖出</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item className="require" label="价格范围" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('bottom', {
                      initialValue: '0.01',
                      rules: [{ required: true, message: '请选择价格范围！' }],
                    })(
                      <Input addonAfter={this.state.tranType} type="number" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('top', {
                      initialValue: '0.015',
                      rules: [{ required: true, message: '请选择交易区间！' }],
                    })(
                      <Input addonAfter={this.state.tranType} type="number" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                </Form.Item>

                <Form.Item label="价格递增">
                  {getFieldDecorator('incr', {
                    initialValue: '20',
                    rules: [{ required: true, message: '请输入价格递增数量!' }],
                  })(
                    <Input placeholder="请输入价格递增数量" type="number" addonAfter="%" style={{ width: 230 }} />
                  )}
                </Form.Item>

                <Form.Item className="require" label="起始数量" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('size', {
                      initialValue: '1',
                      rules: [{ required: true, message: '起始数量不能为空!' }],
                    })(
                      <Input addonAfter={this.state.tranType} type="number" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '50px', textAlign: 'center' }}>增量</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 50px)' }}>
                    {getFieldDecorator('sizeIncr', {
                      initialValue: '100',
                      rules: [{ required: true, message: '增量不能为空!' }],
                    })(
                      <Input addonAfter="%" type="number" style={{ width: 130 }} />
                    )}
                  </Form.Item>
                </Form.Item>

                <Form.Item label="成本">
                  <Input disabled style={{ width: 230 }} />
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
                      {accounts.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                    </Select>
                  )}
                </Form.Item>
                <Row gutter={24} className="btns" >
                  <Button type="primary" htmlType="submit" className="submit">开始挂单</Button>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="买单情况" data={this.state.data}></DetailBill>
          </Col>
        </Row>
      </div>
    )
  }
}


const Batch = Form.create({ name: 'batch' })(BatchFrom);
export default Batch
