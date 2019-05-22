import React, { Fragment, useState } from 'react';
// import { view as Loading } from './components/loading';
import { Button, Table, Input, Divider, Popconfirm, message, } from 'antd';
// import { arrayTypeAnnotation } from '@babel/types';
// import { METHODS } from 'http';


const TableForm = (props) => {

  let data = props.data;
  let cacheOriginData = {}, clickedCancel = false, index = 0;
  // const [o_data, setData] = useState(data);
  const [loading, setLoad] = useState(false);

  const getRowByKey = (key, newData) => {
    // const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  const handleFieldChange = (e, fieldName, key) => {
    // const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      // setData({ data: newData });
    }
  }

  const handleKeyPress = (e, key) => {
    if (e.key === 'Enter') {
      save(e, key);
    }
  }

  const edit = (e, key) => {
    e.preventDefault();
    // const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      // setData({ data: newData });
    }
  };

  const remove = (key) => {
    // const { data } = this.state;
    const { onChange } = props;
    const newData = data.filter(item => item.key !== key);
    // setData({ data: newData });
    onChange(newData);
  }

  const save = (e, key) => {
    e.persist();
    // setLoad({
    //   loading: true,
    // });
    setTimeout(() => {
      if (clickedCancel) {
        clickedCancel = false;
        return;
      }
      const target = getRowByKey(key) || {};
      if (!target.workId || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        // setLoad({
        //   loading: false,
        // });
        return;
      }
      delete target.isNew;
      edit(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      // setLoad({
      //   loading: false,
      // });
    }, 500);
  }

  const cancel = (e, key) => {
    clickedCancel = true;
    e.preventDefault();
    // const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (cacheOriginData[key]) {
      Object.assign(target, cacheOriginData[key]);
      delete cacheOriginData[key];
    }
    target.editable = false;
    // setData({ data: newData });
    clickedCancel = false;
  }

  const newMember = () => {
    // const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    index += 1;
    // setData({ data: newData });
  };

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
              onChange={e => handleFieldChange(e, 'name', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
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
              onChange={e => handleFieldChange(e, 'controller', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
              placeholder="操作员"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'API key',
      dataIndex: 'api',
      key: 'api',
      width: '15%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => handleFieldChange(e, 'api', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
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
              onChange={e => handleFieldChange(e, 'secret', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
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
        // const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => save(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => save(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => edit(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.data}
        pagination={false}
        rowClassName={record => ('')}
        bordered
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
        icon="plus"
      >
        新增成员
        </Button>
    </Fragment>
  );
}

export default TableForm;