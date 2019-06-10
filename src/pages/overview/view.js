import React, { PureComponent, Fragment } from 'react';
import { view as StretchTable } from '../../components/stretchtable';
import { view as CandleChart } from '../../components/candlechart';
import { actions as loading } from '../../components/loading';
import store from "../../Store";
import { Card, Tag, Table, Row, Col } from 'antd';

import styles from './overview.module.css';

import chartData from './data';

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
const newData = [
  // {
  //   key: '1',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3,
  //   width: 100
  // },
  // {
  //   key: '2',
  //   time: '2019-04-11',
  //   dealprice: 3.21,
  //   count: 3,
  //   width: 100
  // },
  // {
  //   key: '3',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '4',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '5',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '6',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '7',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '8',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '9',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
  // {
  //   key: '10',
  //   time: '2019-02-11',
  //   dealprice: 3.21,
  //   count: 3
  // },
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
    dataIndex: 'count'
  },
];

class OverviewPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      newData: [],
      trData: [],
      isUp: true,
      dealprice: 0,
      gain: 0,
      max: 0,
      min: 0,
      count: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    store.dispatch(loading.showLoading());
    // setTimeout(() => {
    this.setState({
      chartData,
      newData,
      trData,
      isUp: false,
      dealprice: 56,
      gain: 19,
      max: 2300,
      min: 1000,
      count: 1000
    });
    store.dispatch(loading.hideLoading());
    // }, 500);

    // setInterval(() => {
    //   let _chartData = this.state.chartData;
    //   if (_chartData.length > 0) {
    //     if (_chartData[100].max === 13.64) {
    //       _chartData[100].max = 8.64;
    //       this.setState({ chartData: _chartData })
    //     } else {
    //       _chartData[100].max = 13.64;
    //       this.setState({ chartData: _chartData })
    //     }

    //     this.refs.candelChart.updateProps({ data: _chartData })

    //   }
    // }, 1000)


  }

  getIsUpTitle(isUp, dealprice, gain) {
    if (isUp) {
      return (
        <Fragment>
          <div className={styles.titleItem}>
            <p>最新成交价</p>
            <p className={styles.titleValue1}> {dealprice.toLocaleString()} USDT ↑</p>
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
            <p className={styles.titleValue2}> {dealprice.toLocaleString()} USDT ↓</p>
          </div>
          <div className={styles.titleItem}>
            <p>涨跌幅</p>
            <p className={styles.titleValue2}> - {gain} % </p>
          </div>
        </Fragment>
      )
    }
  }

  render() {

    const propsNewTable = {
      columns: newColums,
      pagination: false,
      size: "middle"
    }
    const propsChart = {
      start: "2015-04-07",
      end: "2015-07-28"
    }
    let { isUp, dealprice, gain, max, min, count } = this.state;

    return (
      <Fragment>
        <Row gutter={24} >
          <Col xl={16} lg={24} md={24} sm={24} xs={24} >
            <Card title="ETM/USTD 概览" style={{ marginBottom: 24 }}>
              <div className={styles.chartTitle}>
                <div className={styles.titleContent}>
                  {this.getIsUpTitle(isUp, dealprice, gain)}
                  <div className={styles.titleItem}>
                    <p>24小时最高</p>
                    <p className={styles.titleValue3}> {max.toLocaleString()} USDT</p>
                  </div>
                  <div className={styles.titleItem}>
                    <p>24小时最低</p>
                    <p className={styles.titleValue3}> {min.toLocaleString()} USDT</p>
                  </div>
                  <div className={styles.titleItem}>
                    <p>24小时成交量</p>
                    <p className={styles.titleValue3}> {count.toLocaleString()} USDT</p>
                  </div>
                </div>
              </div>
              <div className={styles.chartCandle}>
                <CandleChart ref="candelChart" data={this.state.chartData} {...propsChart} />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24} >
            <Card title="最新成交" style={{ marginBottom: 24 }}>
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

export default OverviewPage;