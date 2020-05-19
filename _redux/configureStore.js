import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import manageUser from './_reducers/userReducer';
import manageFav from './_reducers/favReducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export default createStore(persistCombineReducers(rootPersistConfig, {
    manageUser,
    manageFav,
}))

