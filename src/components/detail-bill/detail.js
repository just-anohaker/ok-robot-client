import React from 'react';
import { Table, Card } from 'antd'


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

class DetailBill extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }
  render() {
    let title = this.props.title
    let dataSource = this.props.data
    return (
      <Card title={title} style={{ maxHeight: '458px', overflowY: 'scroll' }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Card>
    )
  }
}



export default DetailBill
