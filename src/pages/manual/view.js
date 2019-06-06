import React from 'react';
import Batch from './batch-form';
import Cancel from './cancel-form';
import { Row, Col } from 'antd';
import DetailBill from '../../components/detail-bill';
import './less/index.less';
// import { get } from "../../util/localstorage.js";
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
    // let account = get("allAccouts") || [];
    // this.setState({ accounts: account });

    // let o_account = {
    //   httpkey: 'a97895ea-96b3-4645-b7b2-3cb9c02de0f2',
    //   httpsecret: 'A463C43A23214D470D712311D88D3CEB',
    //   passphrase: '88888888'
    // };
    let o_account = this.props.account
    okrobot.batch_order.startDepInfo(o_account)
      .then((res) => {
        console.log("startDepInfo-then", res);
      })
      .catch(err => {
        console.log("startDepInfo-catch", err);
      })

    okrobot.eventbus.on("depth", (name, data) => {
      // console.log("startDepInfo-depthevent", name, data);
      let { asks, bids } = data;
      // console.log("aaaa", asks)
      asks.reverse();
      // console.log("cccc", asks)
      let dataAsks = asks.map((v, i) => {
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
      // console.log("bbbb", dataAsks)

      let dataBids = bids.map((v, i) => {
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
      this.setState({ dataAsks, dataBids });
    });
  }

  render() {

    return (
      <div className="manual">
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Batch></Batch>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="卖单情况" data={this.state.dataAsks}></DetailBill>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Cancel></Cancel>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <DetailBill title="买单情况" data={this.state.dataBids}></DetailBill>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  const infoingData = state.infoing;

  return {
    account: infoingData.account
  };
};

export default connect(mapStateToProps)(ManualPage);