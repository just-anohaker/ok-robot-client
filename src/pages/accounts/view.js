import React, { PureComponent } from 'react';
import { Card, notification } from 'antd';
import { view as TableForm } from '../../components/tableform';
import { actions as loading } from '../../components/loading';
import store from "../../Store";
import okrobot from "okrobot-js";
import { put, get } from "../../util/localstorage.js";

class AccountsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tableData: [] };
  }

  componentWillMount() {
    this.queryTableData();
  }

  transferData = (data) => {
    let rows = data.map((item, index) => {
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

    // store.dispatch(loading.showLoading());
    // okrobot.user.getAll()
    //   .then((res) => {
    //     if (res.length > 0) {
    //       let tableData = this.transferData(res);
    //       this.setState({ tableData });

    //       put("allAccouts", res);
    //     }

    //     store.dispatch(loading.hideLoading());
    //   })
    //   .catch(err => {
    //     notification["error"]({
    //       message: "请求数据错误",
    //       description: "" + err
    //     });
    //     store.dispatch(loading.hideLoading());
    //   });
  }

  addTableData(row, cb) {
    store.dispatch(loading.showLoading());
    okrobot.user.add(row.controller, row.name, row.httpkey, row.httpsecret, row.passphrase)
      .then((res) => {
        // console.log("updata accounts res", res)
        let newRow = this.transferData([res]);
        // console.log("updata accounts newRow", newRow)
        let { tableData } = this.state;
        tableData.push(newRow[0]);
        this.setState({ tableData });

        let newAccounts = get("allAccouts");
        // console.log("updata accounts newAccounts", newAccounts)
        newAccounts.push(res);
        put("allAccouts", newAccounts);

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {
        notification.error({
          message: "添加数据错误",
          description: "" + err
        });

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }

  editTableData(row, cb) {
    store.dispatch(loading.showLoading());
    okrobot.user.update(row.id, {
      groupName: row.controller, name: row.name, httpkey: row.api, httpsecret: row.secret, passphrase: row.passphrase
    })
      .then((res) => {
        let newAccounts = get("allAccouts");
        // console.log("edit accounts", newAccounts)
        newAccounts = newAccounts.map((item) => {
          if (item.id === res.id) {
            item = res;
          }
          return item;
        });
        // console.log("edit accounts", newAccounts)
        put("allAccouts", newAccounts);

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {
        notification.error({
          message: "编辑数据错误",
          description: "" + err
        });

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }

  removeTableData(row, cb) {
    store.dispatch(loading.showLoading());
    // console.log("removeTableData");
    okrobot.user.remove(row.id)
      .then((res) => {
        // console.log("remove:", res);
        let newAccounts = get("allAccouts");
        // console.log("remove accounts", newAccounts)
        newAccounts = newAccounts.filter((item) => {
          return item.id !== res.id;
        });
        // console.log("remove accounts", newAccounts)
        put("allAccouts", newAccounts);

        store.dispatch(loading.hideLoading());
        cb();
      })
      .catch(err => {
        notification["error"]({
          message: "删除数据错误",
          description: "" + err
        });

        store.dispatch(loading.hideLoading());
        cb(err);
      });
  }


  onChange = (type, data, key, cb) => {// 表格更新
    let row = data.filter(item => item.key === key)[0];//被操作数据行
    // console.log("ochange", type, data, key)
    if (type === "del") {//删除
      if (typeof key === "string" && key.indexOf("NEW_TEMP_ID_") === 0) {//取消新建
        // console.log("aaaaaaaa")
        cb();
      }
      else {
        // console.log("bbbbbbbb")
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

export default AccountsPage;

