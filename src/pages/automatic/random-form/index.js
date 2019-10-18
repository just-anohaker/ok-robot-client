import React from 'react';
import { Row, Col, Card, Radio, Form, Input, Select, notification } from 'antd';
import EditBtn from '../../../components/editbtn'
import SwitchConfirm from '../../../components/switch-confirm'
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

class RandomSale extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranSwitch:false,
      accounts:[]
    }
  }

  componentDidMount(){
    let account = [{
      name: 'Jack',
      httpKey: 'wew',
      httpSecret: 'wew',
      passphrase: 'wer'
    },{
      name: 'Lucy',
      httpKey: 'wew',
      httpSecret: 'wew',
      passphrase: 'wer'
    },{
      name: 'Tom',
      httpKey: 'wew',
      httpSecret: 'wew',
      passphrase: 'wer'
    },{
      name: 'Petter',
      httpKey: 'wew',
      httpSecret: 'wew',
      passphrase: 'wer'
    },
  ]
  this.setState({accounts:account})
    // this.props.form.setFieldsValue({

    // })

  }

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
    const result = await okrobot.auto_maker.start()
    console.log(result)
  }
  async stop() {
    console.log('stop')
    const result = await okrobot.auto_maker.stop()
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
    const tranSwitch = this.state.tranSwitch
    let accounts = this.state.accounts || []
    return (
      <div className="random-sale">
        {/*随机买卖*/}
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="随机买卖" extra={<SwitchConfirm tranSwitch={tranSwitch} start={this.start.bind(this)} stop={this.stop.bind(this)} />}  >
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
                <Form.Item label="交易区间" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('bottom', {
                      rules: [{ required: true, message: '请选择交易区间！' }],
                    })(
                      <Input addonAfter="USDT" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('top', {
                      rules: [{ required: true, message: '请选择交易区间！' }],
                    })(
                      <Input addonAfter="USDT" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                </Form.Item>

                <Form.Item label="交易量参数" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('tradeTime', {
                      rules: [{ required: true, message: '请选择交易时长！' }],
                    })(
                      <Select style={{ width: 50, marginRight: 10, marginLeft: 10 }} onChange={this.selectChange}>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="30">30</Option>
                        <Option value="60">60</Option>
                      </Select>
                    )}
                    分钟交易量小于
                </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('tradeParams', {
                      rules: [{ required: true, message: '请选择交易量参数！' }],
                    })(
                      <Input addonAfter="USDT" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                </Form.Item>


                <Form.Item label="单笔交易数量">
                  {getFieldDecorator('transactionNum', {
                    rules: [{ required: true, message: '请输入单笔交易数量!' }],
                  })(
                    <Input placeholder="请输入单笔交易数量" addonAfter={
                      getFieldDecorator('percentage', {
                        rules: [{ required: true, message: '111' }],
                      })(
                        <Select style={{ width: 80 }}>
                          <Option value="5">5%</Option>
                          <Option value="10">10%</Option>
                          <Option value="15">15%</Option>
                          <Option value="20">20%</Option>
                        </Select>
                      )
                    } style={{ width: 230 }} />
                  )}
                </Form.Item>

                <Form.Item label="交易开始条件">
                  {getFieldDecorator('condition', {
                    rules: [{ required: true, message: '请选择交易开始条件！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="a">实时委托</Radio.Button>
                      <Radio.Button value="b">超出区间</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item label="交易未成功" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('failWay', {
                      rules: [{ required: true, message: '请选择交易条件！' }],
                    })(
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="a">实时委托</Radio.Button>
                        <Radio.Button value="b">超出区间</Radio.Button>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    挂单超过
              {getFieldDecorator('failTime', {
                      rules: [{ required: true, message: '请输入挂单时间！' }],
                    })(
                      <Input style={{ width: 30, marginLeft: 10, marginRight: 10 }} />
                    )}
                    分钟后执行
              </Form.Item>
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
                    {accounts.map((item,index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                    </Select>
                  )}
                </Form.Item>
                <EditBtn></EditBtn>
              </Form>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card title=""  style={{'height':393}} ></Card>
          </Col>
        </Row>
      </div>
    )
  }
}


const Random1 = Form.create({ name: 'random' })(RandomSale);
export default Random1
