import { Server } from './modules/server';
import { CONFIG_FILE_PATH } from './constants/constants';

const server = new Server(CONFIG_FILE_PATH);
server.run();
