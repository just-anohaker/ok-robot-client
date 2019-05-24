/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './tableform.module.css';

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      loading: false,
      value: props.data,
    };

  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.data, preState.value)) {
      return null;
    }

    return {
      data: nextProps.data,
      value: nextProps.data,
    };
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
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
      api: '',
      secret: '',
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
    onChange("del", data, key, (err) => {
      if (err) {
        message.error('删除信息失败！' + err);
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
    if (!target.name || !target.controller || !target.api || !target.secret) {
      message.error('请填写完整成员信息。');
      e.target.focus();
      this.setState({ loading: false });
      return;
    }

    const { data } = this.state;
    const { onChange } = this.props;
    onChange("save", data, key, (err) => {
      if (err) {
        message.error("保存信息失败！" + err);
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
        title: '账户名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
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
        key: 'controller',
        width: '15%',
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
        title: 'API',
        dataIndex: 'api',
        key: 'api',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'api', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="API key"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Secret',
        dataIndex: 'secret',
        key: 'secret',
        width: '40%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'secret', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Secret"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
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
