import React from 'react';
import { Row,Col,Card,Switch,Radio,Form,InputNumber,Input,Button } from 'antd';
import AccountTree from '../../components/account-tree'

class ManualPage extends React.Component{
    constructor(...args){
      super(...args)
      this.state = {

      }
    }
    render(){
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
      return (
        <div className="manual">
          <Row gutter={24}>
          {/*区域交易*/}
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card title="批量下单" extra={<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />}  >
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="交易类型">
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a">买入</Radio.Button>
                      <Radio.Button value="b">卖出</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="交易方式">
                    <Radio.Group defaultValue="b5" buttonStyle="solid">
                      <Radio.Button value="b1">限价买入</Radio.Button>
                      <Radio.Button value="b2">市价买入</Radio.Button>
                      <Radio.Button value="b3">计划委托</Radio.Button>
                      <Radio.Button value="b4">跟踪委托</Radio.Button>
                      <Radio.Button value="b5">冰山委托</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="价格">
                  <Input  defaultValue={3.00000}   addonAfter="USDT" style={{ width: 200 }} />
                </Form.Item>
                <Form.Item label="单笔交易数量">
                  <Input  defaultValue={3}   style={{ width: 200 }} />
                </Form.Item>
                <Form.Item label="循环次数">
                  <InputNumber placeholder="请输入循环次数"  style={{ width: 200 }}/>
                </Form.Item>
              </Form>
              <Row gutter={24} ><Button style={{float:'right',marginRight:10}}  type="primary">开始交易</Button></Row>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                <AccountTree />
            </Col>
          </Row>

        </div>
      )
    }
}


export default ManualPage;
