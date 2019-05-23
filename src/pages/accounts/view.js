import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { view as TableForm } from '../../components/tableform';
import okrobot from "okrobot-js"

okrobot.config.hostname = "http://192.168.2.210:1996"

class AccountsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tableData: [] };

    this.getTableData();
  }

  onChange = (data, key, type, cb) => {
    console.log(data, key, type)
    let row = data.filter(item => item.key === key)[0];

    if (type === "del") {//删除
      if (typeof key === "string" && key.indexOf("NEW_TEMP_ID_") === 0) {//取消新建
        cb();
      }
      else {
        okrobot.user.remove(row.id)
          .then(() => {
            cb();
            console.log("then")
            this.getTableData();
          })
          .catch(err => cb(err));
      }
    }
    else {
      if (typeof key === "string" && key.indexOf("NEW_TEMP_ID_") === 0) {//新建
        okrobot.user.add(row.controller, row.name, row.api, row.secret)
          .then(() => {
            cb();
            console.log("then")
            this.getTableData();
          })
          .catch(err => cb(err));
      }
      else {//编辑
        okrobot.user.update(row.id, {
          groupName: row.controller, name: row.name, apiKey: row.api, apiSecret: row.secret
        })
          .then(() => {
            cb();
            console.log("then")
            this.getTableData();
          })
          .catch(err => cb(err));
      }
    }

  }



  getTableData() {
    console.log("getTableData")
    okrobot.user.getAll().then((res) => {
      if (res.length > 0) {
        let tableData = res.map((item, index) => {
          return {
            key: index,
            id: item.id,
            name: item.name,
            controller: item.groupName,
            api: item.apiKey,
            secret: item.apiSecret,
          }
        });
        this.setState({ tableData })
      }
    })
  }

  render() {

    return (
      <Card title="账号管理">
        <TableForm data={this.state.tableData} onChange={this.onChange} />
      </Card>
    );
  }

};

export default AccountsPage;
