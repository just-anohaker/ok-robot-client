import React from 'react';
import { Select, Radio ,notification } from 'antd';
import { connect } from 'react-redux';

import okrobot from "okrobot-js";
import styles from './info.module.css'
const Option = Select.Option;

class InfoAccount extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      balance_usdt: {
        available:'',
        balance:'',
        currency:''
      },
      balance_usdk: {
        available:'',
        balance:'',
        currency:''
      },
      balance_etm: {
        available:'',
        balance:'',
        currency:''
      }

    }
  }
  componentDidMount() {
    this.balance(this.props.account);
    this.monitSpotWallet(this.props.account);
  }
  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     account:props.account,
  //     addonAfter:props.addonAfter
  //   }
  // }
  
  async balance(account) {
    try {
      const result = await okrobot.okex_utils.getWallet(account, ['ETM', 'USDT', 'USDK']);

      if (result && result.length > 0) {
        this.setState({ balance_usdt: result[0], balance_usdk: result[1], balance_etm: result[2] })
      } else {
        notification.error({
          message: '提示',
          description:
            '网络超时，请重试'
        });
      }
    } catch (error) {
      console.log(error)
    }

  }
  async monitSpotWallet(account) {
    try {
      const usdt = await okrobot.okex_monitor.monitSpotWallet(account, 'USDT');
      const usdk = await okrobot.okex_monitor.monitSpotWallet(account, 'USDK');
      const etm = await okrobot.okex_monitor.monitSpotWallet(account, 'ETM');
      if (usdt && usdk && etm) {
        okrobot.eventbus.on(usdt, (name, data) => {
          this.setState({ balance_usdt: data[0] });
        });
        okrobot.eventbus.on(usdk, (name, data) => {
          this.setState({ balance_usdk: data[0] });
        });
        okrobot.eventbus.on(etm, (name, data) => {
          this.setState({ balance_etm: data[0] });
        });
      } else {
        notification.error({
          message: '提示',
          description:
            '网络超时，请重试'
        });
      }
    } catch (error) {
      console.log(error)
    }


  }
  async unmonitSpotWallet(account) {
    try {
      await okrobot.okex_monitor.unmonitSpotWallet(account, 'USDT');
      await okrobot.okex_monitor.unmonitSpotWallet(account, 'USDK');
      await okrobot.okex_monitor.unmonitSpotWallet(account, 'ETM');   
    } catch (error) {
      console.log(error)
    }

  }
  async handleTranTypeChange(value) {
    await this.props.dispatch({ type: 'CHANGE_TRANTYPE', 'tranTran': value.target.value })
  }
  async handleAccountChange(value) {
    try {
      await this.unmonitSpotWallet(this.props.account);
      await this.props.dispatch({ type: 'CHANGE_ACCOUNT', 'name': value });
      await this.balance(this.props.account);
      await this.monitSpotWallet(this.props.account);   
    } catch (error) {
      console.log(error)
    }

  }
  render() {
    let accounts = this.props.accounts
    let { balance_etm, balance_usdt, balance_usdk } = this.state
    return (
      <div className={styles['header-account']}>
        <div className={styles['header-balance']}>
          <span className={styles['name']}>账号余额 :</span>
          <div className={styles['count']}>
            <div className={styles['count-item']}>
              <span>{Number(balance_usdt.available).toFixed(4)}</span> / <span>{Number(balance_usdt.balance).toFixed(4)}</span> <span>{balance_usdt.currency}</span>
            </div>
            <div className={styles['count-item']}>
              <span>{Number(balance_usdk.available).toFixed(4)}</span> / <span>{Number(balance_usdk.balance).toFixed(4)}</span> <span>{balance_usdk.currency}</span>
            </div>
            <div className={styles['count-item']}>
              <span>{Number(balance_etm.available).toFixed(4)}</span> / <span>{Number(balance_etm.balance).toFixed(4)}</span> <span>{balance_etm.currency}</span>
            </div>

          </div>
        </div>

        <div className="header-item">
          <span className={styles['name']}>执行账户 :</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择交易执行账户"
            optionFilterProp="children"
            value={`${this.props.name}-${this.props.groupName}`}
            onChange={this.handleAccountChange.bind(this)}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {accounts.map(item => <Option key={item.id} value={item.id}>{`${item.name}-${item.groupName}`}</Option>)}
          </Select>
        </div>

        <div className={styles['tran-item']}>
          <span className={styles['name']}>交易对 :</span>
          <Radio.Group onChange={this.handleTranTypeChange.bind(this)} value={this.props.tranType} buttonStyle="solid">
            <Radio.Button value="ETM-USDT">ETM/USDT</Radio.Button>
            <Radio.Button value="ETM-USDK">ETM/USDK</Radio.Button>
          </Radio.Group>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const infoingData = state.infoing;
  return {
    name: infoingData.account.name,
    groupName: infoingData.account.groupName,
    tranType: infoingData.tranType.name,
    accounts: infoingData.accounts,
    account: infoingData.account

  };
};

export default connect(mapStateToProps)(InfoAccount);
