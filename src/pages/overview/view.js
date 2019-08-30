import React, { PureComponent, Fragment } from 'react';
import { view as StretchTable } from '../../components/stretchtable';
import { view as CandleChart } from '../../components/candlechart';
// import { view as CandleChart2 } from '../../components/candlechart2';
import { Card, Tag, Table, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';
import LoadData from '../../util/LoadData'

import styles from './overview.module.css';
import { parseTime } from '../../util/utils';
// import okrobot from "okrobot-js";
import server from "../../server";

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

    this.tickerEvent = undefined;
    this.tickerInstrumentId = undefined;
    this._tickerDataHandler = this.updateTickerData;

    this.candleEvent = undefined;
    this.candleInstrumentId = undefined;
    this.candleGranularity = undefined;
    this._candelDataHandler = this.updateCandleData;

    this.tradeEvent = undefined;
    this.tradeInstrumentId = undefined;
    this._tradeDataHander = this.updateTradesData;

    this.state = {
      granularity: 3600,
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

      let instrument_id = nextProps.tranType;//交易对
      let granularity = this.state.granularity;//时间间隔
      this.queryCandleData(instrument_id, granularity);
      this.queryTradesData(instrument_id);

      this.monitorTicker(instrument_id);
      this.monitorCandle(instrument_id, granularity);
      this.monitorTrades(instrument_id);
    }
  }

  componentDidMount() {
    let instrument_id = this.props.tranType || "ETM-USDT";//交易对
    let granularity = this.state.granularity || 3600;//时间间隔
    this.queryCandleData(instrument_id, granularity);
    this.queryTradesData(instrument_id);

    this.monitorTicker(instrument_id);
    this.monitorCandle(instrument_id, granularity);
    this.monitorTrades(instrument_id);
  }

  componentWillUnmount() {
    this.unmonitorTicker();
    this.unmonitorCandle();
    this.unmonitorTrades();
  }

  monitorTicker(instrument_id) {
    this.unmonitorTicker();

    server.okex_monitor.monitSpotTicker(instrument_id)
      .then(res => {
        this.tickerEvent = res;
        this.tickerInstrumentId = instrument_id;
        server.eventbus.on(this.tickerEvent, this._tickerDataHandler);
      })
      .catch(err => {
        setTimeout(() => {
          this.monitorTicker(instrument_id);
        }, 10 * 1000);
      });
  }

  unmonitorTicker() {
    console.log("unmonitorTicker=>", this.tradeEvent);
    if (this.tickerEvent) {
      server.eventbus.remove(this.tickerEvent, this._tickerDataHandler);
      server.okex_monitor.unmonitSpotTicker(this.tickerInstrumentId);
      this.tickerEvent = undefined;
      this.tickerInstrumentId = undefined;
    }
  }

  monitorCandle(instrument_id, granularity) {
    this.unmonitorCandle();

    server.okex_monitor.monitSpotChannel(`candle${granularity}s`, instrument_id)
      .then(res => {
        this.candleEvent = res;
        this.candleInstrumentId = instrument_id;
        this.candleGranularity = `candle${granularity}s`;
        server.eventbus.on(this.candleEvent, this._candelDataHandler);
      })
      .catch(err => {
        setTimeout(() => {
          this.monitorCandle(instrument_id, granularity);
        }, 10 * 1000);
      });
  }

  unmonitorCandle() {
    console.log("unmonitorCandle=>", this.tradeEvent);
    if (this.candleEvent) {
      server.eventbus.remove(this.candleEvent, this._candelDataHandler);
      server.okex_monitor.unmonitSpotChannel(this.candleInstrumentId, this.candleGranularity);
      this.candleEvent = undefined;
      this.candleInstrumentId = undefined;
    }
  }

  monitorTrades(instrument_id) {
    this.unmonitorTrades();

    server.okex_monitor.monitSpotTrade(instrument_id)
      .then(res => {
        this.tradeEvent = res;
        this.tradeInstrumentId = instrument_id;
        server.eventbus.on(this.tradeEvent, this._tradeDataHander);
      })
      .catch(err => {
        setTimeout(() => {
          this.monitorTrades(instrument_id);
        }, 10 * 1000);
      });
  }

  unmonitorTrades() {
    console.log("unmonitorTrades=>", this.tradeEvent);
    if (this.tradeEvent) {
      server.eventbus.remove(this.tradeEvent, this._tradeDataHander);
      server.okex_monitor.unmonitSpotTrade(this.tradeInstrumentId);
      this.tradeEvent = undefined;
      this.tradeInstrumentId = undefined;
    }
  }

  queryCandleData = (instrument_id, granularity) => {
    // this.setState({ cardCandleLoading: true });

    console.log("queryCandleData start=>", instrument_id, granularity);
    server.okex_utils.getSpotCandles({ instrument_id, params: { granularity } })
      .then(res => {
        // console.log("queryCandleData ok=>", res);
        if (res && res instanceof Array) {
          o_candleCache = res.slice(0);
          let candleData = this.convertCandleData(o_candleCache);
          this.setState({ candleData });
        }

        // this.setState({ cardCandleLoading: false });
      })
      .catch(err => {
        console.log("queryCandleData err=>", err);
        // this.setState({ cardCandleLoading: false });
      });
  }

  queryTradesData = (instrument_id) => {
    this.setState({ cardTradesLoading: true });

    server.okex_utils.getSpotTrade({ instrument_id, params: { limit: 60 } })
      .then(res => {
        // console.log("queryTradesData ok=>", res);
        if (res && res instanceof Array) {
          o_tradesCache = res.slice(-60);
          let tradesData = this.convertTrandsData(o_tradesCache);
          this.setState({ tradesData });
        }

        this.setState({ cardTradesLoading: false });
      })
      .catch(err => {
        console.log("queryTradesData err=>", err);

        this.setState({ cardTradesLoading: false });
      });
  }

  updateTickerData = (name, data) => {
    // console.log("updateTickerData=>", name, data);
    if (!data || !data[0]) return;

    let res = data[0];
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

  updateCandleData = (name, data) => {
    // console.log("updateCandleData=>", name, data);
    if (!data || !data[0] || !data[0].candle) return;

    let candle = data[0].candle;
    if (o_candleCache.length > 0) {
      if (o_candleCache[0][0] === candle[0]) {//更新最后节点数据
        o_candleCache[0] = candle;
      }
      else {//新节点
        o_candleCache.unshift(candle);
      }
    }
    else {//没有candle缓存，重新请求
      let instrument_id = this.props.tranType || "ETM-USDT";//交易对
      let granularity = this.state.granularity || 3600;//时间间隔
      this.queryCandleData(instrument_id, granularity);
      return;
    }

    if (o_candleCache.length > 200) {
      o_candleCache = o_candleCache.slice(0, 200);
    }

    let candleData = this.convertCandleData(o_candleCache);
    this.setState({ candleData });
  }

  updateTradesData = (name, data) => {
    // console.log("updateTradesData=>", name, data);
    if (!data) return;

    if (o_tradesCache.length > 0) {
      o_tradesCache.unshift(...data);
    }
    else {
      let instrument_id = this.props.tranType || "ETM-USDT";//交易对
      this.queryTradesData(instrument_id);
      return;
    }

    if (o_tradesCache.length > 60) {
      o_tradesCache = o_tradesCache.slice(0, 60);
    }

    let tradesData = this.convertTrandsData(o_tradesCache);
    this.setState({ tradesData });
  }

  convertCandleData = (data) => {//转换candle数据
    // console.log("convertCandleData start=>", data)
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
    // console.log("convertCandleData end=>", o_data)
    return o_data;
  }

  convertTrandsData = (data) => {//转换Trands数据
    // console.log("convertTrandsData start=>", data)
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
    // console.log("convertTrandsData end=>", o_data)
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
    let granularity = parseInt(e);
    this.setState({ granularity });

    let instrument_id = this.props.tranType;
    this.queryCandleData(instrument_id, granularity);
    this.monitorCandle(instrument_id, granularity);

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

const Overview = LoadData()(OverviewPage)
const mapStateToProps = (state) => {
  const infoingData = state.infoing;
  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name
  };
};

export default connect(mapStateToProps)(Overview);