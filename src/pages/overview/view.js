import React, { PureComponent, Fragment } from 'react';
import { view as StretchTable } from '../../components/stretchtable';
import { view as CandleChart } from '../../components/candlechart';
// import { view as CandleChart2 } from '../../components/candlechart2';
import { Card, Tag, Table, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';

import styles from './overview.module.css';
import { parseTime } from '../../util/utils';
import okrobot from "okrobot-js";

const { Option } = Select;

// import candleData from './data';
// import candleData from './data1';

const trData = [
  {
    key: '198080',
    time: '2019-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '完成',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.00,
  }, {
    key: '070909',
    time: '2018-02-11',
    controller: '李四张三',
    buyorsell: '卖出',
    status: '已撤销',
    type: '自动交易',
    condition: '小于目标',
    setprice: 333.00,
    dealprice: 45.21,
    count: 1,
    total: 2677733.00,
  }, {
    key: '7879890',
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '完成',
    type: '手动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.00,
  }, {
    key: "9837192",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '完成',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.00,
  }, {
    key: "98482794",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '待处理',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "1",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '处理中',
    type: '手动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "2",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '待处理',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "3",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '已撤销',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "4",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '完成',
    type: '手动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "5",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '处理中',
    type: '自动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }, {
    key: "6",
    time: '2018-02-11',
    controller: '张三',
    buyorsell: '买入',
    status: '处理中',
    type: '手动交易',
    condition: '低于价格区间',
    setprice: 4.00,
    dealprice: 3.21,
    count: 3,
    total: 233.60,
  }
];

const buyStuct = {
  "买入": {
    color: "green",
    text: "买入"
  },
  "卖出": {
    color: "pink",
    text: "卖出"
  }
};
const statusStuct = {
  "完成": {
    color: "darkgreen",
    text: "已完成"
  },
  "已撤销": {
    color: "darkred",
    text: "已撤销"
  },
  "待处理": {
    color: "darkcyan",
    text: "待处理..."
  },
  "处理中": {
    color: "darkblue",
    text: "处理中..."
  }
};
const typeStuct = {
  "自动交易": {
    color: "yellow",
    text: "自动交易"
  },
  "手动交易": {
    color: "blue",
    text: "手动交易"
  }
};

const trColumns = [
  {
    title: '交易序号',
    dataIndex: 'key',
    width: 100,
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 110,
  },
  {
    title: '操作员',
    dataIndex: 'controller',
    width: 90,
  },
  {
    title: '买/卖',
    dataIndex: 'buyorsell',
    width: 80,
    render: text => {
      let item = buyStuct[text];
      return (
        <span>
          <Tag color={item.color}> {item.text} </Tag>
        </span>
      )
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    render: text => {
      let item = statusStuct[text];
      return (
        <span>
          <Tag color={item.color}> {item.text} </Tag>
        </span>
      )
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    render: text => {
      let item = typeStuct[text];
      return (
        <span>
          <Tag color={item.color}> {item.text} </Tag>
        </span>
      )
    },
  },
  {
    title: '触发条件',
    dataIndex: 'condition',
    // width: 150,
  },
  {
    title: '设定价',
    dataIndex: 'setprice',
    width: 100,
  },
  {
    title: '成交价',
    dataIndex: 'dealprice',
    width: 100,
  },
  {
    title: '数量',
    dataIndex: 'count',
    width: 70,
  },

  {
    title: '总金额',
    dataIndex: 'total',
    width: 100,
  },
];
const newColums = [
  {
    title: "交易时间",
    dataIndex: 'time',
    width: '40%',
  },
  {
    title: '成交价',
    dataIndex: 'dealprice',
    width: '30%',
  },
  {
    title: '成交量',
    dataIndex: 'volume',
    // width: '30%',
    render: (text, record) => {
      // console.log("成交量=>", text, v)
      if (record && record.side === "buy") {
        return <div style={{ color: "#2fc25b" }}>{text}</div>
      }
      else {
        return <div style={{ color: "#f04864" }}>{text}</div>
      }
    },
  },
];

const timeSharing = [
  {
    name: "1min",
    value: "60"
  },
  {
    name: "3min",
    value: "180"
  },
  {
    name: "5min",
    value: "300"
  },
  {
    name: "15min",
    value: "900"
  },
  {
    name: "30min",
    value: "1800"
  },
  {
    name: "1hour",
    value: "3600"
  },
  {
    name: "2hour",
    value: "7200"
  },
  {
    name: "4hour",
    value: "14400"
  },
  {
    name: "6hour",
    value: "21600"
  },
  {
    name: "12hour",
    value: "43200"
  },
  {
    name: "1day",
    value: "86400"
  },
  {
    name: "1week",
    value: "604800"
  }
]

let o_tradesCache = [],
  o_candleCache = [];

class OverviewPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timeSharing: "3600",
      pairType: "USDT",
      cardCandleLoading: false,
      cardTradesLoading: false,
      candleData: [],
      tradesData: [],
      trData,
      isUp: true,
      dealprice: 0,
      gain: 0,
      max: 0,
      min: 0,
      volume: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType) {
      console.log("componentWillReceiveProps=>", this.props.tranType, nextProps.tranType)
      if (nextProps.tranType === "ETM-USDK") {
        this.setState({ pairType: "USDK" });
      }
      else {
        this.setState({ pairType: "USDT" });
      }
      let { tranType } = this.props;
      let granularity = parseInt(this.state.timeSharing);
      okrobot.batch_order.pageKline({ instrument_id: tranType, channel: `spot/candle${granularity}s` })
        .then(res => {
          console.log("pageKline ok=>", res)
        })
        .catch(err => {
          console.log("startDepInfo-catch", err);
        });
    }
  }

  componentDidMount() {
    this.queryCandleData();
    this.queryTradesData();

    this.listenWs();

  }

  componentWillUnmount() {
    okrobot.eventbus.remove(`page/candle:ETM-USDT`, this.updateCandleData);
    okrobot.eventbus.remove(`page/ticker:ETM-USDT`, this.updateTickerData);
    okrobot.eventbus.remove(`page/trade:ETM-USDT`, this.updateTradesData);

    okrobot.eventbus.remove(`page/candle:ETM-USDK`, this.updateCandleData);
    okrobot.eventbus.remove(`page/ticker:ETM-USDK`, this.updateTickerData);
    okrobot.eventbus.remove(`page/trade:ETM-USDK`, this.updateTradesData);
  }

  listenWs() {
    let { tranType } = this.props;//交易对
    let granularity = parseInt(this.state.timeSharing);//时间间隔

    console.log("on listenWs", granularity, tranType)
    okrobot.batch_order.pageInfo({ instrument_id: tranType, channel: `spot/candle${granularity}s` })
      .then(res => {
        console.log("listenWs ok=>", res)
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
      });

    okrobot.eventbus.on(`page/candle:ETM-USDT`, this.updateCandleData);
    okrobot.eventbus.on(`page/ticker:ETM-USDT`, this.updateTickerData);
    okrobot.eventbus.on(`page/trade:ETM-USDT`, this.updateTradesData);

    okrobot.eventbus.on(`page/candle:ETM-USDK`, this.updateCandleData);
    okrobot.eventbus.on(`page/ticker:ETM-USDK`, this.updateTickerData);
    okrobot.eventbus.on(`page/trade:ETM-USDK`, this.updateTradesData);

  }

  queryCandleData = () => {
    this.setState({ cardCandleLoading: true });
    let instrument_id = this.props.tranType;//交易对
    let granularity = parseInt(this.state.timeSharing);
    console.log("queryCandleData start=>", instrument_id, granularity);
    okrobot.okex_utils.getSpotCandles({ instrument_id, params: { granularity } })
      .then(res => {
        console.log("queryCandleData ok=>", res);
        if (res && res instanceof Array) {
          o_candleCache = res.slice(0);
          let _candleData = this.convertCandleData(o_candleCache);
          this.setState({ candleData: _candleData });
        }

        this.setState({ cardCandleLoading: false });
      })
      .catch(err => {
        console.log("queryCandleData err=>", err);
        this.setState({ cardCandleLoading: false });
      });
  }

  queryTradesData = () => {
    this.setState({ cardTradesLoading: true });

    let instrument_id = this.props.tranType;
    okrobot.okex_utils.getSpotTrade({ instrument_id })
      .then(res => {
        console.log("queryTradesData ok=>", res);
        if (res && res instanceof Array) {
          if (res.length > 60) {
            o_tradesCache = res.slice(-60);
          }
          else {
            o_tradesCache = res.slice();
          }
          let tradesData = this.convertTrandsData(res);
          this.setState({ tradesData });
        }


        this.setState({ cardTradesLoading: false });
      })
      .catch(err => {
        console.log("queryTradesData err=>", err);

        this.setState({ cardTradesLoading: false });
      });
  }

  updateCandleData = (name, data) => {
    o_candleCache.push(data);
    if (o_candleCache.length > 200) {
      o_candleCache = o_candleCache.slice(-200);
    }

    let candleData = this.convertCandleData(o_candleCache);
    this.setState({ candleData });
  }

  updateTickerData = (name, data) => {
    let res = data;
    if (res) {
      let spread = parseFloat(res.last) - parseFloat(res.open_24h);

      this.setState({
        isUp: spread > 0,
        dealprice: parseFloat(res.last),
        gain: (Math.abs(spread) / parseFloat(res.open_24h) * 100).toFixed(2),
        max: parseFloat(res.high_24h),
        min: parseFloat(res.low_24h),
        volume: parseInt(res.base_volume_24h),
      });
    }
  }

  updateTradesData = (name, data) => {
    if (!data) return;
    console.log("updateTradesData=>", data)
    o_tradesCache.push(data);
    if (o_tradesCache.length > 60) {
      o_tradesCache = o_tradesCache.slice(-60);
    }

    let res = o_tradesCache;
    if (res && res instanceof Array) {
      let tradesData = this.convertTrandsData(res);
      this.setState({ tradesData });
    }
  }

  convertCandleData = (data) => {
    console.log("convertCandleData start=>", data)
    let o_data = [];
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      if (temp instanceof Array) {
        let candle = {
          time: Date.parse(temp[0]),
          open: parseFloat(temp[1]),
          max: parseFloat(temp[2]),
          min: parseFloat(temp[3]),
          close: parseFloat(temp[4]),
          volumn: parseFloat(temp[5]),
          mean: parseFloat(temp[4]),
        }
        o_data.push(candle);
      }
    }
    console.log("convertCandleData end=>", o_data)
    return o_data;
  }

  convertTrandsData = (data) => {
    console.log("convertTrandsData start=>", data)
    let o_data = [];
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      o_data.push({
        key: i,
        time: parseTime(Date.parse(temp.timestamp), '{h}:{i}:{s}'),
        dealprice: parseFloat(temp.price),
        volume: parseFloat(temp.size),
        side: temp.side
      })
    }
    console.log("convertTrandsData end=>", o_data)
    return o_data;
  }

  getIsUpTitle(isUp, dealprice, gain) {
    if (isUp) {
      return (
        <Fragment>
          <div className={styles.titleItem}>
            <p>最新成交价</p>
            <p className={styles.titleValue1}> {dealprice.toLocaleString()} {this.state.pairType} ↑</p>
          </div>
          <div className={styles.titleItem}>
            <p>涨跌幅</p>
            <p className={styles.titleValue1}> + {gain} % </p>
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className={styles.titleItem}>
            <p>最新成交价</p>
            <p className={styles.titleValue2}> {dealprice.toLocaleString()} {this.state.pairType} ↓</p>
          </div>
          <div className={styles.titleItem}>
            <p>涨跌幅</p>
            <p className={styles.titleValue2}> - {gain} % </p>
          </div>
        </Fragment>
      )
    }
  }

  getTimeChoose = () => {
    return (
      <Select defaultValue={timeSharing[5].name} style={{ width: 100 }} onChange={this.handleSelectChange}>
        {timeSharing.map(v => <Option key={v.name} value={v.value}>{v.name}</Option>)}
      </Select>
    )
  }

  handleSelectChange = (e) => {
    console.log("handleSelectChange=>", e)
    this.setState({ timeSharing: e });
    // setImmediate(() => this.refreshData());

    let { tranType } = this.props;
    okrobot.batch_order.pageKline({ instrument_id: tranType, channel: `spot/candle${e}s` })
      .then(res => {
        console.log("pageKline ok=>", res)
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
      });
  }

  render() {

    let { isUp, dealprice, gain, max, min, volume } = this.state;

    const propsNewTable = {
      columns: newColums,
      scroll: { y: 475 },
      pagination: false,
      size: "small"
    }

    return (
      <Fragment>
        <Row gutter={24} >
          <Col xl={16} lg={24} md={24} sm={24} xs={24} >
            <Card title={this.props.tranType + " 概览"} style={{ marginBottom: 24 }} extra={this.getTimeChoose()} loading={this.state.cardCandleLoading}>
              <div className={styles.chartTitle}>
                <div className={styles.titleContent}>
                  {this.getIsUpTitle(isUp, dealprice, gain)}
                  <div className={styles.titleItem}>
                    <p>24小时最高</p>
                    <p className={styles.titleValue3}> {max.toLocaleString()} {this.state.pairType}</p>
                  </div>
                  <div className={styles.titleItem}>
                    <p>24小时最低</p>
                    <p className={styles.titleValue3}> {min.toLocaleString()} {this.state.pairType}</p>
                  </div>
                  <div className={styles.titleItem}>
                    <p>24小时成交量</p>
                    <p className={styles.titleValue3}> {volume.toLocaleString()} ETM</p>
                  </div>
                </div>
              </div>
              <div className={styles.chartCandle}>
                <CandleChart data={this.state.candleData} />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24} >
            <Card title="最新成交" style={{ marginBottom: 24 }} loading={this.state.cardTradesLoading}>
              <Table dataSource={this.state.tradesData} {...propsNewTable} />
            </Card>
          </Col>
        </Row>
        <Card title="交易记录" style={{ display: "none" }}>
          <StretchTable data={this.state.trData} columns={trColumns} />
        </Card>
        {/* <Card title="AAAAAA" >
          <CandleChart2 />
        </Card> */}
      </Fragment >
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

export default connect(mapStateToProps)(OverviewPage);