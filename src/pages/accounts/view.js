import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { view as TableForm } from '../../components/tableform';
import { actions as loading } from '../../components/loading';
import store from "../../Store";
import okrobot from "okrobot-js";
import { put, get } from "../../util/localstorage.js";
import LoadData from '../../util/LoadData'

class AccountsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tableData: [] };
  }

  componentWillMount() {
    this.queryTableData();
  }

  transferData = (data) => {
    let rows = data.map(item => {
      return {
        key: item.id,
        id: item.id,
        name: item.name,
        controller: item.groupName,
        httpkey: item.httpkey,
        httpsecret: item.httpsecret,
        passphrase: item.passphrase
      }
    });
    return rows;
  }

  queryTableData() {
    let accounts = get("allAccouts");
    if (!(accounts instanceof Array)) {
      accounts = [];
    }
    console.log(accounts)
    let tableData = this.transferData(accounts);
    this.setState({ tableData });
  }

  addTableData(row, cb) {
    store.dispatch(loading.showLoading());
    okrobot.user.add(row.controller, row.name, row.httpkey, row.httpsecret, row.passphrase)
      .then((res) => {
        let newRow = this.transferData([res]);

        let { tableData } = this.state;
        tableData.push(newRow[0]);
        this.setState({ tableData });

        let newAccounts = get("allAccouts");
        newAccounts.push(res);
        put("allAccouts", newAccounts);
        store.dispatch({ type: 'ALL_ACCOUNTS' });

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }

  editTableData(row, cb) {
    store.dispatch(loading.showLoading());
    okrobot.user.update(row.id, {
      groupName: row.controller, name: row.name, httpkey: row.httpkey, httpsecret: row.httpsecret, passphrase: row.passphrase
    })
      .then((res) => {
        let newAccounts = get("allAccouts");
        newAccounts = newAccounts.map((item) => {
          if (item.id === res.id) {
            item = res;
          }
          return item;
        });

        put("allAccouts", newAccounts);
        store.dispatch({ type: 'ALL_ACCOUNTS' });

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }

  removeTableData(row, cb) {
    store.dispatch(loading.showLoading());
    okrobot.user.remove(row.id)
      .then((res) => {
        let newAccounts = get("allAccouts");
        newAccounts = newAccounts.filter((item) => {
          return item.id !== res.id;
        });

        put("allAccouts", newAccounts);
        store.dispatch({ type: 'ALL_ACCOUNTS' });

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }

  onChange = (type, data, key, cb) => {// 表格更新
    let row = data.filter(item => item.key === key)[0];//被操作数据行
    if (type === "del") {//删除
      if (typeof key === "string" && key.indexOf("NEW_TEMP_ID_") === 0) {//取消新建
        cb();
      }
      else {
        this.removeTableData(row, cb);
      }
    }
    else {
      if (typeof key === "string" && key.indexOf("NEW_TEMP_ID_") === 0) {//新建
        this.addTableData(row, cb);
      }
      else {//编辑
        this.editTableData(row, cb);
      }
    }
  }

  render() {
    const { tableData } = this.state;
    return (
      <Card title="账号管理"  >
        <TableForm data={tableData} onChange={this.onChange} />
      </Card>
    );
  }

};
const AccountsPageData = LoadData()(AccountsPage);
export default AccountsPageData;

