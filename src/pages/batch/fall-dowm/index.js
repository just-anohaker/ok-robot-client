import React from 'react';
import { Card, Form, Input, Button, Row, Col, notification,Radio } from 'antd';
import { connect } from 'react-redux';
import okrobot from "okrobot-js";
import './index.less'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 5, offset: 5 },
};

class Fall extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: false,
      loading: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType) {
      this.statusFall()
    }
  }
  componentWillMount() {
    this.statusFall()
  }
  async refresh() {
    this.setState({ loading: true })
    await this.statusFall()
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)

  }
  async stop() {
    try {
      const result = await okrobot.auto_maker.stop();
      if (result) {
        notification.success({
          message: '提示',
          description:
            '对倒已停止',
        });
        this.setState({ status: false })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
    }

  }
  async statusFall() {
    try {
      const result = await okrobot.auto_maker.isRunning();
      if (result === true || result === false) {
        this.setState({ status: result })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fallHandle(options, account) {
    try {
      const result = await okrobot.auto_maker.init(options, account);
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '对倒开始',
        });
        this.setState({ status: true })
      }
    } catch (error) {
      notification.error({
        message: '提示',
        description:
          '' + error,
      });
      console.log(error)
    }

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.instrument_id = this.props.tranType
        let account = this.props.account
        this.fallHandle(values, account)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const status = this.state.status ? 'show' : 'hidden';
    const status1 = this.state.status ? 'hidden' : 'show';
    const status2 = this.state.status ? '对倒中' : '已停止'
    return (
      <div className='fall'>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <Card title="自动对倒" style={{ marginBottom: 24 }} extra={(<div><span style={{fontWeight: 600}} >状态 : </span>{status2} <Button style={{ marginLeft: 20 }} loading={this.state.loading} onClick={this.refresh.bind(this)} type="primary">刷新</Button></div>)}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item label="挂单顺序" >
              {getFieldDecorator('type', {
                initialValue: '1',
                rules: [{ required: true, message: '请选择挂单顺序!' }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">先买</Radio.Button>
                  <Radio.Button value="2">先卖</Radio.Button>
                  <Radio.Button value="3">随机</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
              <Form.Item className="require" label="单笔委托范围" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('perStartSize', {
                  rules: [{ required: true, message: '请输入单笔起始值！' }],
                })(
                  <Input addonAfter="ETM" type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('perTopSize', {
                  rules: [{ required: true, message: '请输入单笔结束值！' }],
                })(
                  <Input addonAfter="ETM" type="number" style={{ width: 150 }} />
                )}
              </Form.Item>

            </Form.Item>


                <Form.Item label="成交次数">
                  {getFieldDecorator('countPerM', {
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Input addonAfter="笔/分钟" style={{ width: 230 }} />
                  )}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                  <Button type="primary" className={status1} htmlType="submit">开始对倒</Button>
                  <Button type="primary" className={status} onClick={this.stop.bind(this)}>停止对倒</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

        </Row>
      </div>
    )
  }
}

const FallPage = Form.create({ name: 'fallpage' })(Fall);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name
  };
};

export default connect(mapStateToProps)(FallPage);

