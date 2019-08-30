import React from 'react';
import { connect } from 'react-redux';
import { Row, Card, Radio, Form, Input, notification, Button, Modal } from 'antd';
// import okrobot from "okrobot-js";
import server from "../../../server";
import EditableFormTable from '../../../components/editable'
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

class BatchFrom extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      tranType: 'USDT',
      loading: false,
      account: this.props.account,
      cost: '',
      data: [],
      detailData: [],
      visible: false
    }
  }

  async generate({ options, account }) {
    try {
      const result = await server.batch_order.generate(options, account);
      this.setState({ loading: false })
      if (result && result.result) {
        this.setState({ detailData: result.orders, visible: true })
      } else if (result && result.error_message) {
        notification.error({
          message: '提示',
          description:
            result.error_message,
        });
      } else {
        notification.error({
          message: '提示',
          description:
            '批量挂单失败，请重试'
        });
      }
    } catch (error) {
      this.setState({ loading: false })
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
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
          type: Number(values.tradeMethod),
          startPrice: Number(values.bottom),
          topPrice: Number(values.top),
          incr: Number(values.incr) / 100,
          size: Number(values.size),
          sizeIncr: Number(values.sizeIncr) / 100,
          instrument_id: this.props.tranType
        };

        this.generate({ options, account: this.props.account })
      }
    });
  }

  changeProps = (data) => {
    this.setState({ detailData: data })
  }
  async sendBatch(options, acct) {
    try {
      const result = await server.batch_order.toBatchOrder(options, acct);
      this.setState({ visible: false });
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '批量挂单成功',
        });
      } else if (result && result.error_message) {
        notification.error({
          message: '提示',
          description:
            result.error_message,
        });
      } else {
        notification.error({
          message: '提示',
          description:
            '批量挂单失败，请重试'
        });
      }
    } catch (error) {
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
      this.setState({ visible: false });

    }

  }
  handleOk = e => {
    console.log(this.state.detailData)
    let options = { orders: this.state.detailData, instrument_id: this.props.tranType };
    let acct = this.props.account
    this.sendBatch(options, acct)
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="random-sale">
        {/*批量挂单*/}
        <Card title="批量挂单" >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="交易方式">
              {getFieldDecorator('tradeMethod', {
                initialValue: '1',
                rules: [{ required: true, message: '请选择交易方式！' }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">买入</Radio.Button>
                  <Radio.Button value="2">卖出</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item className="require" label="价格范围" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('bottom', {
                  initialValue: '0.01',
                  rules: [{ required: true, message: '请选择价格范围！' }],
                })(
                  <Input addonAfter={this.props.addonAfter} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('top', {
                  initialValue: '0.015',
                  rules: [{ required: true, message: '请选择价格范围！' }],
                })(
                  <Input addonAfter={this.props.addonAfter} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="价格递增">
              {getFieldDecorator('incr', {
                initialValue: '20',
                rules: [{ required: true, message: '请输入价格递增数量!' }],
              })(
                <Input placeholder="请输入价格递增数量" type="number" addonAfter="%" style={{ width: 230 }} />
              )}
            </Form.Item>

            <Form.Item className="require" label="起始数量" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('size', {
                  initialValue: '1',
                  rules: [{ required: true, message: '起始数量不能为空!' }],
                })(
                  <Input addonAfter={this.props.addonAfter} type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '50px', textAlign: 'center' }}>增量</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 50px)' }}>
                {getFieldDecorator('sizeIncr', {
                  initialValue: '100',
                  rules: [{ required: true, message: '增量不能为空!' }],
                })(
                  <Input addonAfter="%" type="number" style={{ width: 130 }} />
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="成本">
              <Input value={this.state.cost} disabled style={{ width: 230 }} />
            </Form.Item>


            <Row gutter={24} className="btns" >
              <Button type="primary" htmlType="submit" loading={this.state.loading} className="submit">开始挂单</Button>
            </Row>
          </Form>
        </Card>
        <Modal
          title="订单预览"
          destroyOnClose
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <div>
            <EditableFormTable ref={r => this.child = r} changeProps={this.changeProps} addonAfter={this.props.addonAfter} data={this.state.detailData} ></EditableFormTable>
          </div>
        </Modal>
      </div>
    )
  }
}

const Batch = Form.create({ name: 'batch' })(BatchFrom);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.unit
  };
};

export default connect(mapStateToProps)(Batch);
