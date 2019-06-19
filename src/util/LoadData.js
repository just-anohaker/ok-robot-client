import React from 'react';

function loadData() {
  return function (WrappedComponent) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = WrappedComponent.prototype.componentWillUnmount
  WrappedComponent.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...arguments);
    this.unmount = true
  }
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = WrappedComponent.prototype.setState
  WrappedComponent.prototype.setState = function () {
    if (this.unmount) return;
    setState.call(this, ...arguments)
  }
    class LoadData extends React.Component {
      constructor(props) {
        super(props);
        this.state = {

        }
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }
    return LoadData
  }
}

export default loadData
