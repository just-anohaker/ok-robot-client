import { DELETE, STOP } from './actionTypes'

export default (state = {deletewarning:'',all:''}, action) => {
  switch (action.type) {
    case DELETE:
        return {deletewarning:action.wid,all:''}
    case STOP:
        return {deletewarning:'',all:action.all}
    default:
      return state;
  }
};