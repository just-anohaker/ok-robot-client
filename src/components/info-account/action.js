import { CHANGE_ACCOUNT, CHANGE_TRANTYPE } from './actionTypes';

export const changeAccount = (account) => ({
  type: CHANGE_ACCOUNT
});

export const changeTran = (tran) => ({
  type: CHANGE_TRANTYPE
});
