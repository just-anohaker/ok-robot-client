import React from 'react';
import { Row, Col, Card, Form, Input, Select, notification, Button } from 'antd';
import DetailBill from '../../../components/detail-bill'

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

class CancelFrom extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranType: 'ZIL/USDT',
      accounts: [],
      loading:false
    }
  }

  componentDidMount() {
    let account = [{
      name: 'Jack',
      httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
      httpsecret: 'A463C43A23214D470D712311D88D3CEB',
      passphrase: '88888888'
    }]
    this.setState({ accounts: account })
  }

  async cancel(params) {
    try {
      const result = await okrobot.batch_order.cancel(params.options,params.account)
    if(result && result.result){
      notification.success({
        message: '提示',
        description:
          '批量撤单成功',
      });
    } else {
      notification.error({
        message: '提示',
        description:
          '请求失败',
      });
    }
    this.setState({loading:false})
    } catch (error) {
      this.setState({loading:false})
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
        this.setState({loading:true})
        let options = {
          topPrice: Number(values.top),
          startPrice: Number(values.bottom)
        };
        let account = {}
        let accountData = this.state.accounts;
        for (let i = 0; i < accountData.length; i++) {
          if (accountData[i]['name'] === values.account) {
            account = {
              name: values.account,
              httpkey: accountData[i].httpkey,
              httpsecret: accountData[i].httpsecret,
              passphrase: accountData[i].passphrase
            }
            break;
          }
        }
        this.cancel({ options, account })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let tranType = this.state.tranType
    let accounts = this.state.accounts
    return (
      <div className="random-sale">
        {/*批量撤单*/}
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="批量撤单" >
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

                <Form.Item className="require" label="价格范围" style={{ marginBottom: 0 }}>
                  <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('bottom', {
                      initialValue:'0.01',
                      rules: [{ required: true, message: '请选择价格范围！' }],
                    })(
                      <Input addonAfter={tranType} type="number" style={{ width: 150 }} />
                    )}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('top', {
                      initialValue:'0.02',
                      rules: [{ required: true, message: '请选择交易区间！' }],
                    })(
                      <Input addonAfter={tranType} type="number" style={{ width: 150 }} />
                    )}
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
                      {accounts.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                    </Select>
                  )}
                </Form.Item>
                <Row gutter={24} className="btns" >
                  <Button type="primary" htmlType="submit" loading={this.state.loading}  className="submit">开始撤单</Button>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="卖单情况"></DetailBill>
          </Col>
        </Row>
      </div>
    )
  }
}


const Cancel = Form.create({ name: 'cancel' })(CancelFrom);
export default Cancel
