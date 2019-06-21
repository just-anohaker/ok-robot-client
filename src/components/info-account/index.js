import React from 'react';
import { Select, Radio } from 'antd'
import { connect } from 'react-redux';
import styles from './info.module.css'
const Option = Select.Option;

class InfoAccount extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      account:[]
    }
  }
  componentWillMount() { }
  handleTranTypeChange(value) {
    this.props.dispatch({ type: 'CHANGE_TRANTYPE', 'tranTran': value.target.value })
  }
  handleAccountChange(value) {
    this.props.dispatch({ type: 'CHANGE_ACCOUNT', 'name': value })
  }
  render() {
    let accounts = this.props.accounts
    return (
      <div className={styles['header-account']}>
        {/* <div className="header-item header-balance">
          <span className={styles['name']}>账号余额 :</span>
          <span>3242342</span>
        </div> */}

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
          <Radio.Group onChange={this.handleTranTypeChange.bind(this)} value={this.props.tranType}  buttonStyle="solid">
            <Radio.Button value="ETM-USDT">ETM/USDT</Radio.Button>
            <Radio.Button value="ETM-USDK">ETM/USDK</Radio.Button>
          </Radio.Group>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  const infoingData = state.infoing;

  return {
    name: infoingData.account.name,
    groupName: infoingData.account.groupName,
    tranType: infoingData.tranType.name,
    accounts:infoingData.accounts
  };
};

export default connect(mapStateToProps)(InfoAccount);
