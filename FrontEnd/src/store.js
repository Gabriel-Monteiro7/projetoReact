import {createStore} from 'redux';

import redurcers from './reducers';

const store  = createStore(redurcers);

export default store;