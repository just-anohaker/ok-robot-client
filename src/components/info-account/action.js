import { CHANGE_ACCOUNT, CHANGE_TRANTYPE, ALL_ACCOUNTS } from './actionTypes';

export const changeAccount = (account) => ({
  type: CHANGE_ACCOUNT
});

export const changeTran = (tran) => ({
  type: CHANGE_TRANTYPE
});

export const addAccounts = (tran) => ({
  type: ALL_ACCOUNTS
});
