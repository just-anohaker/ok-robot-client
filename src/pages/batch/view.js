import React, { PureComponent, Fragment } from 'react';
import { actions as loading } from '../../components/loading';
import store from "../../Store";
import okrobot from "okrobot-js";
import { get } from "../../util/localstorage.js";
import { Card, Form, Input, Button, Radio, Select, Row, Col, notification } from 'antd';
const { Option } = Select;

okrobot.config.hostname = "http://47.111.160.173:1996"
// okrobot.config.hostname = "http://192.168.2.214:1996"


class BatchCard extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      delegate: "none",
      type: "none",
      accounts: []
    };
  }

  componentDidMount() {
    let accounts = get("allAccouts");
    if (!accounts instanceof Array) {
      accounts = [];
    }
    this.setState({ accounts })
  }

  handleFormDelegate = e => {
    // console.log("handleFormDelegate", e)
    this.setState({ delegate: e });
  };

  handleFormType = e => {
    // console.log("handleFormType", e.target.value)
    this.setState({ type: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(values, this.state.accounts)

      if (values.delegate === "limit") {
        store.dispatch(loading.showLoading());
        // let account =  {
        //   httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
        //   httpsecret: 'A463C43A23214D470D712311D88D3CEB',
        //   passphrase: '88888888'
        // };
        let account = this.state.accounts.filter(a => a.name === values.account);
        console.log(account)
        okrobot.batch_order.limitOrder(values, account)
          .then(() => {
            store.dispatch(loading.hideLoading());
          })
          .catch(err => {
            store.dispatch(loading.hideLoading());
            notification["error"]({
              message: "现价交易失败失败",
              description: "" + err
            });
            // message.error("现价交易失败失败！" + err);
          });
      }
      else if (values.delegate === "market") {
        store.dispatch(loading.showLoading());

        // let account =  {
        //   httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
        //   httpsecret: 'A463C43A23214D470D712311D88D3CEB',
        //   passphrase: '88888888'
        // };
        let account = this.state.accounts.filter(a => a.name === values.account);
        okrobot.batch_order.marketOrder(values, account)
          .then(() => {
            store.dispatch(loading.hideLoading());
          })
          .catch(err => {
            store.dispatch(loading.hideLoading());
            notification["error"]({
              message: "市价交易失败失败",
              description: "" + err
            });
            // message.error("市价交易失败失败！" + err);
          });
      }

    });
  };


  getDelegatePanel() {
    const { getFieldDecorator } = this.props.form;
    let { delegate, type } = this.state;

    if (delegate === "iceberg") {
      return (
        <Fragment >
          <Form.Item label="委托总量">
            {getFieldDecorator('total', {
              rules: [{ required: true, message: '请输入委托总量!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="委托深度" >
            {getFieldDecorator('deep', {
              rules: [{ required: true, message: '请输入委托深度!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="数量(ETM)">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: '请输入数量!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="最高价(USDT)" >
            {getFieldDecorator('max', {
              rules: [{ required: true, message: '请输入最高价!' }],
            })(
              <Input />
            )}
          </Form.Item>
        </Fragment>
      )
    }
    else if (delegate === "limit") {
      return (
        <Fragment>
          <Form.Item label="价格" >
            {getFieldDecorator('price', {
              rules: [{ required: true, message: '请选择交易对!' }],
            })(
              <Input addonAfter="USDT" />
            )}
          </Form.Item>
          <Form.Item label="总量">
            {getFieldDecorator('size', {
              rules: [{ required: true, message: '请选择交易对!' }],
            })(
              <Input addonAfter="ETM" />
            )}
          </Form.Item>
        </Fragment>
      )
    }
    else if (delegate === "market") {
      if (type === "1") {
        return (
          <Fragment >
            <Form.Item label="金额" >
              {getFieldDecorator('notional', {
                rules: [{ required: true, message: '请输入金额!' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Fragment>
        )
      }
      else if (type === "2") {
        return (
          <Fragment >
            <Form.Item label="数量" >
              {getFieldDecorator('size', {
                rules: [{ required: true, message: '请输入数量!' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Fragment>
        )
      }
      else {
        return (<Fragment></Fragment>)
      }
    }
    else {
      return (<Fragment></Fragment>)
    }
  }

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

    const { accounts } = this.state

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
                  >
                    <Option value="ETM">ETM</Option>
                    <Option value="USDT">USDT</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="交易类型" >
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择交易对!' }],
                })(
                  <Radio.Group onChange={this.handleFormType} buttonStyle="solid">
                    <Radio.Button value="1">买入</Radio.Button>
                    <Radio.Button value="2">卖出</Radio.Button>
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
                  // style={{ width: 230 }}
                  >
                    <Option value="limit">限价交易</Option>
                    <Option value="market">市价交易</Option>
                    <Option value="iceberg" disabled>冰山委托</Option>
                  </Select>
                )}
              </Form.Item>
              {this.getDelegatePanel()}
              <Form.Item label="可买ETM" >

              </Form.Item>
              <Form.Item label="USDT余额">

              </Form.Item>
              <Form.Item label="执行账户" >
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入执行账户!' }],
                })(
                  <Select
                    placeholder="请选择交易执行账户"
                    onChange={this.handleFormAccounts}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {accounts.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}

                  </Select>
                )}
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
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
