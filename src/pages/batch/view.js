import React, { PureComponent, Fragment } from 'react';
import { actions as loading } from '../../components/loading';
import { connect } from 'react-redux';
import store from "../../Store";
import okrobot from "okrobot-js";
// import DetailBill from '../../components/detail-bill/detail';
import { Card, Form, Input, Button, Radio, Select, Row, Col, notification, Table } from 'antd';
const { Option } = Select;

class BatchCard extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      delegate: "none",
      type: "none",
      accounts: []
    };
  }

  handleFormDelegate = e => {
    this.setState({ delegate: e });
  };

  handleFormType = e => {
    this.setState({ type: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      let account = this.props.account
      if (values.delegate === "limit") {
        store.dispatch(loading.showLoading());

        okrobot.batch_order.limitOrder(values, account)
          .then((res) => {
            if(res && res.result){
              notification.success({
                message: '提示',
                description:
                  '交易成功',
              });
            }
            store.dispatch(loading.hideLoading());
          })
          .catch(err => {
            store.dispatch(loading.hideLoading());
            notification["error"]({
              message: "现价交易失败",
              description: "" + err
            });
          });
      }
      else if (values.delegate === "market") {
        store.dispatch(loading.showLoading());

        okrobot.batch_order.marketOrder(values, account)
          .then((res) => {
            if(res && res.result){
              notification.success({
                message: '提示',
                description:
                  '交易成功',
              });
            } else {
              notification.error({
                message: '提示',
                description:
                  '' + res.error_message,
              });
            }
            store.dispatch(loading.hideLoading());
          })
          .catch(err => {
            store.dispatch(loading.hideLoading());
            notification["error"]({
              message: "市价交易失败",
              description: "" + err
            });
          });
      }
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
              <Input style={{ width: 230 }} addonAfter="USDT" />
            )}
          </Form.Item>
          <Form.Item label="总量">
            {getFieldDecorator('size', {
              rules: [{ required: true, message: '请选择交易对!' }],
            })(
              <Input style={{ width: 230 }} addonAfter="ETM" />
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
                <Input addonAfter="USDT" style={{ width: 230 }} />
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
                <Input style={{ width: 230 }} />
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

    // const { accounts } = this.state

    const columns = [
      {
        title: '订单号',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '时间',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '委托价格',
        dataIndex: 'mine',
        key: 'mine',
      },
      {
        title: '数量',
        dataIndex: 'other',
        key: 'other',
      },
      {
        title: '成本',
        dataIndex: 'aaa',
        key: 'aaa',
      },
    ];
    
    return (
      <Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24} >
          <Card title="批量交易" style={{ marginBottom: 24 }}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                    style={{ width: 230 }}
                  >
                    <Option value="limit">限价交易</Option>
                    <Option value="market">市价交易</Option>
                    <Option value="iceberg" disabled>冰山委托</Option>
                  </Select>
                )}
              </Form.Item>
              {this.getDelegatePanel()}

              <Form.Item label="可买">
                <Input disabled addonAfter="ETM" style={{ width: 230 }} />
              </Form.Item>
              <Form.Item label="余额">
                <Input disabled addonAfter="USDT" style={{ width: 230 }} />
              </Form.Item>

              <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card title="交易情况" style={{ marginBottom: 24 }}>
            <Table  columns={columns} data={this.state.data} scroll={{ y: 360 }}/>
          </Card>
        </Col>
      </Row>
    );
  }
}

const BatchPage = Form.create({ name: 'batchcard' })(BatchCard);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account
  };
};

export default connect(mapStateToProps)(BatchPage);
