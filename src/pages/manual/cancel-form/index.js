import React from 'react';
import { connect } from 'react-redux';
import { Row, Card, Form, Input, notification, Button } from 'antd';
// import DetailBill from '../../../components/detail-bill'
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

class CancelFrom extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranType: 'USDT',
      accounts: [],
      loading: false
    }
  }

  componentDidMount() {
    let account = get("allAccouts") || [];
    this.setState({ accounts: account })
  }

  async cancel(params) {
    try {
      const result = await okrobot.batch_order.cancel(params.options, params.account)
      if (result && result.result) {
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
      this.setState({ loading: false })
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
          topPrice: Number(values.top),
          startPrice: Number(values.bottom)
        };
        let accountsData = this.props.account;

        this.cancel({ options, account: accountsData })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let tranType = this.state.tranType
    return (
      <div className="random-sale">
        {/*批量撤单*/}
        {/* <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}> */}
        <Card title="批量撤单" >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item className="require" label="价格范围" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('bottom', {
                  initialValue: '0.01',
                  rules: [{ required: true, message: '请选择价格范围！' }],
                })(
                  <Input addonAfter={tranType} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('top', {
                  initialValue: '0.02',
                  rules: [{ required: true, message: '请选择交易区间！' }],
                })(
                  <Input addonAfter={tranType} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
            </Form.Item>

            <Row gutter={24} className="btns" >
              <Button type="primary" htmlType="submit" loading={this.state.loading} className="submit">开始撤单</Button>
            </Row>
          </Form>
        </Card>
        {/* </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="卖单情况"></DetailBill>
          </Col>
        </Row> */}
      </div>
    )
  }
}


const Cancel = Form.create({ name: 'cancel' })(CancelFrom);


const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account
  };
};

export default connect(mapStateToProps)(Cancel);
