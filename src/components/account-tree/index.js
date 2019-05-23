import React from 'react'
import {Card,Tree} from 'antd'

class AccountTree extends React.Component{
  constructor(...args){
    super(...args)
    this.state = {
      a:1
    }
  }
  onSelect(){

  }
  onCheck(){

  }
  render(){
    const {TreeNode} = Tree
    return (
      <Card title="执行账户"  >
      <Tree
      checkable
      defaultExpandedKeys={['0-0', '1-1']}
      defaultSelectedKeys={['0-0', '1-1']}
      defaultCheckedKeys={[]}
      onSelect={this.onSelect}
      onCheck={this.onCheck}
      >
      <TreeNode title="A 组账号" key="0">
          <TreeNode title="账户1" key="0-0"  />
          <TreeNode title="账户2" key="0-1" />
          <TreeNode title="账户3" key="0-2" />
          <TreeNode title="账户4" key="0-3" />
      </TreeNode>
      <TreeNode title="B 组账号" key="1">
        <TreeNode title="账户1" key="1-0"  />
        <TreeNode title="账户2" key="1-1" />
        <TreeNode title="账户3" key="1-2" />
        <TreeNode title="账户4" key="1-3" />
      </TreeNode>
    </Tree>
  </Card>
    )
  }

}

export default AccountTree
