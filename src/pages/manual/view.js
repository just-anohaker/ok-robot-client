import React from 'react';
import Batch from './batch-form';
import Cancel from './cancel-form';
import { Row, Col, Card, Table } from 'antd';
import './less/index.less';
import okrobot from "okrobot-js";
import { connect } from 'react-redux';

let _dataAsks, _dataBids, _interval;

class ManualPage extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      dataAsks: [],
      dataBids: []
    }
  }

  componentDidMount() {
    let o_account = this.props.account
    okrobot.batch_order.startDepInfo(o_account)
      .then((res) => {
        console.log("startDepInfo-then", res);
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
      })


    okrobot.eventbus.on("depth", this.getDepathData);

    _interval = setInterval(() => {
      console.log("setInterval")
      this.setState({ dataAsks: _dataAsks, dataBids: _dataBids });
    }, 1000);
  }

  componentWillUnmount() {
    okrobot.eventbus.remove("depth", this.getDepathData);
    clearInterval(_interval);
  }

  getDepathData = (name, data) => {
    let { asks, bids } = data;
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
        key: i,
        price,
        sum,
        mine,
        other
      }
    });
    return newArr.slice(0, 50);
  }

  render() {

    const columns = [
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '25%',
      },
      {
        title: '总委托量',
        dataIndex: 'sum',
        key: 'sum',
        width: '25%',
      },
      {
        title: '我的委托',
        dataIndex: 'mine',
        key: 'mine',
        width: '25%',
      },
      {
        title: '外部委托',
        dataIndex: 'other',
        key: 'other',
        width: '25%',
      },
    ];

    const tableAttr = {
      columns,
      pagination: false,
      scroll: { y: 300 }

    };

    return (
      <div className="manual">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Batch></Batch>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="卖单情况" style={{ marginBottom: 24 }}>
              <Table dataSource={this.state.dataAsks} {...tableAttr} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Cancel></Cancel>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="买单情况" style={{ marginBottom: 24 }}>
              <Table dataSource={this.state.dataBids}  {...tableAttr} />
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
    account: infoingData.account
  };
};

export default connect(mapStateToProps)(ManualPage);
