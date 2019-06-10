import { CHANGE_ACCOUNT, CHANGE_TRANTYPE, ALL_ACCOUNTS } from './actionTypes'
import { get } from "../../util/localstorage.js";

function getAllaccount() {
  const allAccouts = get("allAccouts") || [];
  const initAccount = allAccouts[0] || {};
  return {
    allAccouts,
    initAccount
  }
}

let account = {
  accounts: getAllaccount().allAccouts,
  account: getAllaccount().initAccount,
  tranType: { name: 'ZIL/USDT' }
}

export default (state = account, action) => {
  switch (action.type) {
    case ALL_ACCOUNTS:
      return { accounts: getAllaccount().allAccouts, account: getAllaccount().initAccount, tranType: state.tranType }
    case CHANGE_ACCOUNT:
      let accounts = get("allAccouts") || [];
      let account = accounts.filter(item => action.name === item.id);
      if (account) {
        return { accounts: state.accounts, account: { id: account[0].id, httpkey: account[0].httpkey, groupName: account[0].groupName, httpsecret: account[0].httpsecret, name: account[0].name, passphrase: account[0].passphrase }, tranType: { name: state.tranType.name } };
      } else {
        return state
      }
    case CHANGE_TRANTYPE:
      return { accounts: state.accounts, account: state.account, tranType: { name: action.tranTran } };
    default:
      return state;
  }
};
