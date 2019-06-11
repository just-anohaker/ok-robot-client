import React from 'react';
import Batch from './batch-form';
import Cancel from './cancel-form';
import { Row, Col, Card, Table } from 'antd';
import './less/index.less';
import okrobot from "okrobot-js";
import { connect } from 'react-redux';

const columns = [
  {
    title: '卖出',
    dataIndex: 'key',
    width: '20%',
    render: (text) => <span style={{ color: '#f5222d' }}>{text}</span>
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: '20%',
  },
  {
    title: '总委托量',
    dataIndex: 'sum',
    width: '20%',
  },
  {
    title: '我的委托',
    dataIndex: 'mine',
    width: '20%',
  },
  {
    title: '外部委托',
    dataIndex: 'other',
    width: '20%',
  },
];

const columns1 = [
  {
    title: '买入',
    dataIndex: 'key',
    width: '20%',
    render: (text) => <span style={{ color: '#a0d911' }}>{text}</span>
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: '20%',
  },
  {
    title: '总委托量',
    dataIndex: 'sum',
    width: '20%',
  },
  {
    title: '我的委托',
    dataIndex: 'mine',
    width: '20%',
  },
  {
    title: '外部委托',
    dataIndex: 'other',
    width: '20%',
  },
];
let _dataAsks, _dataBids, _interval;

class ManualPage extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      dataAsks: [],
      dataBids: [],
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType) {
      okrobot.eventbus.remove("depth", this.getDepathData);
      this.linkSock(nextProps.tranType)
    }
  }

  componentDidMount() {
    let tranType = this.props.tranType
    this.linkSock(tranType)
  }
  linkSock(tranType) {
    this.setState({ loading: true });
    let { account } = this.props;
    let option = Object.assign({}, account);
    option.instrument_id = tranType;

    okrobot.batch_order.startDepInfo(option)
      .then((res) => {
        console.log("startDepInfo-then", res);
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
        this.setState({ loading: false });
      })
    okrobot.eventbus.on("depth", this.getDepathData);
    clearInterval(_interval);

    _interval = setInterval(() => {
      this.setState({ dataAsks: _dataAsks, dataBids: _dataBids });
    }, 1000);
  }
  componentWillUnmount() {
    okrobot.eventbus.remove("depth", this.getDepathData);
    clearInterval(_interval);
  }

  getDepathData = (name, data) => {
    let { asks, bids } = data;
    // asks.reverse();
    if (!asks || !bids || asks.length <= 0 || bids.length <= 0) {
      return
    }

    _dataAsks = this.generateData(asks);
    _dataBids = this.generateData(bids);
  }

  generateData = (arr) => {
    let newArr = arr.map((v, i) => {
      let mine = 0, price = v[0], sum = v[1], other = 0;
      if (v.length === 4) {
        mine = v[3];

      }
      other = sum - mine;
      return {
        key: i + 1,
        price,
        sum,
        mine,
        other
      }
    });
    return newArr.slice(0, 60);
  }

  render() {



    const tableAttr = {
      pagination: false,
      size: "small",
      scroll: { y: 310 }

    };

    return (
      <div className="manual">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Batch></Batch>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="卖单情况" style={{ marginBottom: 24 }}>
              <Table dataSource={this.state.dataAsks} columns={columns} loading={this.state.loading}  {...tableAttr} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Cancel></Cancel>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="买单情况" style={{ marginBottom: 24 }}>
              <Table dataSource={this.state.dataBids} columns={columns1} loading={this.state.loading} {...tableAttr} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const infoingData = state.infoing;
  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name
  };
};

export default connect(mapStateToProps)(ManualPage);
