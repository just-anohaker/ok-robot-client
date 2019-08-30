/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Col, Card, Button } from 'antd';
import { connect } from 'react-redux';
import { parseTime } from '../../util/utils';
// import okrobot from 'okrobot-js'
import server from "../../server";

function statusType(type) {
  // eslint-disable-next-line default-case
  switch (type) {
    case '-2':
      return '失败'
    case '-1':
      return '已撤单'
    case '0':
      return '等待成交'
    case '1':
      return '部分成交'
    case '2':
      return '完全成交'
    case '3':
      return '下单中'
    case '4':
      return '撤单中'
    case '6':
      return '未完成'
    case '7':
      return '已完成'
  }
}
const columns = [
  {
    title: '类型',
    dataIndex: 'side',
    render: (text) => (<span>{text === 'buy' ? <span style={{ color: '#2fc25b' }}>买入</span> : <span style={{ color: '#f04864' }}>卖出</span>}</span>)
  },
  {
    title: '时间',
    dataIndex: 'timestamp',
    render: (text) => (
      <span>{parseTime(text)}</span>
    )
  },
  {
    title: '委托价格',
    dataIndex: 'price',
  },
  {
    title:'已成交数量',
    dataIndex:'filled_size'
  },
  {
    title: '委托数量',
    dataIndex: 'size',
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (text) => <span>{statusType(text)}</span>
  }
];

class Transaction extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: [],
      pagination: {
        pageSize: 10,
        current:1
      },
      loading: false
    }
  }
  componentDidMount() {
    this.getTransaction();
  }
  componentDidUpdate(prevProps){
    const {current,pageSize} = this.state.pagination
    const {tranType,account} = this.props
      if(this.props.account !== prevProps.account || this.props.tranType !== prevProps.tranType){
          this.getTransaction({ state: '-1',instrument_id:tranType, limit: pageSize, offset: (current - 1) * pageSize },account)
      }
  }
  async getTransaction(options = { instrument_id:this.props.tranType,state: '-1', limit: 10, offset: 0 }, account = this.props.account) {
    try {
      this.setState({ loading: true });
      const result = await server.auto_maker.getOrderInfo(options, account);
      if (result && result.list.length >=0) {
        const pagination = { ...this.state.pagination };
        pagination.total = result.count
        this.setState({ data: result.list, loading: false, pagination })
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      console.log(error)
    }

  }
  refrsh = () => {
    const {current,pageSize} = this.state.pagination
    const {tranType,account} = this.props
    this.getTransaction({instrument_id:tranType, state: '-1', limit: pageSize, offset: (current - 1) * pageSize },account)
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    const {tranType,account} = this.props
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    this.getTransaction({instrument_id:tranType, state: '-1', limit: 10, offset: (pagination.current - 1) * 10 },account)
  }
  render() {
    const data = this.state.data
    return (
      <div>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card title="对倒记录" style={{ marginBottom: 24 }} extra={<Button onClick={this.refrsh} type="primary">刷新</Button>} >
            <Table
              columns={columns}
              dataSource={data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              rowKey={(record) => record.order_id} />
          </Card>
        </Col>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)
  };
};

export default connect(mapStateToProps)(Transaction);
