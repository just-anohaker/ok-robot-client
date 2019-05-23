import React from 'react';
import { Row,Col,Card,Switch,Radio,Form,Input,Button, Select } from 'antd';
import AccountTree from '../../../components/account-tree'

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
class RandomSale extends React.Component{
  constructor(){
    super()
    this.state={}
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render(){

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="random-sale">
        {/*随机买卖*/}
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="随机买卖" extra={<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />}  >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="交易方式">
              {getFieldDecorator('value1', {
                rules: [{ required: true, message: '请选择交易方式！' }],
              })(
                  <Radio.Group  buttonStyle="solid">
                    <Radio.Button value="a">同时买卖</Radio.Button>
                    <Radio.Button value="b">只挂买单</Radio.Button>
                    <Radio.Button value="c">只挂卖单</Radio.Button>
                  </Radio.Group>
              )}
              </Form.Item>
              <Form.Item label="交易区间" style={{ marginBottom: 0 }}>
                <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('value2', {
                  rules: [{ required: true, message: '请选择交易区间！' }],
                })(
                <Input   addonAfter="USDT" style={{ width: 150 }} />
                )}
                </Form.Item>
                <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('value7', {
                  rules: [{ required: true, message: '请选择交易区间！' }],
                })(
                <Input  addonAfter="USDT" style={{ width: 150}} />
                )}
                </Form.Item>
              </Form.Item>

              <Form.Item label="交易量参数" style={{ marginBottom: 0 }}>
                <Form.Item style={{ display: 'inline-block' }}>
                每
                {getFieldDecorator('value3', {
                  rules: [{ required: true, message: '请选择交易量参数！' }],
                })(
                  <Select style={{ width: 50,marginRight:10,marginLeft:10 }} onChange={this.selectChange}>
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
                {getFieldDecorator('value4', {
                  rules: [{ required: true, message: '请选择交易量参数！' }],
                })(
                <Input   addonAfter="USDT" style={{ width: 150}} />
                )}
                </Form.Item>
              </Form.Item>


              <Form.Item label="单笔交易数量">
              {getFieldDecorator('value5', {
                rules: [{ required: true, message: '请选择单笔交易数量！' }],
              })(
                <Input placeholder="请输入单笔交易数量"  style={{ width: 200 }}/>
              )}
              </Form.Item>
              <Form.Item label="交易开始条件">
              {getFieldDecorator('value6', {
                rules: [{ required: true, message: '请选择交易开始条件！' }],
              })(
              <Radio.Group  buttonStyle="solid">
                <Radio.Button value="a">实时委托</Radio.Button>
                <Radio.Button value="b">超出区间</Radio.Button>
              </Radio.Group>
              )}
              </Form.Item>
              <Row gutter={24} ><Button style={{float:'right',marginRight:10}}  htmlType="submit"  type="primary">编辑参数</Button></Row>
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


const Random1 = Form.create({ name: 'random' })(RandomSale);
export default Random1
