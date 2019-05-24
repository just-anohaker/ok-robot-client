import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, message } from 'antd';
import { view as TableForm } from '../../components/tableform';
import okrobot from "okrobot-js";

okrobot.config.hostname = "http://47.111.160.173:1996"

class AccountsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tableData: [], loading: false };

  }

  componentWillMount() {
    this.queryTableData();
  }

  queryTableData() {
    this.setState({ loading: true });
    okrobot.user.getAll()
      .then((res) => {
        setTimeout(() => {
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
          this.setState({ loading: false })
        }, 2000);
      })
      .catch(err => {
        message.error("请求账户数据失败！" + err);
        this.setState({ loading: false });
      });
  }

  addTableData(row, cb) {
    okrobot.user.add(row.controller, row.name, row.api, row.secret)
      .then((res) => {
        let newRow = res;
        let { tableData } = this.state;
        tableData.push(newRow);

        this.setState({ tableData })
        cb();
      })
      .catch(err => {
        cb(err);
      });
  }

  editTableData(row, cb) {
    okrobot.user.update(row.id, {
      groupName: row.controller, name: row.name, apiKey: row.api, apiSecret: row.secret
    })
      .then((res) => {
        cb();
      })
      .catch(err => {
        cb(err);
      });
  }

  removeTableData(row, cb) {
    okrobot.user.remove(row.id)
      .then((res) => {
        cb();
      })
      .catch(err => {
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

const mapStateToProps = (state) => {
  const loadingData = state.loading;

  return {
    show: loadingData.show
  };
};

export default connect(mapStateToProps)(AccountsPage);
