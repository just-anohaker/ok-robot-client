import React from 'react';
import {Card} from 'antd'
import MiniProgress from './progress/index.js'

import './detailtable.less'

class DetailTable extends React.Component{
  constructor(...args){
    super(...args)
    this.state={
        data:[
          {
          buy:'1',
          buyNum:'32.6k',
          sell:'1',
          sellNum:'467.3'
        },
          {
          buy:'2',
          buyNum:'119.4k',
          sell:'2',
          sellNum:'208.1'
        },
          {
          buy:'3',
          buyNum:'32.1k',
          sell:'3',
          sellNum:'25.4k'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
          {
          buy:'4',
          buyNum:'1.1k',
          sell:'4',
          sellNum:'232'
        },
        ]
    }
  }

  render(){
    return (
      <div className="detail">
        <Card title="深度">
          <div className="detail-title">
            <div>买入</div>
            <div>委单量</div>
            <div>卖出</div>
          </div>
        {
          this.state.data.map((item,index) => {
            return <div className="detail-content" key={index} >
                      <div className="buy">
                        <div className="bold">{item.buy}</div>
                        <div className="count-content" >
                          <span className="count">{item.buyNum}</span>
                          <MiniProgress percent={20} float={"right"} color={'#f6e0e0'}  target={100} targetLabel='100%' />
                        </div>
                      </div>
                      <div className="sell">
                        <div  className="count-content">
                          <span className="count count-right">{item.sellNum}</span>
                          <MiniProgress percent={40}   target={100} targetLabel='100%' />
                        </div>
                        <div className="bold right">{item.sell}</div>
                      </div>
                    </div>
                  })
          }




        </Card>
      </div>
    )
  }
}



export default DetailTable
