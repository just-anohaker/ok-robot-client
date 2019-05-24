import React from 'react';
import { Row,Col,Card,Switch,Radio,Form,Input,Button,Select  } from 'antd';
import AccountTree from '../../../components/account-tree'
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

class TransactionForm extends React.Component{
  constructor(){
    super()
    this.state={
      tranSwitch:false,
      showBtn1:false
    }
  }
  tranSwitchHandle(checked){
    this.setState({
      tranSwitch:checked
    })
  }
  editForm(){
    this.setState({
      showBtn1:true
    })
  }
  cancelEdit(){
    this.setState({
      showBtn1:false
    })
  }
  onChange(value){
    console.log(value)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  selectChange(){

  }
  render(){
    const edit = this.state.showBtn1? 'hidden':'show';
    const show = this.state.showBtn1? 'show':'hidden';
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="transaction-form">
        <Row gutter={24}>
        {/*区域交易*/}
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="稳定市价" extra={<Switch checkedChildren="开" unCheckedChildren="关" checked={this.state.tranSwitch} onChange={this.tranSwitchHandle.bind(this)} />}  >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="交易方式">
              {getFieldDecorator('tradeMethod', {
                rules: [{ required: true, message: '请选择交易方式！' }],
              })(
                  <Radio.Group  buttonStyle="solid" >
                    <Radio.Button value="a">同时买卖</Radio.Button>
                    <Radio.Button value="b">只挂买单</Radio.Button>
                    <Radio.Button value="c">只挂卖单</Radio.Button>
                  </Radio.Group>
              )}
              </Form.Item>
              <Form.Item label="区间上限">
              {getFieldDecorator('top', {
                rules: [{ required: true, message: '请输入区间上限!' }],
              })(
                <Input placeholder="请输入区间上限!"  addonAfter="USDT" style={{ width: 230 }} />
                )}
              </Form.Item>
              <Form.Item label="区间下限">
              {getFieldDecorator('bottom', {
                rules: [{ required: true, message: '请输入区间下限!' }],
              })(
                <Input placeholder="请输入区间下限!" addonAfter="USDT" style={{ width: 230 }} />
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
                    <Select  style={{ width: 80 }}>
                    <Option value="5">5%</Option>
                    <Option value="10">10%</Option>
                    <Option value="15">15%</Option>
                    <Option value="20">20%</Option>
                  </Select>
                  )
                }   style={{ width: 230 }}/>
              )}
              </Form.Item>
              <Form.Item label="交易开始条件">
              {getFieldDecorator('condition', {
                rules: [{ required: true, message: '请选择交易开始条件!' }],
              })(
              <Radio.Group  buttonStyle="solid" >
                <Radio.Button value="a">实时委托</Radio.Button>
                <Radio.Button value="b">超出区间</Radio.Button>
              </Radio.Group>
              )}
              </Form.Item>
              <Form.Item label="执行账户">
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请选择交易执行账户!' }],
              })(
                <Select
                showSearch
                style={{ width: 230 }}
                placeholder="请选择交易执行账户"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              )}
              </Form.Item>
            <Row gutter={24} className="btns" >
              <Button className={"edit-btn " +edit}  onClick={this.editForm.bind(this)}  type="primary" >编辑参数</Button>
              <div className={"edit "+show}>
                <Button type="primary" htmlType="submit" className="save">保存设置</Button>
                <Button onClick={this.cancelEdit.bind(this)}>取消</Button>
              </div>
            </Row>
            </Form>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <AccountTree  />
          </Col>
        </Row>
      </div>
    )
  }
}

const Gegional = Form.create({ name: 'gegional' })(TransactionForm);
export default Gegional;
