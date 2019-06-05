import React from 'react';
import {Row,Button} from 'antd'

class EditBtn extends React.Component {
  constructor(){
    super()
    this.state = {
      showBtn1 : false
    }
  }
  editForm(){
    this.setState({
      showBtn1 : true
    })
  }
  cancelEdit(){
    this.setState({
      showBtn1 : false
    })
  }
  render() {
    const edit = this.state.showBtn1? 'hidden':'show';
    const show = this.state.showBtn1? 'show':'hidden';
    return (
      <Row gutter={24} className="btns" >
        <Button className={"edit-btn " +edit}  onClick={this.editForm.bind(this)}  type="primary" >编辑参数</Button>
        <div className={"edit "+show}>
          <Button type="primary" htmlType="submit" className="save" >保存设置</Button>
          <Button onClick={this.cancelEdit.bind(this)}>取消</Button>
        </div>
    </Row>
    )

  }
}


export default EditBtn
