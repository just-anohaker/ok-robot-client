import React from 'react';
import {Select} from 'antd'
import { connect } from 'react-redux';
import { get } from "../../util/localstorage.js";
import styles from './info.module.css'
const Option = Select.Option;

class InfoAccount extends React.Component{
  constructor(...args){
    super(...args)
    this.state={

    }
  }
  handleTranTypeChange(value){
    console.log(value)
    this.props.dispatch({type:'CHANGE_TRANTYPE','tranTran':value})
  }
  handleAccountChange(value){
    this.props.dispatch({type:'CHANGE_ACCOUNT','name':value})
  }
  render(){
    return (
      <div className={styles['header-account']}>
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
        { get("allAccouts") && get("allAccouts").map(item => <Option key={item.id} value={item.id}>{`${item.name}-${item.groupName}`}</Option>)}
      </Select>
      </div>

      <div className={styles['tran-item']}>
        <span className={styles['name']}>交易对 :</span>
          <Select
          showSearch
          style={{ width: 200 }}
          placeholder="请选择交易对!"
          optionFilterProp="children"
          onChange={this.handleTranTypeChange.bind(this)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="ZIL/USDT">ZIL-USDT</Option>
          <Option value="ETM/USDT">ETM/USDT</Option>
        </Select>
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
    groupName:infoingData.account.groupName,
    tranType:infoingData.tranType.name
  };
};

export default connect(mapStateToProps)(InfoAccount);
