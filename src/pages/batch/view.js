import React, { PureComponent, Fragment } from 'react';
// import styles from './batch.module.css';
import { Card, Form, Input, Button, Radio, Select, Row, Col } from 'antd';
const { Option } = Select;



class BatchCard extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      delegate: 'none',
    };
  }

  handleFormPair = () => {

  }

  handleFormTransaction = () => {

  }

  handleFormDelegate = e => {
    console.log(e)
    this.setState({ delegate: e });
  };

  getDelegatePanel(type) {
    if (type === "iceberg") {
      return (
        <Fragment >
          <Form.Item label="委托总量">
            <Input placeholder="请输入执行账户" />
          </Form.Item>
          <Form.Item label="委托深度" >
            <Input placeholder="请输入执行账户" />
          </Form.Item>
          <Form.Item label="数量(ETM)">
            <Input placeholder="请输入执行账户" />
          </Form.Item>
          <Form.Item label="最高价(USDT)" >
            <Input placeholder="请输入执行账户" />
          </Form.Item>
        </Fragment>
      )
    }
    else if (type === "limit") {
      return (
        <Fragment>
          <Form.Item label="价格(USDT)" >
            <Input placeholder="请输入执行账户" />
          </Form.Item>
          <Form.Item label="总量(ETM)">
            <Input placeholder="请输入执行账户" />
          </Form.Item>
        </Fragment>
      )
    }
    else if (type === "market") {
      return (
        <div >
          <Form.Item label="金额" >
            <Input placeholder="请输入执行账户" />
          </Form.Item>
        </div>
      )
    }
    else {
      return (<div></div>)
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

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
    const formTailLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4, offset: 4 },
    };


    return (
      <Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24} >
          <Card title="批量交易" >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="交易对">
                {getFieldDecorator('tranPair', {
                  rules: [{ required: true, message: '请选择交易对!' }],
                })(
                  <Select
                    placeholder="请选择交易对"
                    style={{ width: 230 }}
                  // onChange={this.handleFormPair}
                  >
                    <Option value="ETM">ETM</Option>
                    <Option value="USDT">USDT</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="交易类型" >
                {getFieldDecorator('tranType', {
                  rules: [{ required: true, message: '请选择交易对!' }],
                })(
                  <Radio.Group onChange={this.handleFormTransaction}>
                    <Radio.Button value="buy">买入</Radio.Button>
                    <Radio.Button value="sell">卖出</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="委托类型">
                {getFieldDecorator('delegate', {
                  rules: [{ required: true }],
                })(
                  <Select
                    placeholder="请选择委托类型"
                    onChange={this.handleFormDelegate}
                    style={{ width: 230 }}
                  >
                    <Option value="limit">限价交易</Option>
                    <Option value="market">市价交易</Option>
                    <Option value="iceberg">冰山委托</Option>
                  </Select>
                )}
                {/* {this.getDelegatePanel(this.state.delegate)} */}
              </Form.Item>
              {this.getDelegatePanel(this.state.delegate)}
              <Form.Item label="可买ETM" >

              </Form.Item>
              <Form.Item label="USDT余额">

              </Form.Item>
              <Form.Item label="执行账户" >
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入执行账户!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row >
    );
  }
}

const BatchPage = Form.create({ name: 'batchcard' })(BatchCard);
export default BatchPage;