import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
const persisConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user']
}
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});
export default persistReducer(persisConfig, rootReducer);
// export default rootReducer;