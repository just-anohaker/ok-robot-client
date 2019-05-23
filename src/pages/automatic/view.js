import React from 'react';
import TransactionForm from './transaction-form'
import RandomSale from './random-sale'
import './less/index.less'

class AutomaticPage extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }
  // componentDidMount(){
  //   console.log(this.props.match.path)
  // }
  render(){
    return (
      <div className="automatic">
        <TransactionForm/>
        <RandomSale/>
      </div>
    )
  }
}
export default AutomaticPage;
