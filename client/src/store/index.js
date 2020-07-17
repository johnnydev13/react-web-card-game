import configureStore from './configureStore';
import SocketClient from '../api/socketClient';

const socketClient = new SocketClient();

const store = configureStore(socketClient);

export default store;
