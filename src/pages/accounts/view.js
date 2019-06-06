import React, { PureComponent } from 'react';
import { Card, notification } from 'antd';
import { view as TableForm } from '../../components/tableform';
import { actions as loading } from '../../components/loading';
import store from "../../Store";
import okrobot from "okrobot-js";
import { put, get } from "../../util/localstorage.js";

// okrobot.config.hostname = "http://192.168.2.97:1996"
okrobot.config.hostname = "http://47.111.160.173:1996";

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
        key: index,
        id: item.id,
        name: item.name,
        controller: item.groupName,
        api: item.httpKey,
        secret: item.httpSecret,
        passphrase: item.passphrase
      }
    });
    return rows;
  }

  queryTableData() {
    store.dispatch(loading.showLoading());

    okrobot.user.getAll()
      .then((res) => {
        if (res.length > 0) {
          let tableData = this.transferData(res);
          this.setState({ tableData });

          put("allAccouts", res);
        }

        store.dispatch(loading.hideLoading());
      })
      .catch(err => {
        notification["error"]({
          message: "请求数据错误",
          description: "" + err
        });
        store.dispatch(loading.hideLoading());
      });
  }

  addTableData(row, cb) {
    okrobot.user.add(row.controller, row.name, row.api, row.secret, row.passphrase)
      .then((res) => {
        console.log("updata accounts", res)
        let newRow = this.transferData([res]);
        let { tableData } = this.state;
        tableData.push(newRow);
        this.setState({ tableData });

        let newAccounts = get("allAccouts");
        newAccounts.push(res);
        put("allAccouts", newAccounts)

        cb();
      })
      .catch(err => {
        notification.error({
          message: "添加数据错误",
          description: "" + err
        });
        cb(err);
      });
  }

  editTableData(row, cb) {
    okrobot.user.update(row.id, {
      groupName: row.controller, name: row.name, httpKey: row.api, httpSecret: row.secret, passphrase: row.passphrase
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

        cb();
      })
      .catch(err => {
        notification.error({
          message: "编辑数据错误",
          description: "" + err
        });
        cb(err);
      });
  }

  removeTableData(row, cb) {
    okrobot.user.remove(row.id)
      .then((res) => {
        let newAccounts = get("allAccouts");
        // console.log("remove accounts", newAccounts)
        newAccounts = newAccounts.filter((item) => {
          return item.id !== res.id;
        });
        // console.log("remove accounts", newAccounts)
        put("allAccouts", newAccounts);

        cb();
      })
      .catch(err => {
        notification["error"]({
          message: "删除数据错误",
          description: "" + err
        });
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

export default AccountsPage;

