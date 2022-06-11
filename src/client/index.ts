import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { command } from './commands/command';

const id = '<appium-html-driver-handle>' || uuid();
const udid = '<appium-html-driver-udid>';
const host = '<appium-html-driver-url>';
const type = window.top === window ? 'window' : 'frame';

io(host + '/' + udid, { path: '/appium-html-driver/ws', query: { id, type } })
  .on('command', (request: any, callback: (data: any) => void) => command(request, callback));
