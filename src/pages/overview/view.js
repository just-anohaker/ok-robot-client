import React, { PureComponent } from 'react';
import { view as StretchTable } from '../../components/stretchtable';
import { Card } from 'antd';

import styles from './overview.module.css';

class OverviewPage extends PureComponent {

  render() {

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
        controller: '李四',
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
        type: '自动交易',
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
        status: '完成',
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
        status: '完成',
        type: '自动交易',
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
        status: '完成',
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
        status: '完成',
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
        type: '自动交易',
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
        status: '完成',
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
        status: '完成',
        type: '自动交易',
        condition: '低于价格区间',
        setprice: 4.00,
        dealprice: 3.21,
        count: 3,
        total: 233.60,
      }
    ];

    const trColumns = [
      {
        title: '交易序号',
        dataIndex: 'key',
        key: 'key',
        width: 100,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 100,
      },
      {
        title: '操作员',
        dataIndex: 'controller',
        key: 'controller',
        width: 100,
      },
      {
        title: '买/卖',
        dataIndex: 'buyorsell',
        key: 'buyorsell',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
      },
      {
        title: '触发条件',
        dataIndex: 'condition',
        key: 'condition',
        width: 150,
      },
      {
        title: '设定价格',
        dataIndex: 'setprice',
        key: 'setprice',
        width: 100,
      },
      {
        title: '成交价格',
        dataIndex: 'dealprice',
        key: 'dealprice',
        width: 100,
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
        width: 70,
      },

      {
        title: '总金额',
        dataIndex: 'total',
        key: 'total',
        width: 80,
      },
    ];

    return (
      <div>
        <div className={styles.head}>
          <Card title="ETM/USTD 概览" className={styles.overview}>
          </Card>
          <Card title="最新成交" className={styles.new}>
          </Card>
        </div>
        <Card title="交易记录">
          <StretchTable data={trData} columns={trColumns} />
        </Card>
      </div>
    )
  }
}

export default OverviewPage;