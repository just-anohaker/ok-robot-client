import React, { PureComponent, Fragment } from 'react';
import { view as StretchTable } from '../../components/stretchtable';
import { view as CandleChart } from '../../components/candlechart';
// import { actions as loading } from '../../components/loading';
// import store from "../../Store";
import { Card, Tag, Table, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';

import styles from './overview.module.css';
import { get as fetchGet } from '../../util/fetch';
import { parseTime } from '../../util/utils';

const { Option } = Select;

// import candlesData from './data';
// import candlesData from './data1';

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
        // text.style.color = "f04864"
        return <div style={{ color: "#f04864" }}>{text}</div>
      }
      else {
        // text.style.color = "2fc25b"
        return <div style={{ color: "#2fc25b" }}>{text}</div>
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

let _newDataIntervel, _candleInterval, _tickerInterval;

class OverviewPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timeSharing: "3600",
      pairType: "USDT",
      cardCandleLoading: false,
      cardNewLoading: false,
      candlesData: [],
      newData: [],
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
      setImmediate(() => this.refreshData());
    }
  }

  componentDidMount() {

    this.refreshData();

    this.queryTradesData();
    this.queryTickerData();

    _newDataIntervel = setInterval(this.queryTradesData, 10000);
    _tickerInterval = setInterval(this.queryTickerData, 10 * 1000);
  }

  componentWillUnmount() {
    if (_newDataIntervel) {
      clearInterval(_newDataIntervel);
    }
    if (_candleInterval) {
      clearInterval(_candleInterval);
    }
    if (_tickerInterval) {
      clearInterval(_tickerInterval);
    }
  }

  refreshData = () => {
    if (_candleInterval) {
      clearInterval(_candleInterval);
    }

    this.queryCandleData();
    // this.queryTickerData();

    let granularity = parseInt(this.state.timeSharing);
    console.log("refreshData=>", granularity)
    _candleInterval = setInterval(() => {
      this.queryCandleData();
      // this.queryTickerData();
    }, granularity * 1000);
  }

  queryCandleData = () => {
    let { tranType } = this.props;
    // let start = '2019-06-10T12:00:00.000Z';
    // let end = '2019-06-10T18:00:00.000Z';
    let granularity = this.state.timeSharing;

    console.log("queryCandleData=>", granularity, tranType)
    fetchGet(`instruments/${tranType}/candles?granularity=${granularity}`)
      .then(res => {
        // console.log("fetchGet ok 1=>", res);
        let o_candlesData = [];
        if (res instanceof Array) {
          o_candlesData = this.convertData(res);
        }
        this.setState({ candlesData: o_candlesData });

        return fetchGet(`instruments/${tranType}/ticker`);

        // store.dispatch(loading.hideLoading());
      })
      .then(res => {
        // console.log("fetchGet ok 2=>", res)
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
        // this.setState({ cardCandleLoading: false });
        // return fetchGet(`instruments/${tranType}/trades`);
      })
      .catch(err => {
        console.log("fetchGet err", err);
        // this.setState({ cardCandleLoading: false });
        // store.dispatch(loading.hideLoading());
      });
  }

  queryTickerData = () => {
    let { tranType } = this.props;
    fetchGet(`instruments/${tranType}/ticker`)
      .then(res => {
        // console.log("fetchGet ok 2=>", res)
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
        // this.setState({ cardCandleLoading: false });
        // return fetchGet(`instruments/${tranType}/trades`);
      })
      .catch(err => {
        console.log("fetchGet err", err);
        // this.setState({ cardCandleLoading: false });
        // store.dispatch(loading.hideLoading());
      });
  }

  queryTradesData = () => {
    // this.setState({ cardNewLoading: true });
    // console.log("getNewData=>")

    let { tranType } = this.props;
    fetchGet(`instruments/${tranType}/trades`)
      .then(res => {
        // console.log("fetchGet ok 3=>", res)
        if (res && res instanceof Array) {
          let _newData = [];
          for (let i = 0; i < res.length; i++) {
            _newData.push({
              key: i,
              time: parseTime(Date.parse(res[i].time), '{h}:{i}:{s}'),
              dealprice: parseFloat(res[i].price),
              volume: parseFloat(res[i].size),
              side: res[i].side
            })
          }
          this.setState({
            newData: _newData
          });
        }
        // this.setState({ cardNewLoading: false });
        // store.dispatch(loading.hideLoading());
      })
      .catch(err => {
        console.log("fetchGet err", err);
        // this.setState({ cardNewLoading: false });
        // store.dispatch(loading.hideLoading());
      });
  }

  convertData = (data) => {
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
        }
        o_data.push(candle);
      }
    }
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
    // console.log("handleSelectChange=>", e)
    this.setState({ timeSharing: e });
    setImmediate(() => this.refreshData());
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
                <CandleChart data={this.state.candlesData} />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24} >
            <Card title="最新成交" style={{ marginBottom: 24 }} loading={this.state.cardNewLoading}>
              <Table dataSource={this.state.newData} {...propsNewTable} />
            </Card>
          </Col>
        </Row>
        <Card title="交易记录" style={{ display: "none" }}>
          <StretchTable data={this.state.trData} columns={trColumns} />
        </Card>
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