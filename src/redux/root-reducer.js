//represents overall reducer based on all the reducers that pulls in
import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer,
});
