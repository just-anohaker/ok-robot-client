import React from 'react';
import { connect } from 'react-redux';
import { Row, Card, Form, Input, notification, Button } from 'antd';
import { get } from "../../../util/localstorage.js";

// import okrobot from "okrobot-js";
import server from "../../../server";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
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
  cancelAll = () => {
    this.cancel({options:{ topPrice: 0,startPrice:0,instrument_id: this.props.tranType},account:this.props.account})
  }
  async cancel(params) {
    try {
      const result = await server.batch_order.cancel(params.options, params.account);
      this.setState({ loading: false });
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '撤单成功',
        });
      } else if(result && result.error_message) {
        notification.error({
          message: '提示',
          description:
            result.error_message,
        });
      } else {
        notification.error({
          message: '提示',
          description:
            '撤单失败，请重试',
        });
      }
    } catch (error) {
      this.setState({ loading: false })
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
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
          startPrice: Number(values.bottom),
          instrument_id: this.props.tranType

        };
        let accountsData = this.props.account;

        this.cancel({ options, account: accountsData })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let tranType = this.props.addonAfter
    return (
      <div className="random-sale">
        {/*批量撤单*/}
        <Card title="批量撤单" extra={<Button type="primary" onClick={this.cancelAll}>一键撤单</Button>} >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item className="require" label="价格范围" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('bottom', {
                  rules: [{ required: true, message: '请输入价格范围起始值！' }],
                })(
                  <Input addonAfter={tranType} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('top', {
                  rules: [{ required: true, message: '请输入价格范围最终值！' }],
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
      </div>
    )
  }
}


const Cancel = Form.create({ name: 'cancel' })(CancelFrom);


const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)

  };
};

export default connect(mapStateToProps)(Cancel);
