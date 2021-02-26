import {ACCOUNT_DRAGON} from './types';
import {fetchFromAccount} from './account'
import {  BACKEND } from '../config';

export const fetchAccountDragons = () => fetchFromAccount({
    endpoint:'dragons',
    options:{credentials:'include'},
    FETCH_TYPE:ACCOUNT_DRAGON.FETCH,
    ERROR_TYPE:ACCOUNT_DRAGON.FETCH_ERROR,
    SUCCESS_TYPE:ACCOUNT_DRAGON.FETCH_SUCCESS
});