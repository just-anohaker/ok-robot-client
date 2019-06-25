import React from 'react';
import Batch from './batch-form';
import Cancel from './cancel-form';
import { Row, Col, Card, Table } from 'antd';
import './less/index.less';
import okrobot from "okrobot-js";
import { connect } from 'react-redux';
import {  KeepAlive } from "react-keep-alive";

const columns = [
  {
    title: '卖出',
    dataIndex: 'key',
    width: '13%',
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
    width: '24%',
  },
  {
    title: '我的委托',
    dataIndex: 'mine',
    width: '23%',
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
    width: '13%',
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
    width: '24%',
  },
  {
    title: '我的委托',
    dataIndex: 'mine',
    width: '23%',
  },
  {
    title: '外部委托',
    dataIndex: 'other',
    width: '20%',
  },
];
let _dataAsks, _dataBids;

class ManualPage extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      dataAsks: [],
      sellPrice:'',
      sumSell: '',
      otherSell: '',
      buyPrice:'',
      otherBuy: '',
      sumBuy: '',
      dataBids: [],
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType) {
      okrobot.eventbus.remove("depth:"+this.props.tranType, this.getDepathData);
      this.linkSock(nextProps.tranType);
      this.setState({sellPrice:'',sumSell:'',otherSell:'',buyPrice:'',sumBuy:'',otherBuy:''});
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
    okrobot.eventbus.on("depth:"+tranType, this.getDepathData);
    // clearInterval(_interval);

    // _interval = setInterval(() => {
    //   this.setState({ dataAsks: _dataAsks, dataBids: _dataBids });
    // }, 1000);
  }
  componentWillUnmount() {
    okrobot.eventbus.remove("depth:"+this.props.tranType, this.getDepathData);
  }

  filterData(data,record){
    let sumSell = data.filter(item => item.key <= record.key).reduce((pre, next) => {
      return { sum: pre.sum + next.sum * next.price, other: pre.other + next.other * next.price }
    }, {sum:0,other:0});
    let sum = sumSell.sum.toFixed(2);
    let other = sumSell.other.toFixed(2);
    return {sum,other}
  }
  rowSellClickHandle(record) {
    return {
      onClick: event => {
        let data = this.state.dataAsks.slice();
        let {sum,other} = this.filterData(data,record);
        this.setState({sellPrice:record.price,sumSell:sum,otherSell:other});
      } // 点击行
    }
  }
  rowBuyClickHandle(record){
    return {
      onClick: event => {
        let data = this.state.dataBids.slice();
        let {sum,other} = this.filterData(data,record);
        this.setState({buyPrice:record.price,sumBuy:sum,otherBuy:other});
      }, // 点击行
    }
  }
  getDepathData = (name, data) => {
    let { asks, bids } = data;
    // asks.reverse();
    if (!asks || !bids || asks.length <= 0 || bids.length <= 0) {
      return
    }
    _dataAsks = this.generateData(asks);
    _dataBids = this.generateData(bids);
    this.setState({ dataAsks: _dataAsks, dataBids: _dataBids });

  }

  generateData = (arr) => {
    let newArr = arr.map((v, i) => {
      let mine = 0, price = v[0], sum = v[1], other = 0;
      if (v.length === 4) {
        mine = v[3];
      }
      other = sum - mine <= 0 ? 0 : (sum - mine).toFixed(4);
      return {
        key: i + 1,
        price,
        sum,
        mine,
        other
      }
    });
    return newArr.slice(0);
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
          <KeepAlive name="Batch">
            <Batch></Batch>
          </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="卖单情况" style={{ marginBottom: 24 }} extra={`拉盘到：${this.state.sellPrice}  总成本：${this.state.sumSell}  ${this.props.addonAfter} 净成本 ：${this.state.otherSell} ${this.props.addonAfter}`}>
              <Table dataSource={this.state.dataAsks} onRow={this.rowSellClickHandle.bind(this)} columns={columns} loading={this.state.loading}  {...tableAttr} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <KeepAlive name="Cancel">
             <Cancel></Cancel>
            </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="买单情况" style={{ marginBottom: 24 }} extra={`砸盘到：${this.state.buyPrice}  总成本：${this.state.sumBuy}  ${this.props.addonAfter} 净成本 ：${this.state.otherBuy} ${this.props.addonAfter}`}>
              <Table dataSource={this.state.dataBids}  onRow={this.rowBuyClickHandle.bind(this)}  columns={columns1} loading={this.state.loading} {...tableAttr} />
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
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)
  };
};

export default connect(mapStateToProps)(ManualPage);
