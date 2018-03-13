import { combineReducers } from 'redux';
import theme from './theme';
import screens from './screens';

const reducers = combineReducers({
    theme,
    screens,
});

export default reducers;
