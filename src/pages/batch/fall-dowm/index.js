import React from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';

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

class Fall extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <Card title="自动对倒" style={{ marginBottom: 24 }}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item label="单笔委托数量">
                  <Input addonAfter="ETM" style={{ width: 230 }} />
                </Form.Item>
                <Form.Item label="成交次数">
                  <Input addonAfter="笔/分钟" style={{ width: 230 }} />
                </Form.Item>

                <Form.Item {...formTailLayout}>
                  <Button type="primary" htmlType="submit">开始对倒</Button>
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

export default FallPage
