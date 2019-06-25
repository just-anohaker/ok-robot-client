import React from 'react';
import { Card, Form, Input, Button,  notification } from 'antd';
import { connect } from 'react-redux';
import okrobot from "okrobot-js";
import LoadData from '../../../util/LoadData'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 5, offset: 5 },
};

class MakeUp extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: false,
      loading: false
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.tranType !== this.props.tranType){
        this.statusMakeUp()
    }
  }
  componentWillMount() {
    this.statusMakeUp()
  }
  async refresh() {
    this.setState({ loading: true })
    await this.statusMakeUp()
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)

  }
  async stop() {
    try {
      const result = await okrobot.auto_market.stop();
      if (result) {
        notification.success({
          message: '提示',
          description:
            '补单已停止',
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
  async statusMakeUp() {
    try {
      const result = await okrobot.auto_market.isRunning();
      if (result === true || result === false) {
        console.log(result,'makeup')
        this.setState({ status: result })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async makeUpHandle(options, account) {
    try {
      const result = await okrobot.auto_market.init(options, account);
      if (result && result.result) {
        notification.success({
          message: '提示',
          description:
            '补单开始',
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
        this.makeUpHandle(values, account)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const status = this.state.status ? 'show' : 'hidden';
    const status1 = this.state.status ? 'hidden' : 'show';
    const status2 = this.state.status ? '补单中' : '已停止'
    return (
      <div className='fall'>
            <Card title="自动补单" style={{ marginBottom: 24 }} extra={(<div><span style={{fontWeight: 600}} >状态 : </span>{status2} <Button style={{ marginLeft: 20 }} loading={this.state.loading} onClick={this.refresh.bind(this)} type="primary">刷新</Button></div>)}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item label="盘口距离">
                  {getFieldDecorator('distance', {
                    initialValue: '1',
                    rules: [{ required: true, message: '请输入盘口距离！' }],
                  })(
                    <Input  style={{ width: 230 }} />
                  )}
                </Form.Item>
              <Form.Item className="require" label="单笔委托范围" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block' }}>
                {getFieldDecorator('startSize', {
                  rules: [{ required: true, message: '请输入单笔起始值！' }],
                })(
                  <Input addonAfter="ETM" type="number" style={{ width: 150 }} />
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('topSize', {
                  rules: [{ required: true, message: '请输入挂测次数！' }],
                })(
                  <Input addonAfter="ETM" type="number" style={{ width: 150 }} />
                )}
              </Form.Item>

            </Form.Item>


                <Form.Item label="挂撤次数">
                  {getFieldDecorator('countPerM', {
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择交易方式！' }],
                  })(
                    <Input addonAfter="笔/分钟" style={{ width: 230 }} />
                  )}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                  <Button type="primary" className={status1} htmlType="submit">开始补单</Button>
                  <Button type="primary" className={status} onClick={this.stop.bind(this)}>停止补单</Button>
                </Form.Item>
              </Form>
            </Card>
      </div>
    )
  }
}
const LoadMakeUp = LoadData()(MakeUp);
const LoadMake = Form.create({ name: 'fallpage' })(LoadMakeUp);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name
  };
};

export default connect(mapStateToProps)(LoadMake);

