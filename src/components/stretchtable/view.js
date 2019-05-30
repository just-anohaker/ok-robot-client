import React, { PureComponent } from 'react';
import { Resizable } from 'react-resizable';
import isEqual from 'lodash/isEqual';
import { Table } from 'antd';
import './index.css';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class StretchTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.columns,
      data: props.data,
      value: props.data
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

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Table
        bordered
        components={this.components}
        columns={columns}
        dataSource={this.state.data} />
    )
  }
}

export default StretchTable;