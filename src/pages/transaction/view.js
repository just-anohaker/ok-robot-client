/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Divider, Tag,Col,Card,Button } from 'antd';
import { connect } from 'react-redux';
import okrobot from 'okrobot-js'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a >{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a >Invite {record.name}</a>
        <Divider type="vertical" />
        <a >Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
class Transaction extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {

    }
  }

  componentDidMount(){
    let options = {state:'0'}
    okrobot.auto_maker.getOrderInfo(options,this.props.account)
  }
  render() {
    return (
      <div>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card title="交易记录" style={{ marginBottom: 24 }} extra={<Button  type="primary">刷新</Button>} >
              <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const infoingData = state.infoing;

  return {
    account: infoingData.account,
    tranType: infoingData.tranType.name,
    addonAfter: infoingData.tranType.name.substring(4)
  };
};

export default connect(mapStateToProps)(Transaction);
