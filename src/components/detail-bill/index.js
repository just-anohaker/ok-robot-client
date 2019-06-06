import React from 'react';
import { Table, Card } from 'antd'


const columns = [
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '总委托量',
    dataIndex: 'sum',
    key: 'sum',
  },
  {
    title: '我的委托',
    dataIndex: 'mine',
    key: 'mine',
  },
  {
    title: '外部委托',
    dataIndex: 'other',
    key: 'other',
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
