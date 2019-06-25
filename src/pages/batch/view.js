/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, } from 'react';
import { connect } from 'react-redux';
import okrobot from "okrobot-js";
import { Card, Form, Button, Row, Col, Table } from 'antd';
import { parseTime } from '../../util/utils';
import { KeepAlive } from "react-keep-alive";
import TransFrom from './trans-form'
import LoadData from '../../util/LoadData'
import FallPage from './fall-dowm'
import MakeUp from './make-up'
import './index.css';

class BatchCard extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      data: [],
      accounts: [],
      loading: false,
      lastOderId: '',
      pagination: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType || this.props.account.httpkey !== nextProps.account.httpkey) {
      this.getOrderData({ options: { instrument_id: nextProps.tranType }, account: nextProps.account })
    }
  }

  componentWillMount() {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType }, account: account })
  }

  refresh() {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType }, account: account })
  }

  async getOrderData({ options = {}, account }) {
    try {
      this.setState({ loading: true });
      const res = await okrobot.batch_order.getOrderData(options, account);
      if (res && res.list.length > 0) {
        const pagination = { ...this.state.pagination };
        const data = res.list;
        pagination.total = res.length;
        this.setState({ loading: false, data: data });
      } else {
        this.setState({ loading: false });
        this.setState({ data: [] })
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ data: [] })
      console.log(error)
    }

  }

  statusType(type) {
    // eslint-disable-next-line default-case
    switch (type) {
      case '-2':
        return '失败'
      case '-1':
        return '撤单成功'
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


  render() {
    const columns = [
      {
        title: '类型',
        dataIndex: 'side',
        render: (text) => (<span>{text === 'buy' ? <span style={{ color: '#2fc25b' }}>买入</span> : <span style={{ color: '#f04864' }}>卖出</span>}</span>)
      },
      {
        title: '时间',
        dataIndex: 'created_at',
        render: (text) => (
          <span>{parseTime(text)}</span>
        )
      },
      {
        title: '委托价格',
        dataIndex: 'price',
      },
      {
        title: '数量',
        dataIndex: 'size',
      },
      {
        title: '成本',
        dataIndex: 'price_avg',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text) => <span>{this.statusType(text)}</span>
      }
    ];

    const tableAttr = {
      columns,
      scroll: { x: 600 },
      size: 'small'
    };
    return (
      <div className="trans">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <KeepAlive name="TransFrom">
              <TransFrom></TransFrom>
            </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="交易情况" style={{ marginBottom: 24 }} extra={<Button onClick={this.refresh.bind(this)} type="primary">刷新</Button>} >
              <Table rowKey={record => record.order_id} loading={this.state.loading} dataSource={this.state.data} {...tableAttr} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <KeepAlive name="FallPage">
              <FallPage></FallPage>
            </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <KeepAlive name="MakeUp">
              <MakeUp></MakeUp>
            </KeepAlive>
          </Col>
        </Row>


      </div>
    );
  }
}
const BatchCardLoad = LoadData()(BatchCard);

const BatchPage = Form.create({ name: 'batchcard' })(BatchCardLoad);

const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)

  };
};

export default connect(mapStateToProps)(BatchPage);
