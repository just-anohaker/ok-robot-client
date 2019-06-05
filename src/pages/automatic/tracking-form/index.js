import React from 'react';
import { Row, Col, Card, Switch, Radio, Form, Input, Select } from 'antd';
import AccountTree from '../../../components/account-tree'
import EditBtn from '../../../components/editbtn'

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
class Tracking extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="track-sale">
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="跟踪交易" extra={<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />}  >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="交易方式">
                  {getFieldDecorator('tradeMethod', {
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="a">同时买卖</Radio.Button>
                      <Radio.Button value="b">只挂买单</Radio.Button>
                      <Radio.Button value="c">只挂卖单</Radio.Button>
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
            <AccountTree />
          </Col>
        </Row>
      </div>
    )
  }
}

const Track = Form.create({ name: 'tracking' })(Tracking);
export default Track
