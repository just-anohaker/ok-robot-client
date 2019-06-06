import {CHANGE_ACCOUNT,CHANGE_TRANTYPE} from './actionTypes'
import { get } from "../../util/localstorage.js";

export default (state = {account: {id:'3848d4b0-8827-11e9-8777-c533265032b1',httpkey:'a',groupName:'b',httpsecret:'ee',name:'a',passphrase:'888'},tranType:{name:'USDT'}}, action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT:
      let accounts = get("allAccouts") || [];
      let account = accounts.filter(item => action.name === item.id);
      if(account){
        return {account: {id:account[0].id,httpkey:account[0].httpkey,groupName:account[0].groupName,httpsecret:account[0].httpsecret,name:account[0].name,passphrase:account[0].passphrase},tranType:{name:'USDT'}};
      } else {
         return state
      }
    case CHANGE_TRANTYPE:
      return {account: state.account,tranType:{name:action.tranTran}};
    default:
      return state;
  }
};
