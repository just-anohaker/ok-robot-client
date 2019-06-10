import React from 'react';
import Batch from './batch-form';
import Cancel from './cancel-form';
import { Row, Col, Card, Table } from 'antd';
import './less/index.less';
import okrobot from "okrobot-js";
import { connect } from 'react-redux';

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

    let provious = Date.now();

    okrobot.eventbus.on("depth", (name, data) => {
      // console.log("startDepInfo-depthevent", name, data);
      this.getData(provious,data)
    });
  }
  getData(provious,data) {
    let now = Date.now();
    console.log(now - provious > 5000)
    if(now - provious > 5000){
      provious = now;

      let { asks, bids } = data;
      asks.reverse();
      let dataAsks = this.generateData(asks);
      let dataBids = this.generateData(bids);
      this.setState({ dataAsks, dataBids });
    }

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
    return newArr;
  }

  render() {

    const columns = [
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '总委托量',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '我的委托',
        dataIndex: 'mine',
        key: 'mine',
      },
      {
        title: '外部委托',
        dataIndex: 'other',
        key: 'other',
      },
    ];


    return (
      <div className="manual">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Batch></Batch>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="卖单情况" style={{ marginBottom: 24 }}>
              <Table columns={columns} dataSource={this.state.dataAsks} scroll={{ y: 360 }} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Cancel></Cancel>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title="买单情况" style={{ marginBottom: 24 }}>
              <Table columns={columns} dataSource={this.state.dataBids} scroll={{ y: 360 }} />
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
