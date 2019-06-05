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

class Target extends React.Component {
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
      <div className="random-sale">
        {/*目标交易*/}
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="目标交易" extra={<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />}  >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="实现策略">
                  {getFieldDecorator('tradeMethod', {
                    rules: [{ required: true, message: '请选择实现策略！' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="a">AAAAA</Radio.Button>
                      <Radio.Button value="b">BBBBB</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>


                <Form.Item label="目标价格">
                  {getFieldDecorator('transactionNum', {
                    rules: [{ required: true, message: '请输入目标价格!' }],
                  })(
                    <Input placeholder="请输入目标价格" addonAfter="USDT"  style={{ width: 230 }} />
                  )}
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

                <Form.Item label="交易间隔">
                  {getFieldDecorator('transactionNum', {
                    rules: [{ required: true, message: '请输入交易间隔时间!' }],
                  })(
                    <Input placeholder="请输入交易间隔时间"  addonAfter='毫秒'  style={{ width: 230 }} />
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


const TargetForm = Form.create({ name: 'random' })(Target);
export default TargetForm
