import { combineReducers } from 'redux';
import dragAndDrop from './dragAndDrop';
import cards from './cards';
import game from './game';

const rootReducer = combineReducers({
    dragAndDrop,
    game,
    cards
});

export default rootReducer;
