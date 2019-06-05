import React from 'react';
import TransactionForm from './transaction-form'
import RandomSale from './random-form'
import './less/index.less'

class AutomaticPage extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div className="automatic">
        <TransactionForm />
        <RandomSale />
      </div>
    )
  }
}
export default AutomaticPage;
