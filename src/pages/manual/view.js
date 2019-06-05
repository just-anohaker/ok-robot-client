import React from 'react';
import Batch from './batch-form'
import Cancel from './cancel-form'
import './less/index.less'

class ManualPage extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {

    }
  }
  render() {

    return (
      <div className="manual">
        <Batch></Batch>
        <Cancel></Cancel>
      </div>
    )
  }
}


export default ManualPage;
