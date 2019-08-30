/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import './index.less'

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber size="small" />;
    }
    return <Input size="small" />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data, editingKey: '', sum: 0 };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'client_oid',
        width: '10%',
        editable: false,
        render: (text) => <span>{text}</span>
      },
      {
        title: '买卖',
        dataIndex: 'side',
        width: '20%',
        editable: false,
        render: (text) => (<span>{text === 'buy' ? <span style={{ color: '#2fc25b' }}>买入</span> : <span style={{ color: '#f04864' }}>卖出</span>}</span>)
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: '20%',
        editable: true,
      },
      {
        title: '委托量',
        dataIndex: 'volume',
        width: '20%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a onClick={() => this.save(form, record.client_oid)} style={{ marginRight: 8 }}>保存</a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确认取消?" onConfirm={() => this.cancel(record.client_oid)}>
                <a > 取消</a>
              </Popconfirm>
            </span>
          ) : (
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.client_oid)}>
                编辑
            </a>
            );
        },
      },
    ];
  }

  isEditing = record => record.client_oid === this.state.editingKey;


  cancel = () => {
    this.setState({ editingKey: '' });
  };
  sum() {
    let data = this.state.data;
    return data.reduce((pre, next) => {
      return pre + next.price * next.volume
    }, 0)

  }
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.client_oid);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
        this.props.changeProps(newData);
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
        this.props.changeProps(newData);

      }

    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          size="small"
          footer={() => ('总计：' + this.sum().toFixed(4) + ' ' + this.props.addonAfter)}
          rowKey={record => record.client_oid}
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          scroll={{ y: 300 }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create({ name: 'aaa' })(EditableTable);

export default EditableFormTable