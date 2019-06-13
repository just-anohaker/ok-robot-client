/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import { actions as loading } from '../../components/loading';
import { connect } from 'react-redux';
import store from "../../Store";
import okrobot from "okrobot-js";
import { Card, Form, Input, Button, Radio, Select, Row, Col, notification, Table } from 'antd';
import { parseTime } from '../../util/utils';
import FallPage from './fall-dowm'
import './index.css';

const { Option } = Select;
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


class BatchCard extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      delegate: "none",
      type: "1",
      data: [],
      accounts: [],
      loading: false,
      lastOderId:'',
      pagination: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType || this.props.account.httpkey !== nextProps.account.httpkey) {
      this.getOrderData({ options: { instrument_id: nextProps.tranType }, account: nextProps.account })
    }
  }

  componentWillMount() {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType }, account: account })
  }

  refresh() {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType}, account: account })
  }

  async getOrderData({ options = {}, account }) {
    try {
      this.setState({ loading: true });
      const res = await okrobot.batch_order.getOrderData(options, account);
      if (res && res.list.length > 0) {
        const pagination = { ...this.state.pagination };
        const data = res.list;
        pagination.total = res.length;
        this.setState({ loading: false, data: data });
      } else {
        this.setState({ loading: false });
        this.setState({ data: [] })
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ data: [] })
      console.log(error)
    }

  }

  statusType(type) {
    // eslint-disable-next-line default-case
    switch (type) {
      case '-2':
        return '失败'
      case '-1':
        return '撤单成功'
      case '0':
        return '等待成交'
      case '1':
        return '部分成交'
      case '2':
        return '完全成交'
      case '3':
        return '下单中'
      case '4':
        return '撤单中'
      case '6':
        return '未完成'
      case '7':
        return '已完成'
    }
  }
  // setStateAsync(state) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   })
  // }
  // async handleTableChange  (pagination)  {
  //   console.log(pagination)
  //   const pager = { ...this.state.pagination };
  //   pager.current = pagination.current;
  //   // await this.setStateAsync({ pagination: pager });

  //   console.log(this.state.lastOderId)
  //   this.getOrderData({ options: { instrument_id: this.props.tranType,from:this.state.lastOderId,limit:10 }, account: this.props.account })
  // }

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
        values.instrument_id = this.props.tranType
        let account = this.props.account
        if (values.delegate === "limit") {
          store.dispatch(loading.showLoading());

          okrobot.batch_order.limitOrder(values, account)
            .then((res) => {
              if (res && res.result) {
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
                message: "现价交易失败",
                description: "" + err
              });
            });
        }
        else if (values.delegate === "market") {
          store.dispatch(loading.showLoading());

          okrobot.batch_order.marketOrder(values, account)
            .then((res) => {
              if (res && res.result) {
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
              <Input style={{ width: 230 }} />
            )}
          </Form.Item>
          <Form.Item label="委托深度" >
            {getFieldDecorator('deep', {
              rules: [{ required: true, message: '请输入委托深度!' }],
            })(
              <Input style={{ width: 230 }} />
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: '请输入数量!' }],
            })(
              <Input style={{ width: 230 }} addonAfter="ETM" />
            )}
          </Form.Item>
          <Form.Item label="最高价" >
            {getFieldDecorator('max', {
              rules: [{ required: true, message: '请输入最高价!' }],
            })(
              <Input style={{ width: 230 }} addonAfter="USDT" />
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
              <Input style={{ width: 230 }} addonAfter={this.props.addonAfter} />
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
                <Input addonAfter={this.props.addonAfter} style={{ width: 230 }} />
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
    const columns = [
      {
        title: '类型',
        dataIndex: 'side',
        render:(text) => (<span>{text === 'buy' ? <span style={{color:'#2fc25b'}}>买入</span> : <span style={{color:'#f04864'}}>卖出</span>}</span>)
      },
      {
        title: '时间',
        dataIndex: 'created_at',
        render: (text) => (
          <span>{parseTime(text)}</span>
        )
      },
      {
        title: '委托价格',
        dataIndex: 'price',
      },
      {
        title: '数量',
        dataIndex: 'size',
      },
      {
        title: '成本',
        dataIndex: 'price_avg',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text) => <span>{this.statusType(text)}</span>
      },
      // {
      //   title: '操作',
      //   dataIndex: 'action',
      //   key: 'action',
      //   //  eslint-disable-next-line
      //   render: text => <a href="javascript:;">详情</a>,
      // },
    ];

    const tableAttr = {
      columns,
      scroll: { x: 600 },
      size:'small'
    };
    let tranType = this.props.addonAfter
    return (
      <div className="trans">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <Card title="批量交易" style={{ marginBottom: 24,height:606.5 }}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="交易类型" >
                  {getFieldDecorator('type', {
                    initialValue: '1',
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
                      <Option disabled value="iceberg">冰山委托</Option>
                    </Select>
                  )}
                </Form.Item>
                {this.getDelegatePanel()}

                <Form.Item label="可买">
                  <Input disabled addonAfter="ETM" style={{ width: 230 }} />
                </Form.Item>
                <Form.Item label="余额">
                  <Input disabled addonAfter={tranType} style={{ width: 230 }} />
                </Form.Item>

                <Form.Item {...formTailLayout}>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="交易情况" style={{ marginBottom: 24 }} extra={<Button onClick={this.refresh.bind(this)} type="primary">刷新</Button>} >
              <Table  rowKey={record => record.order_id}  loading={this.state.loading} dataSource={this.state.data} {...tableAttr} />
            </Card>
          </Col>


        </Row>
        <FallPage></FallPage>
      </div>
    );
  }
}

const BatchPage = Form.create({ name: 'batchcard' })(BatchCard);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)

  };
};

export default connect(mapStateToProps)(BatchPage);
