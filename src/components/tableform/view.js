/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, notification, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './tableform.module.css';

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.data.slice() || [],
      loading: false,
      value: props.data.slice(),
    };

  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.data, preState.value)) {
      return null;
    }
    return {
      data: nextProps.data.slice(),
      value: nextProps.data.slice(),
    };
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    console.log(data, 'data');

    const newData = data.map(item => ({ ...item }));
    console.log(newData, '3224234234234234');

    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  newAccount = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      name: '',
      controller: '',
      httpkey: '',
      httpsecret: '',
      passphrase: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  remove(key) {
    this.setState({ loading: true });
    const { data } = this.state;
    const { onChange } = this.props;
    // console.log("remove", data, key)
    onChange("del", data, key, (err) => {
      if (err) {
        // message.error('删除信息失败！' + err);
        notification.error({
          message: "删除信息失败！",
          description: "" + err
        });
        this.setState({ loading: false });
        return;
      }

      const newData = data.filter(item => item.key !== key);
      this.setState({ data: newData });

      this.setState({ loading: false });
    });
  }

  saveRow(e, key) {
    e.persist();
    this.setState({ loading: true });

    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }

    const target = this.getRowByKey(key) || {};
    // console.log(target)
    if (!target.name || !target.controller || !target.httpkey || !target.httpsecret || !target.passphrase) {
      // message.error('请填写完整成员信息。');
      notification.error({
        message: "添加数据失败",
        description: "请填写完整成员信息。"
      });
      e.target.focus();
      this.setState({ loading: false });
      return;
    }

    const { data } = this.state;
    const { onChange } = this.props;
    onChange("save", data, key, (err) => {
      if (err) {
        // message.error("保存信息失败！" + err);
        notification.error({
          message: "保存数据失败！",
          description: "" + err
        });
        this.setState({ loading: false });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.setState({ loading: false });
    });
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {

    const columns = [
      {
        title: "账户名称",
        dataIndex: 'name',
        width: '200',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="账户名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作员',
        dataIndex: 'controller',
        width: '200',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'controller', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="操作员"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'httpkey',
        dataIndex: 'httpkey',
        width: '400',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                onChange={e => this.handleFieldChange(e, 'httpkey', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="httpkey"
              />
            );
          }
          return "******";
        },
      },
      {
        title: "httpsecret",
        dataIndex: 'httpsecret',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                onChange={e => this.handleFieldChange(e, 'httpsecret', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="httpsecret"
              />
            );
          }
          return "******";
        },
      },
      {
        title: "Passphrase",
        dataIndex: 'passphrase',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                onChange={e => this.handleFieldChange(e, 'passphrase', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Passphrase"
              />
            );
          }
          return "******";
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '110px',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (//新建
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (//编辑
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (//默认
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newAccount}
          icon="plus"
        >
          新增账号
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
