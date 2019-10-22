/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import okrobot from "okrobot-js";
import { Card, Form, Button, Row, Col, Table, notification,Divider } from 'antd';
// import { parseTime } from '../../util/utils';
import { KeepAlive } from "react-keep-alive";
import AddUpperLimit from './addUpperLimit';
import AddLowerLimit from './addLowerLimit';
import AddFloatLimit from './addFloatLimit';
import AddNoDiffLimit from './addNoDiffLimit';
import LoadData from '../../util/LoadData'
import './index.css';

class PriceWarning extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      data: [],
      accounts: [],
      loading: false,
      lastOderId: '',
      pagination: {},
      status:false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tranType !== nextProps.tranType || this.props.account.httpkey !== nextProps.account.httpkey) {
      this.getOrderData({ options: { instrument_id: nextProps.tranType }, account: nextProps.account })
    }
  }

  componentWillMount() {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType }, account: account });
    this.isWarning()
  }

  refresh = () => {
    let tranType = this.props.tranType;
    let account = this.props.account;
    this.getOrderData({ options: { instrument_id: tranType }, account: account })
  }

  async getOrderData({ options = {}, account }) {
    try {
      this.setState({ loading: true });
      const res = await okrobot.batch_order.listWarnings(options, account);
      console.log(res);
      if (res && res.length > 0) {
        const pagination = { ...this.state.pagination };
        const data = res;
        pagination.total = res.length;
        this.setState({ loading: false, data: data });
      } else {
        this.setState({ loading: false });
        this.setState({ data: [] })
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ data: [] })
      console.log(error)
    }

  }

  async isWarning () {
    try {
      const res = await okrobot.batch_order.isWarnings({}, this.props.account);
      console.log(res,'是否预警');
      if(res){
        this.setState({status:res.result})
      }  
    } catch (error) {
      console.log(error);
      
    }
  }
  async startWarningsAll () {
    try {
      const res = await okrobot.batch_order.startWarnings({instrument_id: 'ETM-USDT'}, this.props.account);
      console.log(res);
      if(res && res.result){
        notification.success({
          message: '提示',
          description:
            '开始预警',
        });
        this.isWarning();
        this.props.dispatch({ type: 'DELETE', 'wid': '' });
        this.props.dispatch({ type: 'STOP', 'all': '' });

      }   
    } catch (error) {
      console.log(error)
    }

  }
  async startWarnings (ev,options={}) {
    try {
      const res = await okrobot.batch_order.addWarnings(options, this.props.account);
      if(res && res.result){
        notification.success({
          message: '提示',
          description:
            '开始预警',
        });
        this.refresh()
      }   
    } catch (error) {
      console.log(error)
    }

  }
  async stopWarnings (ev,options={}) {
    try {
      const res = await okrobot.batch_order.stopWarnings(options, this.props.account);
    if(res && res.result){
      notification.success({
        message: '提示',
        description:
          '停止预警',
      });
      this.refresh();
      if(!options.wid){
        this.isWarning();
        await this.props.dispatch({ type: 'STOP', 'all': 'all' });
      } else {
        await this.props.dispatch({ type: 'DELETE', 'wid': options.wid });
      }

    }    
    } catch (error) {
      console.log(error);
    }


  }
   deleteWarnings = async (ev,record) => {
     try {
      const res = await okrobot.batch_order.removeWarnings({wid:record.wid}, this.props.account);
      if(res && res.result){
        notification.success({
          message: '提示',
          description:
            '删除成功',
        });
        await this.props.dispatch({ type: 'DELETE', 'wid': record.wid });

        this.refresh();
      }  
     } catch (error) {
       console.log(error);
     }

  }
  statusType(type) {
    // eslint-disable-next-line default-case
    switch (type) {
      case '1':
        return '上限预警'
      case '2':
        return '下限预警'
      case '3':
        return '无差价预警'
      case '4':
        return '浮动预警'
    }
  }


  render() {
    const columns = [
      {
        title: '类型',
        dataIndex: 'type',
        render:(text) =>(
          <span>{this.statusType(text)}</span>
          )
      },
      {
        title: '上限价格',
        dataIndex: 'maxprice',
      },
      {
        title: '下限价格',
        dataIndex: 'minprice',
      },
      {
        title: '无差价时间',
        dataIndex: 'utime',
      },
      {
        title: '浮动百分比',
        dataIndex: 'pecent',
        render:(text) =>(<span>{text ? text*100+'%' : ''}</span>)
      },
      {
        title: '交易对',
        dataIndex: 'instrument_id',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render:(text) =>(<span>{text === '0' ? <span style={{ color: '#f04864' }}>已停止</span> : <span style={{ color: '#2fc25b' }}>已开启</span>}</span>)
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={(ev) => {this.startWarnings(ev,{wid:record.wid})}}>开启</a>
            <Divider type="vertical" />
            <a onClick={(ev) => {this.stopWarnings(ev,{wid:record.wid})}}>停止</a>
            <Divider type="vertical" />
            <a onClick={(ev) => {this.deleteWarnings(ev,record)}}>删除</a>
          </span>
        ),
      }
    ];

    const tableAttr = {
      columns,
      scroll: { x: 600 },
      size: 'small'
    };
    const status = this.state.status ? '开' : '关'
    return (
      <div className="trans">
        <Row gutter={24} >
        <Col xl={24} lg={24} md={24} sm={24} xs={24} >
            <Card title="预警列表" style={{ marginBottom: 24 }} extra={
            <div>
              <span style={{ fontWeight: 600,marginRight: 10 }} >预警连接状态 : {status} </span>
              <Button onClick={this.startWarningsAll.bind(this)} type="primary" style={{marginRight:10}}>开始</Button>
              <Button onClick={this.stopWarnings.bind(this)} type="primary" style={{marginRight:10}}>停止</Button>
              <Button onClick={this.refresh.bind(this)} type="primary">刷新</Button>
            </div>
            } >
              <Table rowKey={record => record.wid} loading={this.state.loading} dataSource={this.state.data} {...tableAttr} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <KeepAlive name="addUpperLimit">
              <AddUpperLimit refresh={this.refresh}></AddUpperLimit>
            </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <KeepAlive name="addLowerLimit">
              <AddLowerLimit  refresh={this.refresh} ></AddLowerLimit>
            </KeepAlive>
          </Col>
        </Row>
        <Row gutter={24} style={{marginTop:24}}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <KeepAlive name="addFloatLimit">
              <AddFloatLimit refresh={this.refresh}></AddFloatLimit>
            </KeepAlive>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <KeepAlive name="addNoDiffLimit">
              <AddNoDiffLimit  refresh={this.refresh}></AddNoDiffLimit>
            </KeepAlive>
          </Col>
        </Row>
      </div>
    );
  }
}
const PriceWarningLoad = LoadData()(PriceWarning);
const Warning = Form.create({ name: 'batchcard' })(PriceWarningLoad);
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)

  };
};

export default connect(mapStateToProps)(Warning);
