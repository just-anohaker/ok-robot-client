import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { view as TableForm } from '../../components/tableform';

const AccountsPage = (props) => {

  const tableData = [
    {
      id: '1',
      name: 'John Brow',
      controller: '张三',
      api: 'New York No. 1 Lake Park',
      secret: "laundry hockey oppose void announce stay transfer prefer syrup review lottery great"
    },
    {
      id: '2',
      name: 'Tom Alpha',
      controller: '李四',
      api: 'New York No. 1 Lake Park',
      secret: "worry net spend unfold desert trust dove waste grain people swap twelve"
    },
    {
      id: '3',
      name: 'Jim Green',
      controller: '王五',
      api: 'New York No. 1 Lake Park',
      secret: "worry net spend unfold desert trust dove waste grain people swap twelve"
    },
    {
      id: '4',
      name: 'Jack',
      controller: '赵六',
      api: 'New York No. 1 Lake Park',
      secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee"
    }
  ];

  return (
    <Card title="账号管理">
      <TableForm data={tableData} />
    </Card>
  );
};

export default AccountsPage;
