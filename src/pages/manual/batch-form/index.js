import React from 'react';
import { connect } from 'react-redux';
import { Row, Card, Radio, Form, Input, notification, Button } from 'antd';
// import DetailBill from '../../../components/detail-bill';
import { get } from "../../../util/localstorage.js";
import okrobot from "okrobot-js";

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
      tranType: 'USDT',
      loading: false,
      account: this.props.account,
      cost: '',
      data: []
    }
  }

  componentDidMount() {
    let account = get("allAccouts") || [];
    this.setState({ accounts: account });

    let o_account = {
      httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
      httpsecret: 'A463C43A23214D470D712311D88D3CEB',
      passphrase: '88888888'
    };

    okrobot.batch_order.startDepInfo(o_account)
      .then((res) => {
        console.log("startDepInfo-then", res);
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
      })

    okrobot.eventbus.on("depth", (name, data) => {
      console.log("startDepInfo-depthevent", name, data);
      let asks = data.asks;
      console.log(asks)
      let dataSource = asks.map((v, i) => {
        let mine = 0, price = v[0], sum = v[1], other = 0;
        if (v.length === 4) {
          mine = v[3];

        }
        other = sum - mine;
        return {
          key: i,
          price,
          sum,
          mine,
          other
        }
      })
      this.setState({ data: dataSource });
    });

    // const dataSource = [
    //   {
    //     key: '1',
    //     price: '123',
    //     sum: 32,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '2',
    //     price: '121',
    //     sum: 42,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '3',
    //     price: '153',
    //     sum: 32,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '4',
    //     price: '4534',
    //     sum: 42,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '5',
    //     price: '2342',
    //     sum: 32,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '6',
    //     price: '123',
    //     sum: 42,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '7',
    //     price: '123',
    //     sum: 32,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '8',
    //     price: '43534',
    //     sum: 42,
    //     mine: '004',
    //     other: '001'
    //   },
    //   {
    //     key: '9',
    //     price: '43534',
    //     sum: 42,
    //     mine: '004',
    //     other: '001'
    //   }
    // ];
    // this.setState({ data: dataSource, accounts: account })
  }

  async generate({ options, account }) {
    try {
      const result = await okrobot.batch_order.generate(options, account)
      if (result && result.result) {
        this.setState({ loading: false, cost: result.cost })
        notification.success({
          message: '提示',
          description:
            '批量挂单成功',
        });
      } else {
        this.setState({ loading: false })
        notification.error({
          message: '提示',
          description:
            '批量挂单失败',
        });
      }
    } catch (error) {
      this.setState({ loading: false })
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
        this.setState({ loading: true })

        let options = {
          type: Number(values.tradeMethod),
          startPrice: Number(values.bottom),
          topPrice: Number(values.top),
          incr: Number(values.incr) / 100,
          size: Number(values.size),
          sizeIncr: Number(values.sizeIncr) / 100
        };
        console.log(this.props.account);
        this.generate({ options, account: this.props.account })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="random-sale">
        {/*批量挂单*/}
        {/* <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}> */}
        <Card title="批量挂单" >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

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
              <Input value={this.state.cost} disabled style={{ width: 230 }} />
            </Form.Item>


            <Row gutter={24} className="btns" >
              <Button type="primary" htmlType="submit" loading={this.state.loading} className="submit">开始挂单</Button>
            </Row>
          </Form>
        </Card>
        {/* </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="卖单情况" data={this.state.data}></DetailBill>
          </Col>
        </Row> */}
      </div>
    )
  }
}

const Batch = Form.create({ name: 'batch' })(BatchFrom);
const mapStateToProps = (state) => {
  console.log(state)
  const infoingData = state.infoing;

  return {
    account: infoingData.account
  };
};

export default connect(mapStateToProps)(Batch);
