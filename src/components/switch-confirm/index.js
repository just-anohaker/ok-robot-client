import React from 'react';
import { Switch, Popconfirm } from 'antd'


class SwitchConfirm extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      visible: false,
      tranSwitch: this.props.tranSwitch
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  cancel() {
    this.setState({ visible: false })

  }

  async confirm() {
    await this.setStateAsync({ visible: false, tranSwitch: !this.state.tranSwitch });
    if (this.state.tranSwitch) {
      this.props.start()
    } else {
      this.props.stop()
    }
  }

  tranSwitchHandle(visible) {
    this.setState({ visible: true })
  }

  render() {
    return (
      <div>
        <Popconfirm title="是否继续操作？" onCancel={this.cancel.bind(this)} onConfirm={this.confirm.bind(this)} visible={this.state.visible} okText="确定" cancelText="取消" >
          <Switch checkedChildren="开" unCheckedChildren="关" checked={this.state.tranSwitch} onClick={this.tranSwitchHandle.bind(this)} />
        </Popconfirm>
      </div>
    )
  }
}


export default SwitchConfirm
